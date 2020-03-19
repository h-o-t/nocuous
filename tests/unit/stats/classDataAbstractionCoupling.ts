import test from "ava";

import { fixtureAsSourceFile } from "../../util";

import { stat } from "../../../src/stats/classDataAbstractionCoupling";

test("stats/classDataAbstractionCoupling - returns undefined", async t => {
  const sourceFile = fixtureAsSourceFile("simple.ts");
  const actual = await stat(sourceFile, { threshold: 10 });
  t.is(actual, undefined);
});

test("stats/classDataAbstractionCoupling - counts classes", async t => {
  const sourceFile = fixtureAsSourceFile(
    "stats/classDataAbstractionCoupling.ts"
  );
  const actual = await stat(sourceFile, { threshold: 10 });
  t.assert(actual);
  t.is(actual?.count, 2);
});

test("stats/classDataAbstractionCoupling - score based on threshold", async t => {
  const sourceFile = fixtureAsSourceFile(
    "stats/classDataAbstractionCoupling.ts"
  );
  const actual = await stat(sourceFile, { threshold: 10 });
  t.assert(actual);
  t.is(actual?.score, 1);
});
