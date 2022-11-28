mod analysis;
mod context;
mod project;
mod resolve;
mod stats;
mod walker;

use wasm_bindgen::prelude::*;

use crate::resolve::resolve_url_or_path;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

fn to_js_error(error: anyhow::Error) -> JsError {
  JsError::new(&error.to_string())
}

#[wasm_bindgen]
pub async fn stats(
  roots: JsValue,
  load: js_sys::Function,
  maybe_resolve: Option<js_sys::Function>,
) -> Result<JsValue, JsError> {
  let roots: Vec<String> = serde_wasm_bindgen::from_value(roots)?;
  let roots = roots
    .iter()
    .filter_map(|root| resolve_url_or_path(root).ok())
    .collect();
  let mut project = project::Project::new(roots, load, maybe_resolve);
  let stats = project.stat().await.map_err(to_js_error)?;
  serde_wasm_bindgen::to_value(&stats).map_err(|err| err.into())
}
