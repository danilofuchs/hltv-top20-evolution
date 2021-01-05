import * as fs from "fs";
import * as util from "util";
import * as path from "path";
import * as url from "url";
// @ts-ignore
import papai from "papaparse";

export interface PlayerRankings {
  ign: string;
  rankings: {
    year: number;
    place: number | null;
  }[];
}

const readFile = util.promisify(fs.readFile);

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

const parseRow = (row: CsvRow): PlayerRankings => ({
  ign: row.Player,
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

export const playersRankingsFromCsv = async () => {
  const inputPath = path.join(currentDir, "./players.csv");
  const file = await readFile(inputPath);
  console.log(`===== Importing CSV from ${inputPath} =====`);

  const rows = importCsv(file.toString());
  console.log(`Read ${rows.length} rows`);

  const players = rows.map(parseRow);

  console.log("===== Parsed data from CSV =====");

  return players;
};
