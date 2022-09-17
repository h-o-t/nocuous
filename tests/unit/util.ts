import test from "ava";

import { commonStartsWith, sortPaths } from "../../src/util";

test("util/commonStartsWith - no items", async (t) => {
  const actual = commonStartsWith(["a/a", "a/b"]);
  t.is(actual, "a/");
});

test("util/sortPaths - no items", async (t) => {
  const actual = sortPaths(["b/b", "a/b", "a/a"]);
  t.deepEqual(actual, ["a/a", "a/b", "b/b"]);
});
