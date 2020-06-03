import test from "ava";

import { fixtureAsSourceFile } from "../../util";

import { stat } from "../../../src/stats/missingSwitchDefault";

test("stats/missingSwitchDefault - no items", async (t) => {
  const sourceFile = fixtureAsSourceFile("simple.ts");
  const actual = await stat(sourceFile, { threshold: 1 });
  t.is(actual, undefined);
});

test("stats/missingSwitchDefault - counts switch statements", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/missingSwitchDefault.ts");
  const actual = await stat(sourceFile, { threshold: 1 });
  t.assert(actual);
  t.is(actual?.count, 2);
});

test("stats/missingSwitchDefault - scores based on threshold", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/missingSwitchDefault.ts");
  const actual = await stat(sourceFile, { threshold: 1 });
  t.assert(actual);
  t.is(actual?.score, 1);
});
