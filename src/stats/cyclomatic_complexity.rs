use deno_ast::swc::visit::VisitWith;
use deno_ast::view;
use deno_ast::view::NodeTrait;
use std::sync::Arc;

use super::binary_expression_complexity::BinaryExpressionComplexityCounter;
use super::Stat;
use super::StatLevel;
use super::StatRecord;
use crate::context::Context;
use crate::walker::Traverse;
use crate::walker::Walker;

const CODE: &str = "cyclomatic-complexity";
const SHORT_CODE: &str = "CC";

#[derive(Debug)]
pub struct CyclomaticComplexity;

impl Stat for CyclomaticComplexity {
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
    let threshold = maybe_threshold.unwrap_or(10);
    let mut walker = CyclomaticComplexityWalker::new(threshold);
    walker.traverse(ctx.program, ctx);
    ctx.add_stat(StatRecord {
      metric: CODE.to_string(),
      metric_short: SHORT_CODE.to_string(),
      level: StatLevel::Function,
      threshold,
      count: walker.count,
      score: walker.score,
    })
  }
}

struct CyclomaticComplexityWalker {
  count: u32,
  score: f64,
  threshold: u32,
}

impl CyclomaticComplexityWalker {
  pub fn new(threshold: u32) -> Self {
    Self {
      count: 0,
      score: 0.0,
      threshold,
    }
  }
}

impl Walker for CyclomaticComplexityWalker {
  fn arrow_expr(&mut self, node: &view::ArrowExpr, ctx: &mut Context) {
    self.count += 1;
    let mut counter = CyclomaticComplexityCounter::new();
    for child in node.children() {
      counter.traverse(child, ctx);
    }
    let complexity = counter.count();
    if complexity >= self.threshold {
      self.score = complexity as f64 / self.threshold as f64;
    }
  }

  fn fn_decl(&mut self, node: &view::FnDecl, ctx: &mut Context) {
    self.count += 1;
    let mut counter = CyclomaticComplexityCounter::new();
    for child in node.children() {
      counter.traverse(child, ctx);
    }
    let complexity = counter.count();
    if complexity >= self.threshold {
      self.score = complexity as f64 / self.threshold as f64;
    }
  }

  fn fn_expr(&mut self, node: &view::FnExpr, ctx: &mut Context) {
    self.count += 1;
    let mut counter = CyclomaticComplexityCounter::new();
    for child in node.children() {
      counter.traverse(child, ctx);
    }
    let complexity = counter.count();
    if complexity >= self.threshold {
      self.score = complexity as f64 / self.threshold as f64;
    }
  }

  fn class_expr(&mut self, node: &view::ClassExpr, ctx: &mut Context) {
    self.count += 1;
    let mut counter = CyclomaticComplexityCounter::new();
    for child in node.children() {
      counter.traverse(child, ctx);
    }
    let complexity = counter.count();
    if complexity >= self.threshold {
      self.score = complexity as f64 / self.threshold as f64;
    }
  }

  fn class_method(&mut self, node: &view::ClassMethod, ctx: &mut Context) {
    self.count += 1;
    let mut counter = CyclomaticComplexityCounter::new();
    for child in node.children() {
      counter.traverse(child, ctx);
    }
    let complexity = counter.count();
    if complexity >= self.threshold {
      self.score = complexity as f64 / self.threshold as f64;
    }
  }

  fn private_method(&mut self, node: &view::PrivateMethod, ctx: &mut Context) {
    self.count += 1;
    let mut counter = CyclomaticComplexityCounter::new();
    for child in node.children() {
      counter.traverse(child, ctx);
    }
    let complexity = counter.count();
    if complexity >= self.threshold {
      self.score = complexity as f64 / self.threshold as f64;
    }
  }

  fn method_prop(&mut self, node: &view::MethodProp, ctx: &mut Context) {
    self.count += 1;
    let mut counter = CyclomaticComplexityCounter::new();
    for child in node.children() {
      counter.traverse(child, ctx);
    }
    let complexity = counter.count();
    if complexity >= self.threshold {
      self.score = complexity as f64 / self.threshold as f64;
    }
  }

  fn getter_prop(&mut self, node: &view::GetterProp, ctx: &mut Context) {
    self.count += 1;
    let mut counter = CyclomaticComplexityCounter::new();
    for child in node.children() {
      counter.traverse(child, ctx);
    }
    let complexity = counter.count();
    if complexity >= self.threshold {
      self.score = complexity as f64 / self.threshold as f64;
    }
  }

  fn setter_prop(&mut self, node: &view::SetterProp, ctx: &mut Context) {
    self.count += 1;
    let mut counter = CyclomaticComplexityCounter::new();
    for child in node.children() {
      counter.traverse(child, ctx);
    }
    let complexity = counter.count();
    if complexity >= self.threshold {
      self.score = complexity as f64 / self.threshold as f64;
    }
  }
}

