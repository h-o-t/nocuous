import { SyntaxKind } from "ts-morph";
import { Stat, StatOptions } from "../interfaces";
import { lineCount } from "../util";

/**
 * Searches the source file for class expressions or arrow functions and looks
 * at their length against the threshold.
 *
 * Long arrow functions or class expressions can be difficult to maintain or
 * understand.
 */
export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant((node, traversal) => {
    const syntaxKind = node.getKind();
    if (
      syntaxKind === SyntaxKind.ClassExpression ||
      syntaxKind === SyntaxKind.ArrowFunction
    ) {
      count++;
      const length = lineCount(node.getText());
      score += threshold && length >= threshold ? length / threshold : 0;
      traversal.skip();
    }
  });
  return count
    ? {
        metric: "anonInnerLength",
        level: "item",
        count,
        threshold,
        score,
      }
    : undefined;
};
