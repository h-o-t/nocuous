use std::sync::Arc;

use super::Stat;
use super::StatLevel;
use super::StatRecord;
use crate::analysis::lines_of_code;
use crate::context::Context;

const CODE: &str = "file-length";
const SHORT_CODE: &str = "L";

#[derive(Debug)]
pub struct FileLength;

impl Stat for FileLength {
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
    let threshold = maybe_threshold.unwrap_or(500);
    let code = context.parsed_source.text_info().text();
    let line_count = lines_of_code(code.as_ref());
    let score = if line_count >= threshold {
      line_count as f64 / threshold as f64
    } else {
      0.0
    };
    context.add_stat(StatRecord {
      metric: CODE.to_string(),
      metric_short: SHORT_CODE.to_string(),
      level: StatLevel::Module,
      threshold,
      count: 1,
      score,
    });
  }
}