struct CyclomaticComplexityCounter(u32);

impl CyclomaticComplexityCounter {
  pub fn new() -> Self {
    Self(1)
  }

  pub fn count(&self) -> u32 {
    self.0
  }
}

impl Walker for CyclomaticComplexityCounter {
  fn bin_expr(&mut self, node: &view::BinExpr, _ctx: &mut Context) {
    let mut counter = BinaryExpressionComplexityCounter::new();
    node.inner.visit_children_with(&mut counter);
    self.0 += counter.count();
  }

  fn catch_clause(&mut self, _n: &view::CatchClause, _ctx: &mut Context) {
    self.0 += 1;
  }

  fn cond_expr(&mut self, _n: &view::CondExpr, _ctx: &mut Context) {
    self.0 += 1;
  }

  fn do_while_stmt(&mut self, node: &view::DoWhileStmt, _ctx: &mut Context) {
    if matches!(
      node.test,
      view::Expr::Bin(_) | view::Expr::Ident(_) | view::Expr::Unary(_)
    ) {
      self.0 += 1;
    }
  }

  fn for_in_stmt(&mut self, _n: &view::ForInStmt, _ctx: &mut Context) {
    self.0 += 1;
  }

  fn for_of_stmt(&mut self, _n: &view::ForOfStmt, _ctx: &mut Context) {
    self.0 += 1;
  }

  fn for_stmt(&mut self, node: &view::ForStmt, _ctx: &mut Context) {
    if matches!(
      node.test,
      Some(view::Expr::Bin(_))
        | Some(view::Expr::Ident(_))
        | Some(view::Expr::Unary(_))
    ) {
      self.0 += 1;
    }
  }

  fn if_stmt(&mut self, node: &view::IfStmt, _ctx: &mut Context) {
    if node.alt.is_some() {
      self.0 += 2;
    } else {
      self.0 += 1;
    }
  }

  fn switch_case(&mut self, _n: &view::SwitchCase, _ctx: &mut Context) {
    self.0 += 1;
  }

  fn while_stmt(&mut self, node: &view::WhileStmt, _ctx: &mut Context) {
    if matches!(
      node.test,
      view::Expr::Bin(_) | view::Expr::Ident(_) | view::Expr::Unary(_)
    ) {
      self.0 += 1;
    }
  }

  // Boundaries of complexity

  fn arrow_expr(&mut self, _n: &view::ArrowExpr, ctx: &mut Context) {
    ctx.traversal.skip();
  }

  fn class_expr(&mut self, _n: &view::ClassExpr, ctx: &mut Context) {
    ctx.traversal.skip();
  }

  fn class_method(&mut self, _n: &view::ClassMethod, ctx: &mut Context) {
    ctx.traversal.skip();
  }

  fn fn_decl(&mut self, _n: &view::FnDecl, ctx: &mut Context) {
    ctx.traversal.skip();
  }

  fn fn_expr(&mut self, _n: &view::FnExpr, ctx: &mut Context) {
    ctx.traversal.skip();
  }

  fn getter_prop(&mut self, _n: &view::GetterProp, ctx: &mut Context) {
    ctx.traversal.skip();
  }

  fn method_prop(&mut self, _n: &view::MethodProp, ctx: &mut Context) {
    ctx.traversal.skip();
  }

  fn private_method(&mut self, _n: &view::PrivateMethod, ctx: &mut Context) {
    ctx.traversal.skip();
  }

  fn setter_prop(&mut self, _n: &view::SetterProp, ctx: &mut Context) {
    ctx.traversal.skip();
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn calculates_complexity() {
    let source = r#"export class Foo {
      private _bar = "bar";
      getBaz = (): boolean => {
        return ["baz"].some((item) => item === "baz");
      };
      getBar(): string {
        return this._bar;
      }
      get qat(): string {
        return "qat";
      }
    }
    
    export function bar(): string {
      return "bar";
    }
    
    export const baz = function (): string {
      return "baz";
    };
    
    export const qat = [{ foo: "foo" }].map((item) => item.foo);
    
    export function qux(a: string, b: string): string | number {
      if (a && typeof a === "string") {
        //
      } else if (b && typeof b === "string") {
        do {
          b = b.substr(1);
        } while (b.length);
        return b;
      } else if (a && b) {
        switch (a) {
          case "foo":
            return "foo";
          case "bar":
            return "bar";
          default:
            return "qat";
        }
      }
      return 0;
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

    let mut walker = CyclomaticComplexityWalker::new(10);

    parsed_source.with_view(|program| {
      let mut ctx = Context::new(parsed_source.clone(), program);
      walker.traverse(ctx.program, &mut ctx);
      assert_eq!(walker.count, 8);
      assert_eq!(walker.score, 1.6);
    });
  }
}
