import * as fs from "fs";
import * as util from "util";
import * as path from "path";
import * as url from "url";
import { PlayerPlacement, YearRanking } from "../src/entities/player";

const readFile = util.promisify(fs.readFile);

export interface PlayerRankings {
  ign: string;
  rankings: {
    year: number;
    place: number | null;
    article: string;
  }[];
}

const currentDir = path.dirname(url.fileURLToPath(import.meta.url));

export const playersRankingsFromJson = async (): Promise<PlayerRankings[]> => {
  const inputPath = path.join(currentDir, "../src/data/rankings.json");
  console.log(`===== Importing JSON from ${inputPath} =====`);
  const file = await readFile(inputPath);
  const json = JSON.parse(file.toString());
  const yearRankings = json.rankings as YearRanking[];

  const map: Record<string, PlayerPlacement[]> = {};

  yearRankings.forEach((ranking) => {
    ranking.placings.forEach((placing) => {
      const playerRank: PlayerPlacement = {
        year: ranking.year,
        place: placing.place,
        article: placing.article,
      };
      if (map[placing.player]) {
        map[placing.player].push(playerRank);
      } else {
        map[placing.player] = [playerRank];
      }
    });
  });

  const players: PlayerRankings[] = Object.entries(map).map(
    ([ign, rankings]) => ({
      ign,
      rankings,
    })
  );

  console.log("===== Parsed data from JSON =====");

  return players;
};
