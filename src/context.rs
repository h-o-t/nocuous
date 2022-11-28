use crate::stats::StatRecord;

use deno_ast::view;
use deno_ast::ParsedSource;

#[derive(Debug)]
pub struct TraversalController(bool);

impl TraversalController {
  fn new() -> Self {
    Self(false)
  }

  pub fn reset(&mut self) {
    self.0 = false;
  }

  pub fn should_skip(&mut self) -> bool {
    let skip = self.0;
    self.reset();
    skip
  }

  pub fn skip(&mut self) {
    self.0 = true;
  }
}

pub struct Context<'view> {
  pub parsed_source: ParsedSource,
  pub program: view::Program<'view>,
  stats: Vec<StatRecord>,
  pub traversal: TraversalController,
}

impl<'view> Context<'view> {
  pub fn new(
    parsed_source: ParsedSource,
    program: view::Program<'view>,
  ) -> Self {
    Self {
      parsed_source,
      program,
      stats: Vec::new(),
      traversal: TraversalController::new(),
    }
  }

  pub fn add_stat(&mut self, stat: StatRecord) {
    self.stats.push(stat);
  }

  pub fn take(self) -> Vec<StatRecord> {
    self.stats
  }
}
