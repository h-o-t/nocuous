import { writeFileSync } from "fs";
import { ReportOptions, StatResults } from "../interfaces";
import { sortPaths } from "../util";

const labels: Record<string, string> = {
  anonInnerLength: "Anonymous inner length",
  binaryExpressionComplexity: "Binary expression complexity",
  classDataAbstractionCoupling: "Class data abstraction coupling",
  classFanOutComplexity: "Class fan-out complexity",
  cyclomaticComplexity: "Cyclomatic complexity",
  fileLength: "File length",
  functionLength: "Function length",
  missingSwitchDefault: "Missing switch default",
  nestedIfDepth: "Nested if depth",
  nestedTryDepth: "Nested try depth",
  parameterNumber: "Parameter number",
};

export function report(
  results: StatResults,
  { output }: ReportOptions = {}
): void {
  const paths = sortPaths(Object.keys(results));
  const headers: string[] = [];
  for (const stats of Object.values(results)) {
    for (const { metric } of stats) {
      if (!headers.includes(metric)) {
        headers.push(metric);
      }
    }
  }
  const rows: Array<string> = [];
  for (const path of paths) {
    const stats = results[path];
    const row: Array<string | undefined> = [];
    for (const { score, metric } of stats) {
      if (score) {
        row[headers.indexOf(metric)] = `${Math.round(score * 100) / 100}`;
      }
    }
    row.unshift(`"${path}"`);
    row.length = headers.length;
    rows.push(row.join(","));
  }
  const titles = headers.map((h) => `"${labels[h]}"`);
  titles.unshift(`"Path"`);
  rows.unshift(titles.join(","));
  const content = rows.join("\n");
  if (output) {
    writeFileSync(output, content, { encoding: "utf8" });
  } else {
    // eslint-disable-next-line no-console
    console.log(content);
  }
}
