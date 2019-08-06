export class Foo {
  private _bar = "bar";
  getBaz = (): boolean => {
    return ["baz"].some(item => item === "baz");
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

export const baz = function(): string {
  return "baz";
};

export const qat = [{ foo: "foo" }].map(item => item.foo);

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
