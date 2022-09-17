import test from "ava";
import { fixtureAsSourceFile } from "../../util";
import { stat } from "../../../src/stats/anonInnerLength";
import { report } from "../../../src/reports/csv";
import { StatResults } from "../../../src/interfaces";

test("reports/csv - works", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/cyclomaticComplexity.ts");
  const results: StatResults = {};
  results["path1/file1"] = [];
  results["path2/file2"] = [];
  const stat1 = await stat(sourceFile, { threshold: 1 });
  const stat2 = await stat(sourceFile, { threshold: 100 });
  if (stat1) {
    results["path1/file1"].push(stat1);
  }
  if (stat2) {
    results["path2/file2"].push(stat2);
  }
  report(results);
  report(results, { output: "/dev/null" });
  t.assert(true);
});
