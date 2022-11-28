use deno_ast::swc::ast;
use deno_ast::swc::visit::noop_visit_type;
use deno_ast::swc::visit::Visit;
use deno_ast::swc::visit::VisitWith;
use std::sync::Arc;

use super::Stat;
use super::StatLevel;
use super::StatRecord;
use crate::context::Context;

const CODE: &str = "parameter-number";
const SHORT_CODE: &str = "P";

#[derive(Debug)]
pub struct ParameterNumber;

impl Stat for ParameterNumber {
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
    ctx: &mut Context<'view>,
    maybe_threshold: Option<u32>,
  ) {
    let threshold = maybe_threshold.unwrap_or(6);
    let mut collector = ParameterNumberCollector::new(threshold);
    ctx.parsed_source.module().visit_with(&mut collector);
    ctx.add_stat(StatRecord {
      metric: CODE.to_string(),
      metric_short: SHORT_CODE.to_string(),
      level: StatLevel::Function,
      threshold,
      count: collector.count,
      score: collector.score,
    });
  }
}

struct ParameterNumberCollector {
  count: u32,
  score: f64,
  threshold: u32,
}

impl ParameterNumberCollector {
  pub fn new(threshold: u32) -> Self {
    Self {
      count: 0,
      score: 0.0,
      threshold,
    }
  }
}

impl Visit for ParameterNumberCollector {
  noop_visit_type!();

  fn visit_arrow_expr(&mut self, node: &ast::ArrowExpr) {
    self.count += 1;
    let param_count = node.params.len();
    if param_count as u32 >= self.threshold {
      self.score += param_count as f64 / self.threshold as f64;
    }
  }

  fn visit_class_method(&mut self, node: &ast::ClassMethod) {
    self.count += 1;
    let param_count = node.function.params.len();
    if param_count as u32 >= self.threshold {
      self.score += param_count as f64 / self.threshold as f64;
    }
  }

  fn visit_fn_decl(&mut self, node: &ast::FnDecl) {
    self.count += 1;
    let param_count = node.function.params.len();
    if param_count as u32 >= self.threshold {
      self.score += param_count as f64 / self.threshold as f64;
    }
  }

  fn visit_fn_expr(&mut self, node: &ast::FnExpr) {
    self.count += 1;
    let param_count = node.function.params.len();
    if param_count as u32 >= self.threshold {
      self.score += param_count as f64 / self.threshold as f64;
    }
  }

  fn visit_method_prop(&mut self, node: &ast::MethodProp) {
    self.count += 1;
    let param_count = node.function.params.len();
    if param_count as u32 >= self.threshold {
      self.score += param_count as f64 / self.threshold as f64;
    }
  }

  fn visit_private_method(&mut self, node: &ast::PrivateMethod) {
    self.count += 1;
    let param_count = node.function.params.len();
    if param_count as u32 >= self.threshold {
      self.score += param_count as f64 / self.threshold as f64;
    }
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn collector_works() {
    let source = r#"class A {
      a(a: string, b: string) {}
      #b(a: string, b: string, c: string, d: string, e: string, f: string) {}
    }

    function d(a: string, b: string) {}

    function e(a: string, b: string, c: string, d: string, e: string, f: string) {}
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

    let mut collector = ParameterNumberCollector::new(6);
    parsed_source.module().visit_with(&mut collector);
    assert_eq!(collector.count, 4);
    assert_eq!(collector.score, 2.0);
  }
}
