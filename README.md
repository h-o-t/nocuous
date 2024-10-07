# nocuous

![CI](https://github.com/h-o-t/nocuous/workflows/ci/badge.svg)
[![jsr.io/@higher-order-testing/nocuous](https://jsr.io/badges/@higher-order-testing/nocuous)](https://jsr.io/@higher-order-testing/nocuous)
[![jsr.io/@higher-order-testing/nocuous score](https://jsr.io/badges/@higher-order-testing/nocuous/score)](https://jsr.io/@higher-order-testing/nocuous)

A static code analysis tool for JavaScript and TypeScript.

## Installing the CLI

If you want to install the CLI, you would need to have Deno
[installed first](https://docs.deno.com/runtime/getting_started/installation/)
and then on the command line, you would want to run the following command:

```shell
$ deno install --name nocuous --allow-read --allow-net -f jsr:@higher-order-testing/nocuous/cli
```

You can also "pin" to a specific version by using `nocuous@{version}` instead,
for example `jsr:@higher-order-testing/nocuous@1.1.0/cli`.

The CLI comes with integrated help which can be accessed via the `--help` flag.

## Using the API

If you want to incorporate the API into an application, you need to import it
into your code. For example the following will analyze the Deno std assertion
library and its dependencies resolving with a map of statistics:

```ts
import { instantiate, stats } from "jsr:@higher-order-testing/nocuous";

await instantiate();

const results = await stats(new URL("https://jsr.io/@std/assert/1.0.6/mod.ts"));

console.log(results);
```

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

---

Copyright 2019 - 2024 Kitson P. Kelly. MIT License.
