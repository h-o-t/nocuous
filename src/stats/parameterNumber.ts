import { TypeGuards } from "ts-morph";
import { Stat, StatOptions } from "../interfaces";

export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant(node => {
    if (
      TypeGuards.isFunctionDeclaration(node) ||
      TypeGuards.isFunctionExpression(node) ||
      TypeGuards.isMethodDeclaration(node)
    ) {
      count++;
      const paramCount = node.getParameters().length;
      score +=
        threshold && paramCount >= threshold ? paramCount / threshold : 0;
    }
  });
  return count
    ? {
        metric: "parameterNumber",
        level: "function",
        count,
        threshold,
        score
      }
    : undefined;
};
