import { TypeGuards } from "ts-morph";
import { Stat, StatOptions } from "../interfaces";

export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant((node, traversal) => {
    if (TypeGuards.isBinaryExpression(node)) {
      count++;
      let complexity = 1;
      node.forEachDescendant((innerNode) => {
        if (TypeGuards.isBinaryExpression(innerNode)) {
          complexity++;
        }
      });
      score +=
        threshold > 0 && complexity >= threshold ? complexity / threshold : 0;
      traversal.skip();
    }
  });
  return count
    ? {
        metric: "binaryExpressionComplexity",
        level: "statement",
        count,
        threshold,
        score,
      }
    : undefined;
};
