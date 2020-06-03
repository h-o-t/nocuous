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
  node.forEachChild((node) => {
    const kind = node.getKind();
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

  node.forEachDescendant((node, traversal) => {
    let expression: Expression;
    switch (node.getKind()) {
      case SyntaxKind.CaseClause:
      case SyntaxKind.CatchClause:
      case SyntaxKind.ConditionalExpression:
      case SyntaxKind.ForInStatement:
      case SyntaxKind.ForOfStatement:
        complexity++;
        break;
      case SyntaxKind.DoStatement:
        expression = (node as DoStatement).getExpression();
        if (
          TypeGuards.isBinaryExpression(expression) ||
          TypeGuards.isIdentifier(expression) ||
          TypeGuards.isPrefixUnaryExpression(expression)
        ) {
          complexity++;
        }
        break;
      case SyntaxKind.ForStatement:
        const condition = (node as ForStatement).getCondition();
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
        complexity += (node as IfStatement).getElseStatement() ? 2 : 1;
        break;
      case SyntaxKind.BinaryExpression:
        complexity += binaryExpressionComplexity(node as BinaryExpression);
        break;
      case SyntaxKind.WhileStatement:
        expression = (node as WhileStatement).getExpression();
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
