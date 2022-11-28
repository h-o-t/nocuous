/**
 * @module
 */

import { Command } from "cliffy/command";
import stat from "./src/commands/stat.ts";

await new Command()
  .name("nocuous")
  .version("1.0.1")
  .action(function () {
    this.showHelp();
  })
  .description("Static code analysis for JavaScript and TypeScript.")
  .command("stat", stat)
  .parse(Deno.args);
