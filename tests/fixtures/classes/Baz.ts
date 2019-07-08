import Bar from "./Bar";

class Qat extends Bar {
  qat(): void {
    console.log("qat");
  }
}

class Qux extends Qat {
  qux(): void {
    console.log("qux");
  }
}

export default class Baz extends Qux {
  baz(): void {
    console.log("baz");
  }
}
