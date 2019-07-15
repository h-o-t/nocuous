const { describe, it } = intern.getInterface("bdd");
const { expect } = intern.getPlugin("chai");

import { fixtureAsSourceFile } from "../util";

import { stat } from "../../../src/stats/classDataAbstractionCoupling";

describe("stats/classDataAbstractionCoupling", () => {
  it("returns undefined when no items", async () => {
    const sourceFile = fixtureAsSourceFile("simple.ts");
    const result = await stat(sourceFile, { threshold: 10 });
    expect(result).to.be.undefined;
  });

  it("should count classes", async () => {
    const sourceFile = fixtureAsSourceFile(
      "stats/classDataAbstractionCoupling.ts"
    );
    const result = await stat(sourceFile, { threshold: 10 });
    expect(result).to.not.be.undefined;
    expect(result!.count).to.equal(2);
  });

  it("score based on the threshold", async () => {
    const sourceFile = fixtureAsSourceFile(
      "stats/classDataAbstractionCoupling.ts"
    );
    const result = await stat(sourceFile, { threshold: 10 });
    expect(result).to.not.be.undefined;
    expect(result!.score).to.equal(1);
  });
});
