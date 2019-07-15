const bar = 1;

export const foo = bar || "foo";

if (bar && foo) {
  console.log(bar || foo);
}

if ((bar && foo && true) || "") {
  console.log("bar");
}
