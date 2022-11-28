use anyhow::anyhow;
use anyhow::Result;
use deno_ast::parse_module;
use deno_ast::swc::dep_graph::analyze_dependencies;
use deno_ast::MediaType;
use deno_ast::ParseParams;
use deno_ast::SourceTextInfo;
use futures::future::Future;
use futures::stream::FuturesUnordered;
use futures::stream::StreamExt;
use import_map::ImportMap;
use indexmap::IndexMap;
use indexmap::IndexSet;
use std::collections::HashMap;
use std::pin::Pin;
use url::ParseError;
use url::Url;
use wasm_bindgen::prelude::*;

use crate::context::Context;
use crate::stats::get_all_stats;
use crate::stats::StatRecord;

type LoadFuture = Pin<
  Box<
    dyn Future<Output = Result<(Url, Option<String>, Option<String>)>>
      + 'static,
  >,
>;
type LoadResponse = (Option<String>, Option<String>);

pub struct Project {
  load: js_sys::Function,
  maybe_import_map: Option<ImportMap>,
  maybe_resolve: Option<js_sys::Function>,
  pending: FuturesUnordered<LoadFuture>,
  roots: Vec<Url>,
  specifiers: IndexSet<Url>,
}

impl Project {
  pub fn new(
    roots: Vec<Url>,
    load: js_sys::Function,
    maybe_resolve: Option<js_sys::Function>,
  ) -> Self {
    Self {
      load,
      maybe_import_map: None,
      maybe_resolve,
      pending: FuturesUnordered::new(),
      roots,
      specifiers: IndexSet::new(),
    }
  }

  fn load(&mut self, specifier: &Url) -> Result<()> {
    let context = JsValue::null();
    let arg1 = JsValue::from(specifier.to_string());
    let result = self.load.call1(&context, &arg1);
    let specifier = specifier.clone();
    let fut = async move {
      let response = match result {
        Ok(result) => {
          wasm_bindgen_futures::JsFuture::from(js_sys::Promise::resolve(
            &result,
          ))
          .await
        }
        Err(err) => Err(err),
      };
      response
        .map(|value| {
          if let Ok((maybe_source, maybe_content_type)) =
            serde_wasm_bindgen::from_value::<LoadResponse>(value)
          {
            (specifier, maybe_source, maybe_content_type)
          } else {
            (specifier, None, None)
          }
        })
        .map_err(|err| {
          let err = js_sys::Error::from(err);
          anyhow!("{}: {}", err.name(), err.message())
        })
    };
    self.pending.push(Box::pin(fut));
    Ok(())
  }

  /// Attempt to resolve a URL from a string specifier using the referrer as a
  /// base if needed.
  fn resolve(&self, specifier: String, referrer: &Url) -> Result<Url> {
    // If a JS function was passed, use that to resolve...
    if let Some(resolve) = self.maybe_resolve.as_ref() {
      let context = JsValue::null();
      let arg1 = JsValue::from(specifier);
      let arg2 = JsValue::from(referrer.to_string());
      resolve
        .call2(&context, &arg1, &arg2)
        .map_err(|err| {
          anyhow!(err
            .as_string()
            .unwrap_or_else(|| "Unspecified error".to_string()))
        })
        .and_then(|res| res.as_string().ok_or_else(|| anyhow!("bad")))
        .and_then(|s| Url::parse(&s).map_err(|err| err.into()))
    } else if let Some(import_map) = self.maybe_import_map.as_ref() {
      // otherwise we will use an import map if present...
      import_map
        .resolve(&specifier, referrer)
        .map_err(|err| err.into())
    } else {
      // otherwise we will just attempt to resolve the specifier using standard
      // logic
      Url::parse(&specifier).or_else(|err| match err {
        ParseError::RelativeUrlWithoutBase
          if !(specifier.starts_with('/')
            || specifier.starts_with("./")
            || specifier.starts_with("../")) =>
        {
          Err(anyhow!("Specifier \"{}\" is not relative.", specifier))
        }
        ParseError::RelativeUrlWithoutBase => {
          referrer.clone().join(&specifier).map_err(|err| err.into())
        }
        _ => Err(err.into()),
      })
    }
  }

  pub async fn stat(&mut self) -> Result<IndexMap<Url, Vec<StatRecord>>> {
    let mut results = IndexMap::<Url, Vec<StatRecord>>::new();

    for specifier in self.roots.clone() {
      self.load(&specifier)?;
    }

    while let Some(Ok((specifier, maybe_source, maybe_content_type))) =
      self.pending.next().await
    {
      if let Some(source) = maybe_source {
        let maybe_headers = if let Some(content_type) = maybe_content_type {
          let mut headers = HashMap::new();
          headers.insert("content-type".to_string(), content_type);
          Some(headers)
        } else {
          None
        };
        let parsed_source = parse_module(ParseParams {
          specifier: specifier.to_string(),
          text_info: SourceTextInfo::new(source.into()),
          media_type: MediaType::from_specifier_and_headers(
            &specifier,
            maybe_headers.as_ref(),
          ),
          capture_tokens: true,
          scope_analysis: false,
          maybe_syntax: None,
        })?;

        let deps = analyze_dependencies(
          parsed_source.module(),
          parsed_source.comments().as_swc_comments().as_ref(),
        );

        for dep in deps {
          if let Ok(specifier) =
            self.resolve(dep.specifier.to_string(), &specifier)
          {
            if !self.specifiers.contains(&specifier) {
              self.load(&specifier)?;
              self.specifiers.insert(specifier);
            }
          }
        }

        let stats = get_all_stats();

        parsed_source.with_view(|program| {
          let mut context = Context::new(parsed_source.clone(), program);
          for stat in stats {
            stat.stat(&mut context, None);
          }
          results.insert(specifier.clone(), context.take());
        });
      }
    }

    Ok(results)
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_parse_module() {
    let file = parse_module(ParseParams {
      specifier: "/home/kitsonk/github/tests/fixtures/a.ts".to_string(),
      text_info: SourceTextInfo::from_string(
        r#"
      const a = require("fs");
      "#
        .to_string(),
      ),
      media_type: MediaType::TypeScript,
      capture_tokens: true,
      scope_analysis: false,
      maybe_syntax: None,
    })
    .unwrap();
    let deps = analyze_dependencies(
      file.module(),
      file.comments().as_swc_comments().as_ref(),
    );
    println!("{:?}", deps);
  }
}
