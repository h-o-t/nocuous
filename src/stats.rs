use serde::Serialize;
use std::sync::Arc;

use crate::context::Context;

mod anon_inner_length;
mod binary_expression_complexity;
mod class_data_abstraction_coupling;
mod cyclomatic_complexity;
mod file_length;
mod function_length;
mod missing_switch_default;
mod parameter_number;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub enum StatLevel {
  Module,
  Class,
  Function,
  Statement,
  Item,
}

impl Default for StatLevel {
  fn default() -> Self {
    Self::Module
  }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct StatRecord {
  pub metric: String,
  pub metric_short: String,
  pub level: StatLevel,
  pub count: u32,
  pub threshold: u32,
  pub score: f64,
}

impl Default for StatRecord {
  fn default() -> Self {
    Self {
      metric: "".to_string(),
      metric_short: "".to_string(),
      level: StatLevel::default(),
      count: 0,
      threshold: 0,
      score: 0.0,
    }
  }
}

pub trait Stat: std::fmt::Debug + Send + Sync {
  fn new() -> Arc<Self>
  where
    Self: Sized;

  fn code(&self) -> &'static str;

  fn short_code(&self) -> &'static str;

  fn stat<'a>(&self, context: &mut Context<'a>, maybe_threshold: Option<u32>);
}

fn get_stats() -> Vec<Arc<dyn Stat>> {
  vec![
    anon_inner_length::AnonInnerLength::new(),
    binary_expression_complexity::BinaryExpressionComplexity::new(),
    class_data_abstraction_coupling::ClassDataAbstractionCoupling::new(),
    cyclomatic_complexity::CyclomaticComplexity::new(),
    file_length::FileLength::new(),
    function_length::FunctionLength::new(),
    missing_switch_default::MissingSwitchDefault::new(),
    parameter_number::ParameterNumber::new(),
  ]
}

pub fn get_all_stats() -> Vec<Arc<dyn Stat>> {
  get_stats()
}
