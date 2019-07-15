import { IfStatement, SyntaxKind, TypeGuards } from "ts-morph";
import { Stat, StatOptions } from "../interfaces";

/** A set of if statements to ensure the double counting does not occur. */
const seenIfStatements = new Set<IfStatement>();

/** For a given if statement, return the depth of subsequent if statements.
 * Terminate the count when reaching a function/method boundary.  Return `0` if
 * the `if` statement was already seen.
 */
function ifStatementDepth(node: IfStatement): number {
  if (seenIfStatements.has(node)) {
    return 0;
  }
  let score = 1;
  seenIfStatements.add(node);
  node.getThenStatement().forEachDescendant((node, traversal) => {
    const kind = node.getKind();
    switch (kind) {
      case SyntaxKind.ArrowFunction:
      case SyntaxKind.FunctionDeclaration:
      case SyntaxKind.FunctionExpression:
      case SyntaxKind.MethodDeclaration:
        traversal.skip();
        break;
      case SyntaxKind.IfStatement:
        score += ifStatementDepth(node as IfStatement);
        break;
      default:
      // noop
    }
  });
  return score;
}

/**
 * Assess the depth of nested `if` statements above the threshold for a given
 * source file.
 */
export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant(node => {
    if (TypeGuards.isIfStatement(node)) {
      const value = ifStatementDepth(node);
      if (value) {
        count++;
        score += threshold > 0 && value >= threshold ? value / threshold : 0;
      }
    }
  });
  return count
    ? {
        metric: "nestedIfDepth",
        level: "statement",
        count,
        threshold,
        score
      }
    : undefined;
};
