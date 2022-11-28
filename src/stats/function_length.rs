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

const CODE: &str = "function-length";
const SHORT_CODE: &str = "FL";

#[derive(Debug)]
pub struct FunctionLength;

impl Stat for FunctionLength {
  fn new() -> Arc<Self> {
    Arc::new(FunctionLength)
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
    let threshold = maybe_threshold.unwrap_or(30);
    let mut collector = FunctionLengthCollector::new(
      threshold,
      context.parsed_source.text_info(),
    );
    context.parsed_source.module().visit_with(&mut collector);
    context.add_stat(StatRecord {
      metric: CODE.to_string(),
      metric_short: SHORT_CODE.to_string(),
      level: StatLevel::Function,
      threshold,
      count: collector.count,
      score: collector.score,
    });
  }
}

struct FunctionLengthCollector<'view> {
  count: u32,
  score: f64,
  text_info: &'view SourceTextInfo,
  threshold: u32,
}

impl<'view> FunctionLengthCollector<'view> {
  pub fn new(threshold: u32, text_info: &'view SourceTextInfo) -> Self {
    Self {
      count: 0,
      score: 0.0,
      text_info,
      threshold,
    }
  }
}

impl<'view> Visit for FunctionLengthCollector<'view> {
  noop_visit_type!();

  fn visit_function(&mut self, node: &ast::Function) {
    if let Some(body) = &node.body {
      self.count += 1;
      let code = self.text_info.range_text(&body.span.range());
      let line_count = lines_of_code(code);
      if line_count >= self.threshold {
        self.score += line_count as f64 / self.threshold as f64;
      }
    }
  }

  fn visit_fn_decl(&mut self, node: &ast::FnDecl) {
    if let Some(body) = &node.function.body {
      self.count += 1;
      let code = self.text_info.range_text(&body.span.range());
      let line_count = lines_of_code(code);
      if line_count >= self.threshold {
        self.score += line_count as f64 / self.threshold as f64;
      }
    }
  }

  fn visit_fn_expr(&mut self, node: &ast::FnExpr) {
    if let Some(body) = &node.function.body {
      self.count += 1;
      let code = self.text_info.range_text(&body.span.range());
      let line_count = lines_of_code(code);
      if line_count >= self.threshold {
        self.score += line_count as f64 / self.threshold as f64;
      }
    }
  }

  fn visit_class_method(&mut self, node: &ast::ClassMethod) {
    if let Some(body) = &node.function.body {
      self.count += 1;
      let code = self.text_info.range_text(&body.span.range());
      let line_count = lines_of_code(code);
      if line_count >= self.threshold {
        self.score += line_count as f64 / self.threshold as f64;
      }
    }
  }

  fn visit_private_method(&mut self, node: &ast::PrivateMethod) {
    if let Some(body) = &node.function.body {
      self.count += 1;
      let code = self.text_info.range_text(&body.span.range());
      let line_count = lines_of_code(code);
      if line_count >= self.threshold {
        self.score += line_count as f64 / self.threshold as f64;
      }
    }
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn calculates_fn_length() {
    let source = r#"export class Foo {
      bar() {}
    }
    
    function bar() {
      return "bar";
    }
    
    const baz = () => {
      console.log("baz");
    };
    
    const qat = function () {
      return "qat";
    };
    
    function qux() {
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
      console.log("qux");
    }
    
    const quux = (t: boolean) => !t;
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
      FunctionLengthCollector::new(30, parsed_source.text_info());
    parsed_source.module().visit_with(&mut collector);
    assert_eq!(collector.count, 4);
    assert_eq!(collector.score, 1.0);
  }
}
