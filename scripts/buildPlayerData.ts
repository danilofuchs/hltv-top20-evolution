import * as fs from "fs";
import * as util from "util";
import * as path from "path";
import * as url from "url";
import { playersRankingsFromJson } from "./playersRankingsFromJson.js";
import { fetchPlayers } from "./fetchPlayerData.js";
import type { Player } from "../src/entities/player";
import { FullPlayerTeam } from "hltv";

process.env.TZ = "utc";

const writeFile = util.promisify(fs.writeFile);

const currentDir = path.dirname(url.fileURLToPath(import.meta.url));

(async () => {
  const playersRankings = await playersRankingsFromJson();

  const igns = playersRankings.map((player) => player.ign);

  const players: Player[] = [];
  for await (const playerData of fetchPlayers(igns)) {
    const ign = playerData.ign;
    const data = playerData.player;

    const playerRanking = playersRankings.find(
      (player) => player.ign.toLowerCase() === ign.toLowerCase()
    );

    if (!playerRanking) {
      throw new Error(`Could not find rankings for player ${ign}`);
    }

    players.push({
      ign,
      id: data.id,
      name: data.name,
      image: data.image,
      rankings: playerRanking.rankings.map((ranking) => ({
        ...ranking,
        teams: getTeamsAtYear(data.teams, ranking.year),
      })),
      country: data.country.code,
      profileUrl: `https://www.hltv.org/player/${data.id}/${data.ign}`,
    });

    await savePlayersList(players);
  }
})();

const getTeamsAtYear = (teams: FullPlayerTeam[], year: number) =>
  teams
    .filter((team) => {
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31);

      const startDate = new Date(team.startDate);
      const lastDate = team.leaveDate ? new Date(team.leaveDate) : endOfYear;

      return (
        lastDate.valueOf() >= startOfYear.valueOf() &&
        startDate.valueOf() <= endOfYear.valueOf()
      );
    })
    .sort((a, b) => a.startDate - b.startDate)
    .map((team) => ({
      id: team.id,
      name: team.name,
      logo: team.logo,
      startDate: team.startDate,
    }));

async function savePlayersList(players: Player[]) {
  const json = JSON.stringify(players, null, 2) + "\n";

  const outDir = path.join(currentDir, "../src/data/players.json");

  await writeFile(outDir, json);
}
