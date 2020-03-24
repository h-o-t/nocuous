import { Arguments, CommandBuilder } from "yargs";
import { create } from "../project";
import { StatResult, StatResults } from "../interfaces";
import { load as loadStats } from "../stats/loader";

interface StatArguments extends Arguments {
  inputs: string[];
  output: string;
}

export const command = ["$0 [inputs..]", "stat [inputs..]"];

export const describe = "Output statistics for a given input file(s).";

export const builder: CommandBuilder = function(yargs) {
  return yargs
    .example("$0 main.ts", "analyses and outputs statistics to standard out")
    .example(
      "$0 stat main.ts",
      "analyses and outputs statistics to standard out"
    )
    .example(
      "$0 stat tsconfig.json",
      "uses the TypeScript configuration file to identify the code to analyse"
    )
    .example(
      "$0 stat -o out.csv index.js",
      "writes the results as a CSV file to out.csv"
    )
    .example(
      "$0 stat index.js lib.js",
      "analyses both `index.js` and `lib.js` and any modules they import"
    )
    .example(
      "$0 stat src/**/*.js",
      "analyse all the files that end in `.js` in the src directory and sub-directories"
    )
    .option("output", {
      alias: "o",
      describe: "write out the output as a CSV file to the specified path",
      type: "string"
    })
    .positional("inputs", {
      describe: "root input files or a configuration file to analyse",
      type: "string"
    });
};

export async function handler({
  inputs,
  output
}: StatArguments): Promise<void> {
  if (!inputs) {
    throw new TypeError("input source required");
  }
  console.log(`- Analyzing "${inputs.join(`", "`)}"`);
  const project = create(inputs);
  const sourceFiles = project.getSourceFiles();
  const results: StatResults = {};
  const statInfo = await loadStats();
  for (const sourceFile of sourceFiles) {
    const filename = sourceFile.getFilePath();
    const stats: StatResult[] = (results[filename] = []);
    for (const { fn, options } of statInfo.values()) {
      const result = await fn(sourceFile, options);
      if (result) {
        stats.push(result);
      }
    }
  }
  if (output) {
    const { report } = await import("../reports/csv");
    report(results, { output });
  }
  const { report } = await import("../reports/table");
  report(results);
}
