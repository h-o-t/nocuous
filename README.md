# nocuous

[![Build Status](https://dev.azure.com/kitsonk/nocuous/_apis/build/status/kitsonk.nocuous?branchName=master)](https://dev.azure.com/kitsonk/nocuous/_build/latest?definitionId=1&branchName=master)

A static code analysis tool for JavaScript and TypeScript.

## Background

The statistics collected around code toxicity are based directly on Eric
Dörnenburg's article [How toxic is your code?](https://erik.doernenburg.com/2008/11/how-toxic-is-your-code/).

The default metrics are based on what is suggested in the article. When applying to TypeScript/JavaScript there are some adaptation that is required:

| Metric                          | Description                                                                                      | Default Threshold |
| ------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------- |
| File length                     | The number of lines in a file.                                                                   | 500               |
| Class fan-out complexity        | The number of classes or interfaces in the dependency chain for a given class.                   | 30                |
| Class data abstraction coupling | The number of instances of other classes that are "new"ed in a given class.                      | 10                |
| Anon Inner Length               | Class expressions of arrow functions length in number of lines.                                  | 35                |
| Function Length                 | The number of statements in a function declaration, function expression, or method declaration.  | 30                |
| Parameter Number                | The number of parameters for a function or method                                                | 6                 |
| Cyclomatic Complexity           | The cyclomatic complexity for a function or method                                               | 10                |
| Nested `if` Depth               | The number of nested `if` statements.                                                            | 3                 |
| Nested `try` Depth              | The number of nested `try` statements.                                                           | 2                 |
| Binary Expression Complexity    | How complex a binary expression is (e.g. how many `&&` and `||` keywords an expression contains) | 3                 |
| Missing Switch Default          | Any `switch` statements that are missing the `default` case.                                     | 1                 |
