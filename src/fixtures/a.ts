export class A {
  constructor() {
    const f = new F();
    f.u;
  }
}

class F {
  #u = new Uint8Array();

  get u() {
    return this.#u;
  }
}
