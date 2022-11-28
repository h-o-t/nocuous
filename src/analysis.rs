use lazy_static::lazy_static;
use regex::Regex;

lazy_static! {
  static ref RE_BLOCK_END: Regex = Regex::new(r"\*/").unwrap();
  static ref RE_BLOCK_START: Regex = Regex::new(r"^\s*/\*").unwrap();
  static ref RE_BLOCK_SINGLE: Regex = Regex::new(r"^\s*/\*.*\*/").unwrap();
  static ref RE_NON_WHITESPACE: Regex = Regex::new(r"\S").unwrap();
  static ref RE_TWOSLASH: Regex = Regex::new(r"^\s*/{2}").unwrap();
}

/// Given a string, return the count of lines that are considered code in
/// JavaScript or TypeScript, skipping any empty lines or lines that only
/// contain comments.
pub fn lines_of_code(code: &str) -> u32 {
  let mut count = 0_u32;
  let mut in_comment = false;
  for line in code.lines() {
    if in_comment {
      if RE_BLOCK_END.is_match(line) {
        in_comment = false;
      }
      continue;
    }
    if RE_TWOSLASH.is_match(line) || RE_BLOCK_SINGLE.is_match(line) {
      continue;
    }
    if RE_BLOCK_START.is_match(line) {
      in_comment = true;
      continue;
    }
    if RE_NON_WHITESPACE.is_match(line) {
      count += 1;
    }
  }
  count
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn correct_counts() {
    let actual = lines_of_code(
      r#"/**
* Some sort of block comment.
*/
function a() {

  // a two line comment
  const b = "a";

  return b;
}

/** a single line one. */
const c = 12345;

// more twoslash

"#,
    );
    assert_eq!(actual, 5);
  }
}
