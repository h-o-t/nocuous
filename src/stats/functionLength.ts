import { TypeGuards } from "ts-morph";
import { Stat, StatOptions } from "../interfaces";

/**
 * Searches the source file for function declarations or expressions and
 * analyses the number of statements in the body compared to the threshold.
 *
 * Functions that have too many statements are difficult to maintain and should
 * be broken up into smaller chunks of code.
 */
export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant(node => {
    if (
      TypeGuards.isFunctionDeclaration(node) ||
      TypeGuards.isFunctionExpression(node)
    ) {
      count++;
      const body = node.getBody();
      if (body && TypeGuards.isBlock(body)) {
        const length = body.getStatements().length;
        score += threshold && length > threshold ? length / threshold : 0;
      }
    }
  });
  return count
    ? {
        metric: "functionLength",
        level: "function",
        count,
        threshold,
        score
      }
    : undefined;
};
