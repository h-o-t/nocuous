use deno_ast::swc::ast;
use deno_ast::swc::visit::noop_visit_type;
use deno_ast::swc::visit::Visit;
use deno_ast::swc::visit::VisitWith;
use std::sync::Arc;

use super::Stat;
use super::StatLevel;
use super::StatRecord;
use crate::context::Context;

const CODE: &str = "class-data-abstraction-coupling";
const SHORT_CODE: &str = "CDAC";

#[derive(Debug)]
pub struct ClassDataAbstractionCoupling;

impl Stat for ClassDataAbstractionCoupling {
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
    let threshold = maybe_threshold.unwrap_or(10);
    let mut collector = ClassDataAbstractionCouplingCollector::new(threshold);
    context.parsed_source.module().visit_with(&mut collector);
    context.add_stat(StatRecord {
      metric: CODE.to_string(),
      metric_short: SHORT_CODE.to_string(),
      level: StatLevel::Class,
      threshold,
      count: collector.count,
      score: collector.score,
    });
  }
}

struct ClassDataAbstractionCouplingCollector {
  count: u32,
  score: f64,
  threshold: u32,
}

impl ClassDataAbstractionCouplingCollector {
  pub fn new(threshold: u32) -> Self {
    Self {
      count: 0,
      score: 0.0,
      threshold,
    }
  }
}

impl Visit for ClassDataAbstractionCouplingCollector {
  noop_visit_type!();

  fn visit_class(&mut self, node: &ast::Class) {
    self.count += 1;
    let mut collector = NewExpressionCollector::new();
    node.visit_with(&mut collector);
    let new_expr_count = collector.count();
    if new_expr_count >= self.threshold {
      self.score += new_expr_count as f64 / self.threshold as f64;
    }
  }
}

struct NewExpressionCollector(u32);

impl NewExpressionCollector {
  pub fn new() -> Self {
    Self(0)
  }

  pub fn count(&self) -> u32 {
    self.0
  }
}

impl Visit for NewExpressionCollector {
  noop_visit_type!();

  fn visit_new_expr(&mut self, _node: &ast::NewExpr) {
    self.0 += 1;
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn collector() {
    let source = r#"
    export class Foo {
      foo = "foo";
    }
    
    export class Bar {
      foo = new Foo();
      foo1 = new Foo();
      foo2 = new Foo();
      foo3 = new Foo();
      foo4 = new Foo();
      foo5 = new Foo();
      foo6 = new Foo();
      foo7 = new Foo();
      foo8 = new Foo();
      getFoo(): Foo {
        return new Foo();
      }
    }
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

    let mut collector = ClassDataAbstractionCouplingCollector::new(10);
    parsed_source.module().visit_with(&mut collector);
    assert_eq!(collector.count, 2);
    assert_eq!(collector.score, 1.0);
  }
}
