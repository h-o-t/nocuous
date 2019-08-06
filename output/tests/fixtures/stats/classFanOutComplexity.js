"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Foo {
  constructor() {
    this.foo = "foo";
  }
}
class Bar extends Foo {
  constructor() {
    super(...arguments);
    this.bar = "bar";
  }
}
class Baz extends Bar {
  constructor() {
    super(...arguments);
    this.baz = "baz";
  }
}
class Qat extends Baz {
  constructor() {
    super(...arguments);
    this.qat = "qat";
  }
}
class Qux extends Qat {
  constructor() {
    super(...arguments);
    this.qux = "qux";
  }
}
exports.Qux = Qux;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NGYW5PdXRDb21wbGV4aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdHMvZml4dHVyZXMvc3RhdHMvY2xhc3NGYW5PdXRDb21wbGV4aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxHQUFHO0lBQVQ7UUFDRSxRQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ2QsQ0FBQztDQUFBO0FBRUQsTUFBTSxHQUFJLFNBQVEsR0FBRztJQUFyQjs7UUFDRSxRQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ2QsQ0FBQztDQUFBO0FBRUQsTUFBTSxHQUFJLFNBQVEsR0FBRztJQUFyQjs7UUFDRSxRQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ2QsQ0FBQztDQUFBO0FBRUQsTUFBTSxHQUFJLFNBQVEsR0FBRztJQUFyQjs7UUFDRSxRQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ2QsQ0FBQztDQUFBO0FBRUQsTUFBYSxHQUFJLFNBQVEsR0FBRztJQUE1Qjs7UUFDRSxRQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ2QsQ0FBQztDQUFBO0FBRkQsa0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBGb28ge1xuICBmb28gPSBcImZvb1wiO1xufVxuXG5jbGFzcyBCYXIgZXh0ZW5kcyBGb28ge1xuICBiYXIgPSBcImJhclwiO1xufVxuXG5jbGFzcyBCYXogZXh0ZW5kcyBCYXIge1xuICBiYXogPSBcImJhelwiO1xufVxuXG5jbGFzcyBRYXQgZXh0ZW5kcyBCYXoge1xuICBxYXQgPSBcInFhdFwiO1xufVxuXG5leHBvcnQgY2xhc3MgUXV4IGV4dGVuZHMgUWF0IHtcbiAgcXV4ID0gXCJxdXhcIjtcbn1cbiJdfQ==
