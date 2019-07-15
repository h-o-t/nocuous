const { describe, it } = intern.getInterface("bdd");
const { expect } = intern.getPlugin("chai");

import { fixtureAsSourceFile } from "../util";

import { stat } from "../../../src/stats/anonInnerLength";

describe("stats/anonInnerLength", () => {
  it("returns undefined when no items", async () => {
    const sourceFile = fixtureAsSourceFile("simple.ts");
    const result = await stat(sourceFile, { threshold: 35 });
    expect(result).to.be.undefined;
  });

  it("should count arrow functions and class expressions", async () => {
    const sourceFile = fixtureAsSourceFile("stats/anonInnerLength.ts");
    const result = await stat(sourceFile, { threshold: 35 });
    expect(result).to.not.be.undefined;
    expect(result!.count).to.equal(3);
  });

  it("should score properly based on threshold", async () => {
    const sourceFile = fixtureAsSourceFile("stats/anonInnerLength.ts");
    const result = await stat(sourceFile, { threshold: 35 });
    expect(result).to.not.be.undefined;
    expect(result!.score).to.equal(1);
  });
});
