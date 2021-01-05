import { HLTV } from "hltv";

const hltv = HLTV.createInstance({});

export async function* fetchPlayers(igns: string[]) {
  for (const ign of igns) {
    console.log(`Fetching data for player ${ign}`);
    try {
      const player = await fetchPlayer(ign);
      // Sleep for 4 seconds to avoid being throttled by Cloudflare
      await sleep(4000);
      yield { ign, player };
    } catch (err) {
      console.error(`Failed to fetch data for player ${ign}`, err);
    }
  }
}
async function fetchPlayer(ign: string) {
  return await hltv.getPlayerByName({ name: ign });
}

async function sleep(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}
