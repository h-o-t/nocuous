import test from "ava";

import { fixtureAsSourceFile } from "../../util";

import { stat } from "../../../src/stats/anonInnerLength";

test("stats/anonInnerLength - returns undefined", async t => {
  const sourceFile = fixtureAsSourceFile("simple.ts");
  const actual = await stat(sourceFile, { threshold: 35 });
  t.is(actual, undefined);
});

test("stats/anonInnerLength - count arrow functions and class expressions", async t => {
  const sourceFile = fixtureAsSourceFile("stats/anonInnerLength.ts");
  const actual = await stat(sourceFile, { threshold: 35 });
  t.assert(actual);
  t.is(actual?.count, 3);
});

test("stats/anonInnerLength - score based on threshold", async t => {
  const sourceFile = fixtureAsSourceFile("stats/anonInnerLength.ts");
  const actual = await stat(sourceFile, { threshold: 35 });
  t.assert(actual);
  t.is(actual?.score, 1);
});
