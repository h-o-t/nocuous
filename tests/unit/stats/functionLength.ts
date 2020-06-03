import test from "ava";

import { fixtureAsSourceFile } from "../../util";

import { stat } from "../../../src/stats/functionLength";

test("stats/functionLength - no items", async (t) => {
  const sourceFile = fixtureAsSourceFile("simple.ts");
  const actual = await stat(sourceFile, { threshold: 30 });
  t.is(actual, undefined);
});

test("stats/functionLength - counts functions and method", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/functionLength.ts");
  const actual = await stat(sourceFile, { threshold: 30 });
  t.assert(actual);
  t.is(actual?.count, 6);
});

test("stats/functionLength - scores based on threshold", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/functionLength.ts");
  const actual = await stat(sourceFile, { threshold: 30 });
  t.assert(actual);
  t.is(actual?.score, 1);
});
