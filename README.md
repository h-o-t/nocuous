# nocuous

![CI](https://github.com/h-o-t/nocuous/workflows/CI/badge.svg)
[![npm version](https://img.shields.io/npm/v/nocuous)](https://www.npmjs.com/package/nocuous)

A static code analysis tool for JavaScript and TypeScript.

## Installation

```
$ npx nocuous
```

## Commands

### stat

Currently the only command (which is also the default command) is `stat`. `stat` provides code toxicity statistics for a JavaScript or TypeScript project. The command expects a single input file. If this file is a JavaScript or TypeScript file, it will analyze that file plus any of its dependencies which get imported into that file for code toxicity and output the information to stdout. If the file is a `.json` file, it is assumed it is a `tsconfig.json` and uses that to determine what files to analyze. For example to run stats for a project:

```
$ npx nocuous index.ts
```

`stat` can take an options of `-o` or `--output` which will write the results as a CSV to the specified file.

`stat` also accepts multiple input files and glob patterns passed as input files.

## Background

The statistics collected around code toxicity are based directly on Eric
Dörnenburg's article [How toxic is your code?](https://erik.doernenburg.com/2008/11/how-toxic-is-your-code/).

The default metrics are based on what is suggested in the article. When applying to TypeScript/JavaScript there are some adaptation that is required:

| Metric                          | Table Label | Description                                                                                      | Default Threshold |
| ------------------------------- | ----------- | ------------------------------------------------------------------------------------------------ | ----------------- |
| File length                     | L           | The number of lines in a file.                                                                   | 500               |
| Class fan-out complexity        | CFAC        | The number of classes or interfaces in the dependency chain for a given class.                   | 30                |
| Class data abstraction coupling | CDAC        | The number of instances of other classes that are "new"ed in a given class.                      | 10                |
| Anon Inner Length               | AIL         | Class expressions of arrow functions length in number of lines.                                  | 35                |
| Function Length                 | FL          | The number of statements in a function declaration, function expression, or method declaration.  | 30                |
| Parameter Number                | P           | The number of parameters for a function or method                                                | 6                 |
| Cyclomatic Complexity           | CC          | The cyclomatic complexity for a function or method                                               | 10                |
| Nested `if` Depth               | ID          | The number of nested `if` statements.                                                            | 3                 |
| Nested `try` Depth              | TD          | The number of nested `try` statements.                                                           | 2                 |
| Binary Expression Complexity    | BEC         | How complex a binary expression is (e.g. how many `&&` and `||` keywords an expression contains) | 3                 |
| Missing Switch Default          | MSD         | Any `switch` statements that are missing the `default` case.                                     | 1                 |
