import { HLTV } from "hltv";
import { FullPlayer } from "hltv";
import * as util from "util";
import * as path from "path";
import * as fs from "fs";
import * as url from "url";

const readFile = util.promisify(fs.readFile);

const currentDir = path.dirname(url.fileURLToPath(import.meta.url));

const hltv = HLTV.createInstance({});

export async function* fetchPlayers(igns: string[]) {
  const inputPath = path.join(currentDir, "../src/data/hltv-overrides.json");
  const file = await readFile(inputPath);
  const json = JSON.parse(file.toString());
  const playerOverrides = json.players as FullPlayer[];

  console.log("===== Fetching player data from HTLV =====");
  console.log("Progress is saved partially");

  for (let i = 0; i < igns.length; i++) {
    const ign = igns[i];
    console.log(`[${i + 1}/${igns.length}] ${ign}`);
    try {
      const player = await fetchPlayerWithOverride(ign, playerOverrides);
      // Sleep for 4 seconds to avoid being throttled by Cloudflare
      await sleep(4000);
      yield { ign, player };
    } catch (err) {
      console.error(`Failed to fetch data for player ${ign}`, err);
    }
  }
}

async function fetchPlayerWithOverride(ign: string, overrides: FullPlayer[]) {
  const override = overrides.find((player) => player.ign === ign);
  if (override) {
    const player = await fetchPlayerById(override.id);
    return {
      ...player,
      ...override,
    };
  }
  return fetchPlayerByName(ign);
}

async function fetchPlayerByName(ign: string) {
  try {
    return await hltv.getPlayerByName({ name: ign });
  } catch (error) {
    console.error(`Error while fetching player ${ign}, retrying once`);
    console.error(error);
    return await hltv.getPlayerByName({ name: ign });
  }
}

async function fetchPlayerById(id: number) {
  try {
    return await hltv.getPlayer({ id });
  } catch (error) {
    console.error(`Error while fetching player ${id}, retrying once`);
    console.error(error);
    return await hltv.getPlayer({ id });
  }
}

async function sleep(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}
