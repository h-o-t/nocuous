import test from "ava";

import { fixtureAsSourceFile } from "../../util";

import { stat } from "../../../src/stats/classFanOutComplexity";

test("stats/classFanOutComplexity - no items", async (t) => {
  const sourceFile = fixtureAsSourceFile("simple.ts");
  const actual = await stat(sourceFile, { threshold: 5 });
  t.is(actual, undefined);
});

test("stats/classFanOutComplexity - counts classes", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/classFanOutComplexity.ts");
  const actual = await stat(sourceFile, { threshold: 5 });
  t.assert(actual);
  t.is(actual?.count, 5);
});

test("stats/classFanOutComplexity - score based on threshold", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/classFanOutComplexity.ts");
  const actual = await stat(sourceFile, { threshold: 5 });
  t.assert(actual);
  t.is(actual?.score, 1);
});
