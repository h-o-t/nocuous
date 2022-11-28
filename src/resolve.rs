use anyhow::Result;
#[cfg(not(target_arch = "wasm32"))]
use std::path::Path;
#[cfg(not(target_arch = "wasm32"))]
use std::path::PathBuf;
use url::Url;

/// Normalize all intermediate components of the path (ie. remove "./" and "../"
/// components).
///
/// Similar to `fs::canonicalize()` but doesn't resolve symlinks.
///
/// Taken from Cargo
/// https://github.com/rust-lang/cargo/blob/af307a38c20a753ec60f0ad18be5abed3db3c9ac/src/cargo/util/paths.rs#L60-L85
#[cfg(not(target_arch = "wasm32"))]
fn normalize_path<P: AsRef<Path>>(path: P) -> PathBuf {
  use std::path::Component;

  let mut components = path.as_ref().components().peekable();
  let mut ret =
    if let Some(c @ Component::Prefix(..)) = components.peek().cloned() {
      components.next();
      PathBuf::from(c.as_os_str())
    } else {
      PathBuf::new()
    };

  for component in components {
    match component {
      Component::Prefix(..) => unreachable!(),
      Component::RootDir => {
        ret.push(component.as_os_str());
      }
      Component::CurDir => {}
      Component::ParentDir => {
        ret.pop();
      }
      Component::Normal(c) => {
        ret.push(c);
      }
    }
  }
  ret
}

/// Returns true if the input string starts with a sequence of characters
/// that could be a valid URI scheme, like 'https:', 'git+ssh:' or 'data:'.
///
/// According to RFC 3986 (https://tools.ietf.org/html/rfc3986#section-3.1),
/// a valid scheme has the following format:
///   scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
///
/// We additionally require the scheme to be at least 2 characters long,
/// because otherwise a windows path like c:/foo would be treated as a URL,
/// while no schemes with a one-letter name actually exist.
fn specifier_has_uri_scheme(specifier: &str) -> bool {
  let mut chars = specifier.chars();
  let mut len = 0usize;
  // The first character must be a letter.
  match chars.next() {
    Some(c) if c.is_ascii_alphabetic() => len += 1,
    _ => return false,
  }
  // Second and following characters must be either a letter, number,
  // plus sign, minus sign, or dot.
  loop {
    match chars.next() {
      Some(c) if c.is_ascii_alphanumeric() || "+-.".contains(c) => len += 1,
      Some(':') if len >= 2 => return true,
      _ => return false,
    }
  }
}

#[cfg(not(target_arch = "wasm32"))]
fn resolve_path(path_str: &str) -> Result<Url> {
  use anyhow::anyhow;

  let path = std::env::current_dir().unwrap().join(path_str);
  let path = normalize_path(&path);
  Url::from_file_path(path).map_err(|_| anyhow!("Invalid URL."))
}

#[cfg(target_arch = "wasm32")]
fn resolve_path(path_str: &str) -> Result<Url> {
  Url::parse(&format!("file://{}", path_str)).map_err(|err| err.into())
}

pub(crate) fn resolve_url_or_path(specifier: &str) -> Result<Url> {
  if specifier_has_uri_scheme(specifier) {
    Url::parse(specifier).map_err(|err| err.into())
  } else {
    resolve_path(specifier)
  }
}
