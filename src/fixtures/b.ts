export class B {
  #a() {
    return undefined;
  }

  b() {
    return this.#a();
  }

  c(a: string, b: string, c: string, d: string, e: string) {
    return `${a}${b}${c}${d}${e}`;
  }
}
