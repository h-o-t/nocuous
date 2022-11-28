/**
 * @module
 */

import { colors } from "cliffy/ansi/colors";
import { Command } from "cliffy/command";
import { Cell, Row, Table } from "cliffy/table";
import { common } from "std/path/mod.ts";

import { kia } from "../utils/cli.ts";
import { log } from "../utils/log.ts";
import { asURL, instantiate, stats } from "../../mod.ts";

export default new Command()
  .arguments("<source:string>")
  .description("Analyze source outputting code toxicity stats.")
  .action(async (_options, source) => {
    performance.mark("stats-start");
    log.step(`Analyzing code starting at "${source}"...`);
    let url: URL;
    try {
      url = new URL(source);
    } catch {
      url = asURL(source);
    }
    kia.start("Analyzing...");
    await instantiate();
    const results = await stats(url);
    const measure = performance.measure("stats-start");
    kia.succeed(`Done in ${measure.duration.toFixed(2)}ms.`);
    const commonPath = common([...results.keys()]);
    const values = new Map<
      string,
      { metricShort: string; count: number; score: number }
    >();
    const rows = new Map<
      string,
      { label: string; total: number; items: Map<string, number> }
    >();
    for (const [path, records] of results) {
      let total = 0;
      const label = path.replace(commonPath, "");
      const items = new Map<string, number>();
      for (const { metric, metricShort, count, score } of records) {
        if (!values.has(metric)) {
          values.set(metric, { metricShort, count: 0, score: 0 });
        }
        const value = values.get(metric)!;
        value.count += count;
        value.score += score;
        total += score;
        items.set(metric, score);
      }
      rows.set(path, { label, total, items });
    }
    const statHeader = [...values.values()]
      .map(({ metricShort }) => metricShort);
    const body: (string | number | Cell | undefined)[][] = [];
    for (const { label, total, items } of rows.values()) {
      const row: (string | number | Cell | undefined)[] = [
        label,
        total ? total.toFixed(2) : undefined,
      ];
      for (const metric of values.keys()) {
        const value = items.get(metric);
        row.push(value ? value.toFixed(2) : undefined);
      }
      body.push(row);
    }
    const counts: (string | number | undefined)[] = [
      colors.italic("Counts"),
      undefined,
    ];
    const scores = [colors.bold("Total"), undefined];
    for (const { count, score } of values.values()) {
      counts.push(count ? count : undefined);
      scores.push(score ? score.toFixed(2) : undefined);
    }
    body.push(counts, scores);
    new Table()
      .header(Row.from(["Path", "Score", ...statHeader]).border(true))
      .body(body)
      .render();
  });
