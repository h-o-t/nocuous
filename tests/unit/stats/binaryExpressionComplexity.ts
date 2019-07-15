const { describe, it } = intern.getInterface("bdd");
const { expect } = intern.getPlugin("chai");

import { fixtureAsSourceFile } from "../util";

import { stat } from "../../../src/stats/binaryExpressionComplexity";

describe("stats/binaryExpressionComplexity", () => {
  it("returns undefined when no items", async () => {
    const sourceFile = fixtureAsSourceFile("simple.ts");
    const result = await stat(sourceFile, { threshold: 3 });
    expect(result).to.be.undefined;
  });

  it("should count binary expressions", async () => {
    const sourceFile = fixtureAsSourceFile(
      "stats/binaryExpressionComplexity.ts"
    );
    const result = await stat(sourceFile, { threshold: 3 });
    expect(result).to.not.be.undefined;
    expect(result!.count).to.equal(4);
  });

  it("should score based on the threshold", async () => {
    const sourceFile = fixtureAsSourceFile(
      "stats/binaryExpressionComplexity.ts"
    );
    const result = await stat(sourceFile, { threshold: 3 });
    expect(result).to.not.be.undefined;
    expect(result!.score).to.equal(1);
  });
});
