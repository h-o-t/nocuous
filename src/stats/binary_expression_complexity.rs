use deno_ast::swc::ast;
use deno_ast::swc::visit::noop_visit_type;
use deno_ast::swc::visit::Visit;
use deno_ast::swc::visit::VisitWith;
use deno_ast::view;
use std::sync::Arc;

use super::Stat;
use super::StatLevel;
use super::StatRecord;
use crate::context::Context;
use crate::walker::Traverse;
use crate::walker::Walker;

const CODE: &str = "binary-expression-complexity";
const SHORT_CODE: &str = "BEC";

#[derive(Debug)]
pub struct BinaryExpressionComplexity;

impl Stat for BinaryExpressionComplexity {
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
    let threshold = maybe_threshold.unwrap_or(3);
    let mut walker = BinaryExpressionComplexityWalker::new(threshold);
    walker.traverse(ctx.program, ctx);
    ctx.add_stat(StatRecord {
      metric: CODE.to_string(),
      metric_short: SHORT_CODE.to_string(),
      level: StatLevel::Statement,
      threshold,
      count: walker.count,
      score: walker.score,
    });
  }
}

pub struct BinaryExpressionComplexityWalker {
  count: u32,
  score: f64,
  threshold: u32,
}

impl BinaryExpressionComplexityWalker {
  pub fn new(threshold: u32) -> Self {
    Self {
      count: 0,
      score: 0.0,
      threshold,
    }
  }
}

impl Walker for BinaryExpressionComplexityWalker {
  fn bin_expr(&mut self, node: &view::BinExpr, ctx: &mut Context) {
    self.count += 1;
    let mut counter = BinaryExpressionComplexityCounter::new();
    node.inner.visit_children_with(&mut counter);
    let complexity = counter.count();
    if complexity >= self.threshold {
      self.score += complexity as f64 / self.threshold as f64;
    }
    ctx.traversal.skip();
  }
}

pub struct BinaryExpressionComplexityCounter(u32);

impl BinaryExpressionComplexityCounter {
  pub fn new() -> Self {
    Self(1)
  }

  pub fn count(&self) -> u32 {
    self.0
  }
}

impl Visit for BinaryExpressionComplexityCounter {
  noop_visit_type!();

  fn visit_bin_expr(&mut self, node: &ast::BinExpr) {
    self.0 += 1;
    node.visit_children_with(self);
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn walker_counts_properly() {
    let source = r#"const bar = 1;

    export const foo = bar || "foo";
    
    if (bar && foo) {
      console.log(bar || foo);
    }
    
    if ((bar && foo && true) || "") {
      console.log("bar");
    }"#;

    let parsed_source = deno_ast::parse_module(deno_ast::ParseParams {
      specifier: "file://test/a.ts".to_string(),
      text_info: deno_ast::SourceTextInfo::new(source.into()),
      media_type: deno_ast::MediaType::TypeScript,
      capture_tokens: true,
      scope_analysis: false,
      maybe_syntax: None,
    })
    .unwrap();

    let mut walker = BinaryExpressionComplexityWalker::new(3);

    parsed_source.with_view(|program| {
      let mut ctx = Context::new(parsed_source.clone(), program);
      walker.traverse(ctx.program, &mut ctx);
      assert_eq!(walker.count, 4);
      assert_eq!(walker.score, 1.0);
    });
  }
}
