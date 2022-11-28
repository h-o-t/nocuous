# nocuous

![CI](https://github.com/h-o-t/nocuous/workflows/ci/badge.svg)
[![npm version](https://img.shields.io/npm/v/nocuous)](https://www.npmjs.com/package/nocuous)

A static code analysis tool for JavaScript and TypeScript.

## Installing the CLI

If you want to install the CLI, you would need to have Deno
[installed first](https://deno.land/manual@v1.28.2/getting_started/installation)
and then on the command line, you would want to run the following command:

```shell
$ deno install --name nocuous --allow-read --allow-net --allow-hrtime --import-map https://deno.land/x/nocuous/import_map.json -f https://deno.land/x/nocuous/cli.ts
```

You can also "pin" to a specific version by using `nocuous@{version}` instead,
for example `https://deno.land/nocuous@1.0.0/import_map.json` and
`https://deno.land/nocuous@1.0.0/cli.ts`.

The CLI comes with integrated help which can be accessed via the `--help` flag.

## Using the API

If you want to incorporate the API into an application, you need to import it
into your code. For example the following will analyze the Deno std assertion
library and its dependencies resolving with a map of statistics:

```ts
import { instantiate, stats } from "https://deno.land/x/nocuous/mod.ts";

await instantiate();

const results = await stats(
  new URL("https://deno.land/std/testing/asserts.ts"),
);

console.log(results);
```

It is recommended though that you "pin" to a specific version of the library,
for example to import from version _1.0.0_ you would want to import from
`https://deno.land/x/nocuous@1.0.0/mod.ts`.

## Architecture

The tool uses [swc](https://swc.rs/) as a Rust library to parse code and then
run analysis over the parsed code. It is then compiled to Web Assembly and
exposed as an all-in-one API. Code is loaded via the JavaScript runtime and a
resolver can be provided to allow for custom resolution logic.

## Background

The statistics collected around code toxicity are based directly on Erik
Dörnenburg's article
[How toxic is your code?](https://erik.doernenburg.com/2008/11/how-toxic-is-your-code/).

The default metrics are based on what is suggested in the article. When applying
to TypeScript/JavaScript there are some adaptation that is required:

| Metric                          | Table Label | Description                                                                                     | Default Threshold |
| ------------------------------- | ----------- | ----------------------------------------------------------------------------------------------- | ----------------- |
| File length                     | L           | The number of lines in a file.                                                                  | 500               |
| Class data abstraction coupling | CDAC        | The number of instances of other classes that are "new"ed in a given class.                     | 10                |
| Anon Inner Length               | AIL         | Class expressions of arrow functions length in number of lines.                                 | 35                |
| Function Length                 | FL          | The number of statements in a function declaration, function expression, or method declaration. | 30                |
| Parameter Number                | P           | The number of parameters for a function or method                                               | 6                 |
| Cyclomatic Complexity           | CC          | The cyclomatic complexity for a function or method                                              | 10                |
| Binary Expression Complexity    | BEC         | How complex a binary expression is (e.g. how many `&&` and `                                    |                   |
| Missing Switch Default          | MSD         | Any `switch` statements that are missing the `default` case.                                    | 1                 |
