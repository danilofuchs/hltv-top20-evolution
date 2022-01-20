import * as fs from "fs";
import * as util from "util";
import * as path from "path";
import * as url from "url";
import { playersRankingsFromJson } from "./playersRankingsFromJson.js";
import { fetchPlayers } from "./fetchPlayerData.js";
import type { Player } from "../src/entities/player";

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
      rankings: playerRanking.rankings,
      country: data.country.code,
      profileUrl: `https://www.hltv.org/player/${data.id}/${data.ign}`,
    });

    await savePlayersList(players);
  }
})();

async function savePlayersList(players: Player[]) {
  const json = JSON.stringify(players, null, 2) + "\n";

  const outDir = path.join(currentDir, "../src/data/players.json");

  await writeFile(outDir, json);
}
