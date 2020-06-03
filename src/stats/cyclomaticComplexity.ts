import {
  BinaryExpression,
  DoStatement,
  Expression,
  ForStatement,
  IfStatement,
  Node,
  SyntaxKind,
  TypeGuards,
  WhileStatement,
} from "ts-morph";
import { Stat, StatOptions } from "../interfaces";

function binaryExpressionComplexity(node: BinaryExpression): number {
  let complexity = 0;
  node.forEachChild((innerNode) => {
    const kind = innerNode.getKind();
    if (
      kind === SyntaxKind.AmpersandAmpersandToken ||
      kind === SyntaxKind.BarBarToken
    ) {
      complexity++;
    }
  });
  return complexity;
}

function cyclomaticComplexity(node: Node): number {
  let complexity = 1;

  node.forEachDescendant((descendent, traversal) => {
    let expression: Expression;
    switch (descendent.getKind()) {
      case SyntaxKind.CaseClause:
      case SyntaxKind.CatchClause:
      case SyntaxKind.ConditionalExpression:
      case SyntaxKind.ForInStatement:
      case SyntaxKind.ForOfStatement:
        complexity++;
        break;
      case SyntaxKind.DoStatement:
        expression = (descendent as DoStatement).getExpression();
        if (
          TypeGuards.isBinaryExpression(expression) ||
          TypeGuards.isIdentifier(expression) ||
          TypeGuards.isPrefixUnaryExpression(expression)
        ) {
          complexity++;
        }
        break;
      case SyntaxKind.ForStatement:
        // eslint-disable-next-line no-case-declarations
        const condition = (descendent as ForStatement).getCondition();
        if (
          condition &&
          (TypeGuards.isBinaryExpression(condition) ||
            TypeGuards.isIdentifier(condition) ||
            TypeGuards.isPrefixUnaryExpression(condition))
        ) {
          complexity++;
        }
        break;
      case SyntaxKind.IfStatement:
        complexity += (descendent as IfStatement).getElseStatement() ? 2 : 1;
        break;
      case SyntaxKind.BinaryExpression:
        complexity += binaryExpressionComplexity(
          descendent as BinaryExpression
        );
        break;
      case SyntaxKind.WhileStatement:
        expression = (descendent as WhileStatement).getExpression();
        if (
          TypeGuards.isBinaryExpression(expression) ||
          TypeGuards.isIdentifier(expression) ||
          TypeGuards.isPrefixUnaryExpression(expression)
        ) {
          complexity++;
        }
        break;
      case SyntaxKind.FunctionDeclaration:
      case SyntaxKind.FunctionExpression:
      case SyntaxKind.ArrowFunction:
      case SyntaxKind.MethodDeclaration:
      case SyntaxKind.ClassExpression:
      case SyntaxKind.GetAccessor:
      case SyntaxKind.SetAccessor:
        traversal.skip();
        break;
      default:
      // noop
    }
  });
  return complexity;
}

export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant((node) => {
    if (
      TypeGuards.isFunctionDeclaration(node) ||
      TypeGuards.isFunctionExpression(node) ||
      TypeGuards.isMethodDeclaration(node) ||
      TypeGuards.isArrowFunction(node)
    ) {
      count++;
      const complexity = cyclomaticComplexity(node);
      score +=
        threshold && complexity >= threshold ? complexity / threshold : 0;
    }
  });
  return count
    ? {
        metric: "cyclomaticComplexity",
        level: "function",
        count,
        threshold,
        score,
      }
    : undefined;
};
