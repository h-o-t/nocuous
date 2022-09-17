export class Foo {
  private _bar = "bar";
  getBaz = (): boolean => {
    return ["baz"].some((item) => item === "baz");
  };
  getBar(): string {
    return this._bar;
  }
  get qat(): string {
    return "qat";
  }
}

export function bar(): string {
  return "bar";
}

export const baz = function (): string {
  return "baz";
};

export const qat = [{ foo: "foo" }].map((item) => item.foo);

export function qux(a: string, b: string): string | number {
  if (a && typeof a === "string") {
    //
  } else if (b && typeof b === "string") {
    do {
      b = b.substr(1);
    } while (b.length);
    return b;
  } else if (a && b) {
    switch (a) {
      case "foo":
        return "foo";
      case "bar":
        return "bar";
      default:
        return "qat";
    }
  }
  return 0;
}

export function foo(a: number) {
  for (let i = 0; false; i++) { } // FoStatement without added complexity
  for (let i = 0; i < 10; i++) { }// FoStatement with added complexity
  while (false) { }; // WhileStatement with no added complexity
  while (a < 5) { // WhileStatement with added complexity
    do { a++ } while (a < 5); // DoStatement
  };
  try {} catch {}; // CatchClause
  a = a < 0 ? 0 : a; // ConditionalExpression
  for (let x in []) {}; // ForInStatement
  for (let x of []) {}; // ForOfStatement
  function bar() {}; // FunctionDeclaration
  const baz = function() {}; // FunctionExpression
  const obj = {
    foo() {}, // MethodDeclaration
    get bar() { return null }, // GetAccessor
    set bar(val) {}, // SetAccessor
  };
  const Quux = class {}; // ClassExpression
};
