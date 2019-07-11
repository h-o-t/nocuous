import { SyntaxKind } from "ts-morph";
import { Stat, StatOptions } from "../interfaces";

/**
 * Enumerates the classes in the source file, looking for new expressions within
 * the class, where if the number of new expressions is greater the the
 * threshold, provide a score relative to the threshold.
 *
 * A high level of dependency on other classes within a class, means that the
 * class is tightly coupled to these other classes which make it harder to
 * maintain.
 */
export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  const classes = sourceFile.getClasses();
  const count = classes.length;
  let score = 0;
  for (const classNode of classes) {
    let newExpressionCount = 0;
    classNode.forEachDescendant((node, traversal) => {
      if (node.getKind() === SyntaxKind.NewExpression) {
        newExpressionCount++;
        traversal.skip();
      }
    });
    score +=
      threshold > 0 && newExpressionCount >= threshold
        ? newExpressionCount / threshold
        : 0;
  }
  return count
    ? {
        metric: "classDataAbstractionCoupling",
        level: "class",
        count,
        threshold,
        score
      }
    : undefined;
};
