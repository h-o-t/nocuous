import { StatResults } from "../interfaces";
import { commonStartsWith } from "../util";

export function report(results: StatResults): void {
  const commonRoot = commonStartsWith(Object.keys(results));
  console.log("root:", commonRoot);
  for (const [path, stats] of Object.entries(results)) {
    console.log("  file:", path.substr(commonRoot.length - 1));
    for (const stat of stats) {
      if (stat.score) {
        console.log(
          "    stat:",
          stat.metric,
          " score:",
          Math.round(stat.score * 100) / 100
        );
      }
    }
  }
}
