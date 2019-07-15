import { TypeGuards } from "ts-morph";
import { Stat, StatOptions } from "../interfaces";

export const stat: Stat<StatOptions> = async function stat(sourceFile) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant(node => {
    if (TypeGuards.isSwitchStatement(node)) {
      count++;
      const hasDefaultClause = node
        .getCaseBlock()
        .getClauses()
        .some(node => TypeGuards.isDefaultClause(node));
      if (!hasDefaultClause) {
        score++;
      }
    }
  });
  return count
    ? {
        metric: "missingSwitchDefault",
        level: "statement",
        count,
        threshold: 1,
        score
      }
    : undefined;
};
