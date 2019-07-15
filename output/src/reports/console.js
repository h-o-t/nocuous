"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
function report(results) {
  const commonRoot = util_1.commonStartsWith(Object.keys(results));
  console.log("root:", commonRoot);
  for (const [path, stats] of Object.entries(results)) {
    console.log("  file:", path.substr(commonRoot.length - 1));
    for (const stat of stats) {
      if (stat.score) {
        console.log(
          "    stat:",
          stat.metric,
          " score:",
          Math.round(stat.score * 100) / 100
        );
      }
    }
  }
}
exports.report = report;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvcnRzL2NvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxrQ0FBMkM7QUFFM0MsU0FBZ0IsTUFBTSxDQUFDLE9BQW9CO0lBQ3pDLE1BQU0sVUFBVSxHQUFHLHVCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FDVCxXQUFXLEVBQ1gsSUFBSSxDQUFDLE1BQU0sRUFDWCxTQUFTLEVBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FDbkMsQ0FBQzthQUNIO1NBQ0Y7S0FDRjtBQUNILENBQUM7QUFoQkQsd0JBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhdFJlc3VsdHMgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgY29tbW9uU3RhcnRzV2l0aCB9IGZyb20gXCIuLi91dGlsXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBvcnQocmVzdWx0czogU3RhdFJlc3VsdHMpOiB2b2lkIHtcbiAgY29uc3QgY29tbW9uUm9vdCA9IGNvbW1vblN0YXJ0c1dpdGgoT2JqZWN0LmtleXMocmVzdWx0cykpO1xuICBjb25zb2xlLmxvZyhcInJvb3Q6XCIsIGNvbW1vblJvb3QpO1xuICBmb3IgKGNvbnN0IFtwYXRoLCBzdGF0c10gb2YgT2JqZWN0LmVudHJpZXMocmVzdWx0cykpIHtcbiAgICBjb25zb2xlLmxvZyhcIiAgZmlsZTpcIiwgcGF0aC5zdWJzdHIoY29tbW9uUm9vdC5sZW5ndGggLSAxKSk7XG4gICAgZm9yIChjb25zdCBzdGF0IG9mIHN0YXRzKSB7XG4gICAgICBpZiAoc3RhdC5zY29yZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIiAgICBzdGF0OlwiLFxuICAgICAgICAgIHN0YXQubWV0cmljLFxuICAgICAgICAgIFwiIHNjb3JlOlwiLFxuICAgICAgICAgIE1hdGgucm91bmQoc3RhdC5zY29yZSAqIDEwMCkgLyAxMDBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==
