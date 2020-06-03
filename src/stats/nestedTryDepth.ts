import { SyntaxKind, TryStatement, TypeGuards } from "ts-morph";
import { Stat, StatOptions } from "../interfaces";

/** A set of `try` statements to ensure the double counting does not occur. */
const seenTryStatements = new Set<TryStatement>();

/**
 * For a given `try` statement, return the depth of subsequent `try`
 * statements.  Terminate the count when reaching a function/method boundary.
 * Return `0` if the `try` statement was already seen.
 */
function tryStatementDepth(node: TryStatement): number {
  if (seenTryStatements.has(node)) {
    return 0;
  }
  let score = 1;
  seenTryStatements.add(node);
  node.getTryBlock().forEachDescendant((node, traversal) => {
    const kind = node.getKind();
    switch (kind) {
      case SyntaxKind.ArrowFunction:
      case SyntaxKind.FunctionDeclaration:
      case SyntaxKind.FunctionExpression:
      case SyntaxKind.MethodDeclaration:
        traversal.skip();
        break;
      case SyntaxKind.TryStatement:
        score += tryStatementDepth(node as TryStatement);
        break;
      default:
      // noop
    }
  });
  return score;
}

/**
 * Assess the depth of nested `try` statements above the threshold for a given
 * source file.
 */
export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant((node) => {
    if (TypeGuards.isTryStatement(node)) {
      const value = tryStatementDepth(node);
      if (value) {
        count++;
        score += threshold > 0 && value >= threshold ? value / threshold : 0;
      }
    }
  });
  return count
    ? {
        metric: "nestedTryDepth",
        level: "statement",
        count,
        threshold,
        score,
      }
    : undefined;
};
