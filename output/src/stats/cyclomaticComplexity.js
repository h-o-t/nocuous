"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
function binaryExpressionComplexity(node) {
  let complexity = 0;
  node.forEachChild(node => {
    const kind = node.getKind();
    if (
      kind === ts_morph_1.SyntaxKind.AmpersandAmpersandToken ||
      kind === ts_morph_1.SyntaxKind.BarBarToken
    ) {
      complexity++;
    }
  });
  return complexity;
}
function cyclomaticComplexity(node) {
  let complexity = 1;
  node.forEachDescendant((node, traversal) => {
    let expression;
    switch (node.getKind()) {
      case ts_morph_1.SyntaxKind.CaseClause:
      case ts_morph_1.SyntaxKind.CatchClause:
      case ts_morph_1.SyntaxKind.ConditionalExpression:
      case ts_morph_1.SyntaxKind.ForInStatement:
      case ts_morph_1.SyntaxKind.ForOfStatement:
        complexity++;
        break;
      case ts_morph_1.SyntaxKind.DoStatement:
        expression = node.getExpression();
        if (
          ts_morph_1.TypeGuards.isBinaryExpression(expression) ||
          ts_morph_1.TypeGuards.isIdentifier(expression) ||
          ts_morph_1.TypeGuards.isPrefixUnaryExpression(expression)
        ) {
          complexity++;
        }
        break;
      case ts_morph_1.SyntaxKind.ForStatement:
        const condition = node.getCondition();
        if (
          condition &&
          (ts_morph_1.TypeGuards.isBinaryExpression(condition) ||
            ts_morph_1.TypeGuards.isIdentifier(condition) ||
            ts_morph_1.TypeGuards.isPrefixUnaryExpression(condition))
        ) {
          complexity++;
        }
        break;
      case ts_morph_1.SyntaxKind.IfStatement:
        complexity += node.getElseStatement() ? 2 : 1;
        break;
      case ts_morph_1.SyntaxKind.BinaryExpression:
        complexity += binaryExpressionComplexity(node);
        break;
      case ts_morph_1.SyntaxKind.WhileStatement:
        expression = node.getExpression();
        if (
          ts_morph_1.TypeGuards.isBinaryExpression(expression) ||
          ts_morph_1.TypeGuards.isIdentifier(expression) ||
          ts_morph_1.TypeGuards.isPrefixUnaryExpression(expression)
        ) {
          complexity++;
        }
        break;
      case ts_morph_1.SyntaxKind.FunctionDeclaration:
      case ts_morph_1.SyntaxKind.FunctionExpression:
      case ts_morph_1.SyntaxKind.ArrowFunction:
      case ts_morph_1.SyntaxKind.MethodDeclaration:
      case ts_morph_1.SyntaxKind.ClassExpression:
      case ts_morph_1.SyntaxKind.GetAccessor:
      case ts_morph_1.SyntaxKind.SetAccessor:
        traversal.skip();
        break;
      default:
    }
  });
  return complexity;
}
exports.stat = async function stat(sourceFile, { threshold }) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant(node => {
    if (
      ts_morph_1.TypeGuards.isFunctionDeclaration(node) ||
      ts_morph_1.TypeGuards.isFunctionExpression(node) ||
      ts_morph_1.TypeGuards.isMethodDeclaration(node) ||
      ts_morph_1.TypeGuards.isArrowFunction(node)
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
        score
      }
    : undefined;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ljbG9tYXRpY0NvbXBsZXhpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RhdHMvY3ljbG9tYXRpY0NvbXBsZXhpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FVa0I7QUFHbEIsU0FBUywwQkFBMEIsQ0FBQyxJQUFzQjtJQUN4RCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsSUFDRSxJQUFJLEtBQUsscUJBQVUsQ0FBQyx1QkFBdUI7WUFDM0MsSUFBSSxLQUFLLHFCQUFVLENBQUMsV0FBVyxFQUMvQjtZQUNBLFVBQVUsRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLElBQVU7SUFDdEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRTtRQUN6QyxJQUFJLFVBQXNCLENBQUM7UUFDM0IsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDdEIsS0FBSyxxQkFBVSxDQUFDLFVBQVUsQ0FBQztZQUMzQixLQUFLLHFCQUFVLENBQUMsV0FBVyxDQUFDO1lBQzVCLEtBQUsscUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQztZQUN0QyxLQUFLLHFCQUFVLENBQUMsY0FBYyxDQUFDO1lBQy9CLEtBQUsscUJBQVUsQ0FBQyxjQUFjO2dCQUM1QixVQUFVLEVBQUUsQ0FBQztnQkFDYixNQUFNO1lBQ1IsS0FBSyxxQkFBVSxDQUFDLFdBQVc7Z0JBQ3pCLFVBQVUsR0FBSSxJQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNuRCxJQUNFLHFCQUFVLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDO29CQUN6QyxxQkFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7b0JBQ25DLHFCQUFVLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLEVBQzlDO29CQUNBLFVBQVUsRUFBRSxDQUFDO2lCQUNkO2dCQUNELE1BQU07WUFDUixLQUFLLHFCQUFVLENBQUMsWUFBWTtnQkFDMUIsTUFBTSxTQUFTLEdBQUksSUFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEQsSUFDRSxTQUFTO29CQUNULENBQUMscUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7d0JBQ3ZDLHFCQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQzt3QkFDbEMscUJBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUNoRDtvQkFDQSxVQUFVLEVBQUUsQ0FBQztpQkFDZDtnQkFDRCxNQUFNO1lBQ1IsS0FBSyxxQkFBVSxDQUFDLFdBQVc7Z0JBQ3pCLFVBQVUsSUFBSyxJQUFvQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxNQUFNO1lBQ1IsS0FBSyxxQkFBVSxDQUFDLGdCQUFnQjtnQkFDOUIsVUFBVSxJQUFJLDBCQUEwQixDQUFDLElBQXdCLENBQUMsQ0FBQztnQkFDbkUsTUFBTTtZQUNSLEtBQUsscUJBQVUsQ0FBQyxjQUFjO2dCQUM1QixVQUFVLEdBQUksSUFBdUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDdEQsSUFDRSxxQkFBVSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztvQkFDekMscUJBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO29CQUNuQyxxQkFBVSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxFQUM5QztvQkFDQSxVQUFVLEVBQUUsQ0FBQztpQkFDZDtnQkFDRCxNQUFNO1lBQ1IsS0FBSyxxQkFBVSxDQUFDLG1CQUFtQixDQUFDO1lBQ3BDLEtBQUsscUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuQyxLQUFLLHFCQUFVLENBQUMsYUFBYSxDQUFDO1lBQzlCLEtBQUsscUJBQVUsQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQyxLQUFLLHFCQUFVLENBQUMsZUFBZSxDQUFDO1lBQ2hDLEtBQUsscUJBQVUsQ0FBQyxXQUFXLENBQUM7WUFDNUIsS0FBSyxxQkFBVSxDQUFDLFdBQVc7Z0JBQ3pCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDakIsTUFBTTtZQUNSLFFBQVE7U0FFVDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUVZLFFBQUEsSUFBSSxHQUFzQixLQUFLLFVBQVUsSUFBSSxDQUN4RCxVQUFVLEVBQ1YsRUFBRSxTQUFTLEVBQUU7SUFFYixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbEMsSUFDRSxxQkFBVSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQztZQUN0QyxxQkFBVSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQztZQUNyQyxxQkFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztZQUNwQyxxQkFBVSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFDaEM7WUFDQSxLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLEtBQUs7Z0JBQ0gsU0FBUyxJQUFJLFVBQVUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyRTtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxLQUFLO1FBQ1YsQ0FBQyxDQUFDO1lBQ0UsTUFBTSxFQUFFLHNCQUFzQjtZQUM5QixLQUFLLEVBQUUsVUFBVTtZQUNqQixLQUFLO1lBQ0wsU0FBUztZQUNULEtBQUs7U0FDTjtRQUNILENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDaEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQmluYXJ5RXhwcmVzc2lvbixcbiAgRG9TdGF0ZW1lbnQsXG4gIEV4cHJlc3Npb24sXG4gIEZvclN0YXRlbWVudCxcbiAgSWZTdGF0ZW1lbnQsXG4gIE5vZGUsXG4gIFN5bnRheEtpbmQsXG4gIFR5cGVHdWFyZHMsXG4gIFdoaWxlU3RhdGVtZW50XG59IGZyb20gXCJ0cy1tb3JwaFwiO1xuaW1wb3J0IHsgU3RhdCwgU3RhdE9wdGlvbnMgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xuXG5mdW5jdGlvbiBiaW5hcnlFeHByZXNzaW9uQ29tcGxleGl0eShub2RlOiBCaW5hcnlFeHByZXNzaW9uKTogbnVtYmVyIHtcbiAgbGV0IGNvbXBsZXhpdHkgPSAwO1xuICBub2RlLmZvckVhY2hDaGlsZChub2RlID0+IHtcbiAgICBjb25zdCBraW5kID0gbm9kZS5nZXRLaW5kKCk7XG4gICAgaWYgKFxuICAgICAga2luZCA9PT0gU3ludGF4S2luZC5BbXBlcnNhbmRBbXBlcnNhbmRUb2tlbiB8fFxuICAgICAga2luZCA9PT0gU3ludGF4S2luZC5CYXJCYXJUb2tlblxuICAgICkge1xuICAgICAgY29tcGxleGl0eSsrO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb21wbGV4aXR5O1xufVxuXG5mdW5jdGlvbiBjeWNsb21hdGljQ29tcGxleGl0eShub2RlOiBOb2RlKTogbnVtYmVyIHtcbiAgbGV0IGNvbXBsZXhpdHkgPSAxO1xuXG4gIG5vZGUuZm9yRWFjaERlc2NlbmRhbnQoKG5vZGUsIHRyYXZlcnNhbCkgPT4ge1xuICAgIGxldCBleHByZXNzaW9uOiBFeHByZXNzaW9uO1xuICAgIHN3aXRjaCAobm9kZS5nZXRLaW5kKCkpIHtcbiAgICAgIGNhc2UgU3ludGF4S2luZC5DYXNlQ2xhdXNlOlxuICAgICAgY2FzZSBTeW50YXhLaW5kLkNhdGNoQ2xhdXNlOlxuICAgICAgY2FzZSBTeW50YXhLaW5kLkNvbmRpdGlvbmFsRXhwcmVzc2lvbjpcbiAgICAgIGNhc2UgU3ludGF4S2luZC5Gb3JJblN0YXRlbWVudDpcbiAgICAgIGNhc2UgU3ludGF4S2luZC5Gb3JPZlN0YXRlbWVudDpcbiAgICAgICAgY29tcGxleGl0eSsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3ludGF4S2luZC5Eb1N0YXRlbWVudDpcbiAgICAgICAgZXhwcmVzc2lvbiA9IChub2RlIGFzIERvU3RhdGVtZW50KS5nZXRFeHByZXNzaW9uKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBUeXBlR3VhcmRzLmlzQmluYXJ5RXhwcmVzc2lvbihleHByZXNzaW9uKSB8fFxuICAgICAgICAgIFR5cGVHdWFyZHMuaXNJZGVudGlmaWVyKGV4cHJlc3Npb24pIHx8XG4gICAgICAgICAgVHlwZUd1YXJkcy5pc1ByZWZpeFVuYXJ5RXhwcmVzc2lvbihleHByZXNzaW9uKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb21wbGV4aXR5Kys7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN5bnRheEtpbmQuRm9yU3RhdGVtZW50OlxuICAgICAgICBjb25zdCBjb25kaXRpb24gPSAobm9kZSBhcyBGb3JTdGF0ZW1lbnQpLmdldENvbmRpdGlvbigpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY29uZGl0aW9uICYmXG4gICAgICAgICAgKFR5cGVHdWFyZHMuaXNCaW5hcnlFeHByZXNzaW9uKGNvbmRpdGlvbikgfHxcbiAgICAgICAgICAgIFR5cGVHdWFyZHMuaXNJZGVudGlmaWVyKGNvbmRpdGlvbikgfHxcbiAgICAgICAgICAgIFR5cGVHdWFyZHMuaXNQcmVmaXhVbmFyeUV4cHJlc3Npb24oY29uZGl0aW9uKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29tcGxleGl0eSsrO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTeW50YXhLaW5kLklmU3RhdGVtZW50OlxuICAgICAgICBjb21wbGV4aXR5ICs9IChub2RlIGFzIElmU3RhdGVtZW50KS5nZXRFbHNlU3RhdGVtZW50KCkgPyAyIDogMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN5bnRheEtpbmQuQmluYXJ5RXhwcmVzc2lvbjpcbiAgICAgICAgY29tcGxleGl0eSArPSBiaW5hcnlFeHByZXNzaW9uQ29tcGxleGl0eShub2RlIGFzIEJpbmFyeUV4cHJlc3Npb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3ludGF4S2luZC5XaGlsZVN0YXRlbWVudDpcbiAgICAgICAgZXhwcmVzc2lvbiA9IChub2RlIGFzIFdoaWxlU3RhdGVtZW50KS5nZXRFeHByZXNzaW9uKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBUeXBlR3VhcmRzLmlzQmluYXJ5RXhwcmVzc2lvbihleHByZXNzaW9uKSB8fFxuICAgICAgICAgIFR5cGVHdWFyZHMuaXNJZGVudGlmaWVyKGV4cHJlc3Npb24pIHx8XG4gICAgICAgICAgVHlwZUd1YXJkcy5pc1ByZWZpeFVuYXJ5RXhwcmVzc2lvbihleHByZXNzaW9uKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb21wbGV4aXR5Kys7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN5bnRheEtpbmQuRnVuY3Rpb25EZWNsYXJhdGlvbjpcbiAgICAgIGNhc2UgU3ludGF4S2luZC5GdW5jdGlvbkV4cHJlc3Npb246XG4gICAgICBjYXNlIFN5bnRheEtpbmQuQXJyb3dGdW5jdGlvbjpcbiAgICAgIGNhc2UgU3ludGF4S2luZC5NZXRob2REZWNsYXJhdGlvbjpcbiAgICAgIGNhc2UgU3ludGF4S2luZC5DbGFzc0V4cHJlc3Npb246XG4gICAgICBjYXNlIFN5bnRheEtpbmQuR2V0QWNjZXNzb3I6XG4gICAgICBjYXNlIFN5bnRheEtpbmQuU2V0QWNjZXNzb3I6XG4gICAgICAgIHRyYXZlcnNhbC5za2lwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgIC8vIG5vb3BcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29tcGxleGl0eTtcbn1cblxuZXhwb3J0IGNvbnN0IHN0YXQ6IFN0YXQ8U3RhdE9wdGlvbnM+ID0gYXN5bmMgZnVuY3Rpb24gc3RhdChcbiAgc291cmNlRmlsZSxcbiAgeyB0aHJlc2hvbGQgfVxuKSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGxldCBzY29yZSA9IDA7XG4gIHNvdXJjZUZpbGUuZm9yRWFjaERlc2NlbmRhbnQobm9kZSA9PiB7XG4gICAgaWYgKFxuICAgICAgVHlwZUd1YXJkcy5pc0Z1bmN0aW9uRGVjbGFyYXRpb24obm9kZSkgfHxcbiAgICAgIFR5cGVHdWFyZHMuaXNGdW5jdGlvbkV4cHJlc3Npb24obm9kZSkgfHxcbiAgICAgIFR5cGVHdWFyZHMuaXNNZXRob2REZWNsYXJhdGlvbihub2RlKSB8fFxuICAgICAgVHlwZUd1YXJkcy5pc0Fycm93RnVuY3Rpb24obm9kZSlcbiAgICApIHtcbiAgICAgIGNvdW50Kys7XG4gICAgICBjb25zdCBjb21wbGV4aXR5ID0gY3ljbG9tYXRpY0NvbXBsZXhpdHkobm9kZSk7XG4gICAgICBzY29yZSArPVxuICAgICAgICB0aHJlc2hvbGQgJiYgY29tcGxleGl0eSA+PSB0aHJlc2hvbGQgPyBjb21wbGV4aXR5IC8gdGhyZXNob2xkIDogMDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY291bnRcbiAgICA/IHtcbiAgICAgICAgbWV0cmljOiBcImN5Y2xvbWF0aWNDb21wbGV4aXR5XCIsXG4gICAgICAgIGxldmVsOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIGNvdW50LFxuICAgICAgICB0aHJlc2hvbGQsXG4gICAgICAgIHNjb3JlXG4gICAgICB9XG4gICAgOiB1bmRlZmluZWQ7XG59O1xuIl19
