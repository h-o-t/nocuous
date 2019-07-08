import { TypeGuards } from "ts-morph";
import { Stat, StatOptions } from "../interfaces";

/**
 * Searches the source file for method declarations and analyses the number
 * of statements in the body, above the threshold.
 *
 * Methods that have too many statements are difficult to maintain and should
 * be broken up into smaller chunks of code.
 */
export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant((node, traversal) => {
    if (TypeGuards.isMethodDeclaration(node)) {
      count++;
      const body = node.getBody();
      if (body && TypeGuards.isBlock(body)) {
        const length = body.getStatements().length;
        score += threshold && length > threshold ? length / threshold : 0;
      }
      traversal.skip();
    }
  });
  return count
    ? {
        metric: "methodLength",
        level: "method",
        count,
        threshold,
        score
      }
    : undefined;
};
