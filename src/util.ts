/**
 * Returns the longest common string that each of the values starts with.
 */
export function commonStartsWith(values: string[]): string {
  const sorted = values.slice().sort();
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const len = first.length;
  let i = 0;
  while (i < len && first.charAt(i) === last.charAt(i)) {
    i++;
  }
  return first.substr(0, i);
}
