import { SourceFile } from "ts-morph";

export interface StatOptions {
  /** The threshold that the score should be calculated by. */
  threshold: number;
}

export interface StatResult {
  /** A string identifier that indicates the metric the result relates to. */
  metric: string;

  /** The level that the result applies to. */
  level: "file" | "class" | "function" | "statement" | "item";

  /** The number of items that were counted at the specific level. */
  count: number;

  /** The threshold that was used to calculate the score. */
  threshold: number;

  /** The score as calculated.  The score is the aggregate of the number of
   * items in the source file coupled with the amount the threshold was
   * exceeded.  For example, if the threshold of method length was set at 30,
   * and the length was 45, then the score would be 1.5 for that method.
   */
  score: number;
}

export interface StatResults {
  [path: string]: StatResult[];
}

export interface Stat<T extends StatOptions> {
  (sourceFile: SourceFile, options: T): Promise<StatResult | undefined>;
}
