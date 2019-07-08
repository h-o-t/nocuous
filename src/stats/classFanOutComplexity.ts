import { Type } from "ts-morph";
import { Stat, StatOptions } from "../interfaces";

/**
 * Recursively counts the base types for a given node.
 */
function countBaseTypes(node: { getBaseTypes: () => Type[] }): number {
  let count = 1;
  const baseTypes = node.getBaseTypes();
  for (const baseType of baseTypes) {
    count += countBaseTypes(baseType);
  }
  return count;
}

/**
 * Enumerates the classes in a source file and recursively counts the number of
 * "base types" a class is dependent upon, where a mixin, interface or another
 * class counts.
 *
 * Having a high level of complexity in the dependency "chain" of classes makes
 * code more fragile and harder to maintain without introducing regressions.
 */
export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  const classes = sourceFile.getClasses();
  const count = classes.length;
  let score = 0;
  for (const classNode of classes) {
    const count = countBaseTypes(classNode);
    score += threshold > 0 && count > threshold ? count / threshold : 0;
  }
  return count
    ? {
        metric: "classFanOutComplexity",
        level: "class",
        count,
        threshold,
        score
      }
    : undefined;
};
