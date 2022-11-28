use deno_ast::swc::ast;
use deno_ast::swc::visit::noop_visit_type;
use deno_ast::swc::visit::Visit;
use deno_ast::swc::visit::VisitWith;
use std::sync::Arc;

use super::Stat;
use super::StatLevel;
use super::StatRecord;
use crate::context::Context;

const CODE: &str = "missing-switch-default";
const SHORT_CODE: &str = "MSD";

#[derive(Debug)]
pub struct MissingSwitchDefault;

impl Stat for MissingSwitchDefault {
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
    _maybe_threshold: Option<u32>,
  ) {
    let mut collector = MissingSwitchDefaultCollector::new();
    context.parsed_source.module().visit_with(&mut collector);
    context.add_stat(StatRecord {
      metric: CODE.to_string(),
      metric_short: SHORT_CODE.to_string(),
      level: StatLevel::Statement,
      threshold: 1,
      count: collector.count,
      score: collector.score,
    });
  }
}

struct MissingSwitchDefaultCollector {
  count: u32,
  score: f64,
}

impl MissingSwitchDefaultCollector {
  pub fn new() -> Self {
    Self {
      count: 0,
      score: 0.0,
    }
  }
}

impl Visit for MissingSwitchDefaultCollector {
  noop_visit_type!();

  fn visit_switch_stmt(&mut self, node: &ast::SwitchStmt) {
    self.count += 1;
    let has_default = node.cases.iter().any(|case| case.test.is_none());
    if !has_default {
      self.score += 1.0;
    }
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn counts_missing_default() {
    let source = r#"export function foo(value: string) {
      switch (value) {
        case "foo":
          break;
        case "bar":
          break;
        default:
          console.log("?");
      }
    
      switch (value) {
        case "foo":
          break;
      }
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

    let mut collector = MissingSwitchDefaultCollector::new();
    parsed_source.module().visit_with(&mut collector);
    assert_eq!(collector.count, 2);
    assert_eq!(collector.score, 1.0);
  }
}
