"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const yargs = require("yargs");
const packageJson = require("../package.json");
const { bold } = chalk_1.default;
console.log(`
${bold("nocuous - A static code analysis tool for JavaScript and TypeScript.")}
`);
yargs
  .pkgConf("nocuous")
  .usage("usage: $0 <command>")
  .commandDir("commands", {
    extensions: ["js", "ts"]
  })
  .demandCommand(1, "At least one command required\n")
  .version(
    "version",
    "Show version information",
    `Version ${packageJson.version}\n`
  )
  .alias("version", "v")
  .help()
  .wrap(80).argv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBMEI7QUFDMUIsK0JBQStCO0FBRy9CLE1BQU0sV0FBVyxHQUF3QixPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUVwRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsZUFBSyxDQUFDO0FBRXZCLE9BQU8sQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsc0VBQXNFLENBQUM7Q0FDN0UsQ0FBQyxDQUFDO0FBRUgsS0FBSztLQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDbEIsS0FBSyxDQUFDLHFCQUFxQixDQUFDO0tBQzVCLFVBQVUsQ0FBQyxVQUFVLEVBQUU7SUFDdEIsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztDQUN6QixDQUFDO0tBQ0QsYUFBYSxDQUFDLENBQUMsRUFBRSxpQ0FBaUMsQ0FBQztLQUNuRCxPQUFPLENBQ04sU0FBUyxFQUNULDBCQUEwQixFQUMxQixXQUFXLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FDbkM7S0FDQSxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQztLQUNyQixJQUFJLEVBQUU7S0FDTixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0ICogYXMgeWFyZ3MgZnJvbSBcInlhcmdzXCI7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzICovXG5jb25zdCBwYWNrYWdlSnNvbjogeyB2ZXJzaW9uOiBzdHJpbmcgfSA9IHJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIik7XG5cbmNvbnN0IHsgYm9sZCB9ID0gY2hhbGs7XG5cbmNvbnNvbGUubG9nKGBcbiR7Ym9sZChcIm5vY3VvdXMgLSBBIHN0YXRpYyBjb2RlIGFuYWx5c2lzIHRvb2wgZm9yIEphdmFTY3JpcHQgYW5kIFR5cGVTY3JpcHQuXCIpfVxuYCk7XG5cbnlhcmdzXG4gIC5wa2dDb25mKFwibm9jdW91c1wiKVxuICAudXNhZ2UoXCJ1c2FnZTogJDAgPGNvbW1hbmQ+XCIpXG4gIC5jb21tYW5kRGlyKFwiY29tbWFuZHNcIiwge1xuICAgIGV4dGVuc2lvbnM6IFtcImpzXCIsIFwidHNcIl1cbiAgfSlcbiAgLmRlbWFuZENvbW1hbmQoMSwgXCJBdCBsZWFzdCBvbmUgY29tbWFuZCByZXF1aXJlZFxcblwiKVxuICAudmVyc2lvbihcbiAgICBcInZlcnNpb25cIixcbiAgICBcIlNob3cgdmVyc2lvbiBpbmZvcm1hdGlvblwiLFxuICAgIGBWZXJzaW9uICR7cGFja2FnZUpzb24udmVyc2lvbn1cXG5gXG4gIClcbiAgLmFsaWFzKFwidmVyc2lvblwiLCBcInZcIilcbiAgLmhlbHAoKVxuICAud3JhcCg4MCkuYXJndjtcbiJdfQ==
