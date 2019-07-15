export class Foo {
  foo = "foo";
}

export class Bar {
  foo = new Foo();
  foo1 = new Foo();
  foo2 = new Foo();
  foo3 = new Foo();
  foo4 = new Foo();
  foo5 = new Foo();
  foo6 = new Foo();
  foo7 = new Foo();
  foo8 = new Foo();
  getFoo(): Foo {
    return new Foo();
  }
}
