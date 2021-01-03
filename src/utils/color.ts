import seedRandom from "seedrandom";

export function getPlayerColor(playerName: string) {
  const rng = seedRandom(playerName);

  return "#" + Math.floor(rng() * 16777215).toString(16);
}
