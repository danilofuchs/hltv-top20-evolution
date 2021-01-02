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

  [year: number]: number | null;
}

const importCsv = (csv: string): CsvRow[] =>
  papai.parse(csv, {
    header: true,
    dynamicTyping: true,
  }).data;

const parseRow = (row: CsvRow): Player => ({
  name: row.Player,
  country: row.Country,
  rankings: Object.entries(row)
    .filter(
      ([label, _value]) =>
        !Number.isNaN(parseInt(label)) &&
        label.startsWith("20") &&
        label.length === 4
    )
    .map(
      ([year, place]) => ({
        year: parseInt(year),
        place: place ? parseInt(place) : null,
      }),
      {}
    ),
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
