use deno_ast::swc::ast;
use deno_ast::swc::visit::noop_visit_type;
use deno_ast::swc::visit::Visit;
use deno_ast::swc::visit::VisitWith;
use deno_ast::SourceRangedForSpanned;
use deno_ast::SourceTextInfo;
use std::sync::Arc;

use super::Stat;
use super::StatLevel;
use super::StatRecord;
use crate::analysis::lines_of_code;
use crate::context::Context;

const CODE: &str = "anon-inner-length";
const SHORT_CODE: &str = "AIL";

#[derive(Debug)]
pub struct AnonInnerLength;

impl Stat for AnonInnerLength {
  fn new() -> Arc<Self> {
    Arc::new(Self)
  }

  fn code(&self) -> &'static str {
    CODE
  }

  fn short_code(&self) -> &'static str {
    SHORT_CODE
  }

  fn stat<'view>(
    &self,
    context: &mut Context<'view>,
    maybe_threshold: Option<u32>,
  ) {
    let threshold = maybe_threshold.unwrap_or(35);
    let mut collector = AnonInnerLengthCollector::new(
      threshold,
      context.parsed_source.text_info(),
    );
    context.parsed_source.module().visit_with(&mut collector);
    context.add_stat(StatRecord {
      metric: CODE.to_string(),
      metric_short: SHORT_CODE.to_string(),
      level: StatLevel::Item,
      threshold,
      count: collector.count,
      score: collector.score,
    });
  }
}

struct AnonInnerLengthCollector<'view> {
  count: u32,
  score: f64,
  text_info: &'view SourceTextInfo,
  threshold: u32,
}

impl<'view> AnonInnerLengthCollector<'view> {
  pub fn new(threshold: u32, text_info: &'view SourceTextInfo) -> Self {
    Self {
      count: 0,
      score: 0.0,
      text_info,
      threshold,
    }
  }
}

impl<'view> Visit for AnonInnerLengthCollector<'view> {
  noop_visit_type!();

  fn visit_arrow_expr(&mut self, node: &ast::ArrowExpr) {
    self.count += 1;
    let code = self.text_info.range_text(&node.span.range());
    let line_count = lines_of_code(code);
    if line_count >= self.threshold {
      self.score += line_count as f64 / self.threshold as f64;
    }
  }

  fn visit_class_expr(&mut self, node: &ast::ClassExpr) {
    self.count += 1;
    let code = self.text_info.range_text(&node.class.span.range());
    let line_count = lines_of_code(code);
    if line_count >= self.threshold {
      self.score += line_count as f64 / self.threshold as f64;
    }
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn anon_inner_length_collector() {
    let source = r#"
    [].map((item) => {
      console.log(item);
    });

    [].map((item) => console.log(item));
    
    export class Foo {
      bar = new (class {
        constructor() {
          console.log("bar");
        }
      })();
    }
    
    [].map(() => {
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
      console.log("a");
    });
    "#;

    let parsed_source = deno_ast::parse_module(deno_ast::ParseParams {
      specifier: "file://test/a.ts".to_string(),
      text_info: deno_ast::SourceTextInfo::new(source.into()),
      media_type: deno_ast::MediaType::TypeScript,
      capture_tokens: true,
      scope_analysis: false,
      maybe_syntax: None,
    })
    .unwrap();

    let mut collector =
      AnonInnerLengthCollector::new(35, parsed_source.text_info());
    parsed_source.module().visit_with(&mut collector);
    assert_eq!(collector.count, 4);
    assert_eq!(collector.score, 1.0);
  }
}
