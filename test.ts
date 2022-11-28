import { assertEquals } from "std/testing/asserts.ts";
import { join } from "std/path/mod.ts";
import { asURL, instantiate, stats } from "./mod.ts";

Deno.test({
  name: "generate stats - typescript base",
  async fn() {
    await instantiate();
    const actual = await stats(
      new URL("./src/fixtures/main.ts", import.meta.url),
    );
    assertEquals(actual.size, 4);
  },
});

Deno.test({
  name: "generate stats - javascript base",
  async fn() {
    await instantiate();
    const actual = await stats(
      new URL("./src/fixtures/index.js", import.meta.url),
    );
    assertEquals(actual.size, 4);
  },
});

Deno.test({
  name: "asURL - relative",
  fn() {
    const expected = new URL("mod.ts", import.meta.url);
    const actual = asURL("./mod.ts");
    assertEquals(actual.toString(), expected.toString());
  },
});

Deno.test({
  name: "asURL - relative base supplied",
  fn() {
    const expected = new URL("test/mod.ts", import.meta.url);
    const actual = asURL("./mod.ts", join(Deno.cwd(), "test"));
    assertEquals(actual.toString(), expected.toString());
  },
});

Deno.test({
  name: "asURL - absolute",
  fn() {
    const expected = new URL("mod.ts", import.meta.url);
    const actual = asURL(join(Deno.cwd(), "./mod.ts"));
    assertEquals(actual.toString(), expected.toString());
  },
});
