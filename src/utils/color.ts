import seedRandom from "seedrandom";
import color from "color";

export function getPlayerColor(playerName: string): string {
  const rng = seedRandom(playerName + "_seed");

  const randomColor =
    "#" +
    Math.floor(rng() * 16777215)
      .toString(16)
      .padEnd(6, "0");

  if (color(randomColor).lightness() > 60) {
    return color(randomColor).darken(0.3).hex();
  }
  return randomColor;
}
