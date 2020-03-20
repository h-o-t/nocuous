import { table } from "table";
import { StatResults } from "../interfaces";
import { commonStartsWith } from "../util";

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
  const commonRoot = commonStartsWith(Object.keys(results));
  console.log(`root: ${commonRoot}`);
  const headers: string[] = [];
  for (const stats of Object.values(results)) {
    for (const { metric } of stats) {
      if (!headers.includes(metric)) {
        headers.push(metric);
      }
    }
  }
  const rows: Array<Array<string | undefined>> = [];
  for (const [path, stats] of Object.entries(results)) {
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
      drawHorizontalLine: (i, s) => i <= 1 || i === s
    })
  );
}
