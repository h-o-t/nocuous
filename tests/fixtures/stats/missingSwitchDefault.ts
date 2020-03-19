export function foo(value: string) {
  switch (value) {
    case "foo":
      break;
    case "bar":
      break;
    default:
      console.log("?");
  }

  switch (value) {
    case "foo":
      break;
  }
}
