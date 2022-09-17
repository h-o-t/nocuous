import test from "ava";

import { fixtureAsSourceFile } from "../../util";

import { stat } from "../../../src/stats/cyclomaticComplexity";

test("stats/cyclomaticComplexity - no items", async (t) => {
  const sourceFile = fixtureAsSourceFile("simple.ts");
  const actual = await stat(sourceFile, { threshold: 10 });
  t.is(actual, undefined);
});

test("stats/cyclomaticComplexity - counts functions and methods", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/cyclomaticComplexity.ts");
  const actual = await stat(sourceFile, { threshold: 10 });
  t.assert(actual);
  t.is(actual?.count, 11);
});

test("stats/cyclomaticComplexity - scores based on threshold", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/cyclomaticComplexity.ts");
  const actual = await stat(sourceFile, { threshold: 10 });
  t.assert(actual);
  t.is(actual?.score, 1.1);
});
