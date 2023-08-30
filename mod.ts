/**
 * A static analysis tool for JavaScript and TypeScript that provides code
 * toxicity information.
 *
 * ### Example
 *
 * Fetches the `std/asserts` library for Deno and its dependencies and returns
 * a map of the code toxicity statistics.
 *
 * ```ts
 * import { instantiate, stats } from "https://deno.land/x/nocuous/mod.ts";
 *
 * await instantiate();
 *
 * const results = await stats(
 *   new URL("https://deno.land/std/testing/asserts.ts"),
 * );
 *
 * console.log(results);
 * ```
 *
 * @module
 */

import {
  isAbsolute,
  join,
  toFileUrl,
} from "https://deno.land/std@0.200.0/path/mod.ts";
import * as wasm from "./lib/nocuous.generated.js";

interface InstantiationOptions {
  url?: URL;
  decompress?: (compressed: Uint8Array) => Uint8Array;
}

/** The level in a {@linkcode StatRecord} that the statistic pertains to. */
export enum StatLevel {
  Module = "module",
  Class = "class",
  Function = "function",
  Statement = "statement",
  Item = "item",
}

/** The interface representing a return value from {@linkcode stats}. */
export interface StatRecord {
  /** The name of the metric. */
  metric: string;
  /** The short name of the metric. This can be used for display in a table
   * for example. */
  metricShort: string;
  /** At what level does the statistic apply to. */
  level: StatLevel;
  /** The count of the number of items detected in the file/module. */
  count: number;
  /** The threshold used for determining the score. */
  threshold: number;
  /** How "toxic" where if any item exceeded the threshold, the score would be
   * at least 1, where the value is the statistic divided by the threshold. */
  score: number;
}

/** Options which can be set when calling {@linkcode stats}. */
interface StatsOptions {
  /** Override the default load behavior, which uses {@linkcode fetch} to
   * retrieve local or remote resources. */
  load?: (
    specifier: string,
  ) => Promise<[content: string | undefined, contentType: string | undefined]>;
  /** Override the default resolution behavior, which is a literal resolution
   * behavior used by Deno and web browsers. */
  resolve?: (specifier: string, referrer: string) => Promise<string>;
}

async function defaultLoad(
  specifier: string,
): Promise<[content: string | undefined, contentType: string | undefined]> {
  const res = await fetch(specifier);
  if (res.status === 200) {
    const contentType = res.headers.get("content-type") ?? undefined;
    return [await res.text(), contentType];
  }
  return [undefined, undefined];
}

/** Asynchronously instantiate the Wasm module. This needs to occur before using
 * other exported functions. */
export function instantiate(
  options?: InstantiationOptions,
): Promise<{ stats: typeof stats }> {
  return wasm.instantiate(options).then(() => ({ stats }));
}

/** Given a path and an optional base to use for a relative path, return a file
 * {@linkcode URL} for the path.
 *
 * `base` defaults to `Deno.cwd()`. If `base` is not absolute it will throw.
 */
export function asURL(path: string, base?: string): URL;
/** Given an array of paths and an optional base to use for relative paths,
 * return an array of file {@linkcode URL}s for the paths.
 *
 * `base` defaults to `Deno.cwd()`. If `base` is not absolute it will throw.
 */
export function asURL(paths: string[], base?: string): URL[];
export function asURL(
  paths: string | string[],
  base = Deno.cwd(),
): URL | URL[] {
  if (!isAbsolute(base)) {
    throw new TypeError(`The base of "${base}" must be absolute.`);
  }
  const inputIsArray = Array.isArray(paths);
  paths = Array.isArray(paths) ? paths : [paths];
  const urls = paths.map((path) =>
    toFileUrl(isAbsolute(path) ? path : join(base, path))
  );
  return inputIsArray ? urls : urls[0];
}

/** Given a set of URLs, perform a statistical analysis on the roots and their
 * dependencies, resolving with a {@linkcode Map} where the key is the string
 * URL of the file and the value is a {@linkcode StatRecord}. */
export function stats(
  roots: URL | URL[],
  options: StatsOptions = {},
): Promise<Map<string, StatRecord[]>> {
  const { load = defaultLoad, resolve } = options;
  const targets = Array.isArray(roots)
    ? roots.map((url) => url.toString())
    : [roots.toString()];
  return wasm.stats(targets, load, resolve);
}
