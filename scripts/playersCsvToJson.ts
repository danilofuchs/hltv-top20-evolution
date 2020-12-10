import fs from "fs";
import util from "util";
import path from "path";
import url from "url";
// @ts-ignore
import papai from "papaparse";
import { Player } from "@src/entities/player";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

interface CsvRow {
  Player: string;
  Country: string | null;
  2013: string | null;
  2014: string | null;
  2015: string | null;
  2016: string | null;
  2017: string | null;
  2018: string | null;
  2019: string | null;
}

const importCsv = (csv: string): CsvRow[] =>
  papai.parse(csv, {
    header: true,
    dynamicTyping: true,
  }).data;

const parseRow = (row: CsvRow): Player => ({
  name: row.Player,
  country: row.Country,
  rankings: {
    "2013": row["2013"],
    "2014": row["2014"],
    "2015": row["2015"],
    "2016": row["2016"],
    "2017": row["2017"],
    "2018": row["2018"],
    "2019": row["2019"],
  },
});

const currentDir = path.dirname(url.fileURLToPath(import.meta.url));

(async () => {
  const inputPath = path.join(currentDir, "./players.csv");
  const file = await readFile(inputPath);
  console.log(`Importing CSV from ${inputPath}`);

  const rows = importCsv(file.toString());
  console.log(`Read ${rows.length} rows`);

  const players = rows.map(parseRow);

  const json = JSON.stringify(players, null, 2);

  const outDir = path.join(currentDir, "../src/data/players.json");
  console.log(`Saving JSON to ${outDir}`);
  await writeFile(outDir, json);
})();
