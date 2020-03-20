import { table, getBorderCharacters } from "table";
import { StatResults } from "../interfaces";
import { commonStartsWith, sortPaths } from "../util";

const labels: Record<string, string> = {
  anonInnerLength: "AIL",
  binaryExpressionComplexity: "BEC",
  classDataAbstractionCoupling: "CDAC",
  classFanOutComplexity: "CFAC",
  cyclomaticComplexity: "CC",
  fileLength: "L",
  functionLength: "FL",
  missingSwitchDefault: "MSD",
  nestedIfDepth: "ID",
  nestedTryDepth: "TD",
  parameterNumber: "P"
};

export function report(results: StatResults): void {
  const paths = sortPaths(Object.keys(results));
  const commonRoot = commonStartsWith(paths);
  console.log(`\nRoot path: ${commonRoot}\n`);
  const headers: string[] = [];
  for (const stats of Object.values(results)) {
    for (const { metric } of stats) {
      if (!headers.includes(metric)) {
        headers.push(metric);
      }
    }
  }
  const rows: Array<Array<string | undefined>> = [];
  for (const path of paths) {
    const stats = results[path];
    const row: Array<string | undefined> = [];
    let total = 0;
    for (const { score, metric } of stats) {
      if (score) {
        row[headers.indexOf(metric)] = `${Math.round(score * 100) / 100}`;
        total += score;
      }
    }
    row[headers.length] = `${Math.round(total * 100) / 100}`;
    row.unshift(path.replace(commonRoot, ""));
    rows.push(row);
  }
  const titles = headers.map(h => labels[h]);
  titles.unshift("Path");
  titles.push("Total");
  rows.unshift(titles);
  console.log(
    table(rows, {
      border: getBorderCharacters("norc"),
      drawHorizontalLine: (i, s) => i <= 1 || i === s
    })
  );
}
