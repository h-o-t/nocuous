import chalk from "chalk";
import * as yargs from "yargs";
import * as packageJson from "../package.json";

const { bold } = chalk;

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
  .version("version", "Show version information", `Version ${packageJson.version}\n`)
  .alias("version", "v")
  .help()
  .wrap(80)
  .argv;
