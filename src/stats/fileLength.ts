import { Stat, StatOptions } from "../interfaces";

/**
 * Counts the number of lines in the file, returning a score if the number of
 * lines exceeds the threshold.
 *
 * Long files are more difficult to maintain.
 */
export const stat: Stat<StatOptions> = async function stat(
  sourceFile,
  { threshold }
) {
  const lineCount = sourceFile.getEndLineNumber();
  const score =
    threshold > 0 && lineCount >= threshold ? lineCount / threshold : 0;
  return {
    metric: "fileLength",
    level: "file",
    count: 1, // files are always a single count
    threshold,
    score,
  };
};
