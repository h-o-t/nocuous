import { Stat, StatOptions } from "../interfaces";

export interface Config {
  [statName: string]: StatOptions;
}

interface StatInfo<O extends StatOptions = StatOptions> {
  fn: Stat<O>;
  options: O;
}

/**
 * Load the stats async and resolve with a `Map` that contains information about
 * the stats, including the stat function and configuration options.
 */
export async function load(config?: Config): Promise<Map<string, StatInfo>> {
  config = config || (await import("./config.json"));

  const statMap = new Map<string, StatInfo>();

  for (const statName of Object.keys(config)) {
    const statModule = `${__dirname}/${statName}`;
    const fn: Stat<StatOptions> = (await import(statModule)).stat;
    statMap.set(statName, {
      fn,
      options: config[statName],
    });
  }

  return statMap;
}
