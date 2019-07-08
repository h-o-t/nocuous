import { Arguments, CommandBuilder } from "yargs";
import { createProject } from "../load";
import { StatResult, StatResults } from "../interfaces";
import { report } from "../reports/console";
import { load as loadStats } from "../stats/loader";

interface StatArguments extends Arguments {
  input: string;
  output: string;
}

export const command = "stat [input]";

export const describe = "Output statistics for a given input file.";

export const builder: CommandBuilder = function(yargs) {
  return yargs
    .example(
      "$0 stat main.ts",
      "analyses and outputs statistics to standard out"
    )
    .example(
      "$0 stat tsconfig.json",
      "uses the TypeScript configuration file to identify the code to analyse"
    )
    .option("output", {
      alias: "o",
      describe: "direct the output to a specific file",
      default: "",
      type: "string"
    })
    .positional("input", {
      describe: "root input file or configuration file to analyse",
      type: "string"
    });
};

export async function handler({ input }: StatArguments): Promise<void> {
  if (!input) {
    throw new TypeError("input source required");
  }
  console.log(`- Analyzing "${input}"`);
  const project = createProject(input);
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
  report(results);
}
