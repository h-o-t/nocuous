[].map(item => {
  console.log(item);
});

export class Foo {
  bar = new (class {
    constructor() {
      console.log("bar");
    }
  })();
}

[].map(() => {
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
  console.log("a");
});
