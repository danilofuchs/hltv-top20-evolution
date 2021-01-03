import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryVoronoiContainer,
} from "victory";
import playersJson from "@src/data/players.json";
import { Player, PlayerRank } from "@src/entities/player";
import React from "react";
import { getPlayerColor } from "@src/utils/color";

const players = playersJson as Player[];
const playersWithColor = players.map((player) => ({
  ...player,
  color: getPlayerColor(player.name), //getPlayerColor(index, players.length),
}));

const playersWithLabels: Player[] = playersWithColor.map((player) => {
  const rankings: PlayerRank[] = [];
  for (let i = 0; i < player.rankings.length; i++) {
    if (player.rankings[i].place !== null) {
      if (i === 0) {
        // First year
        rankings.push({ ...player.rankings[i], shouldLabel: true });
      } else if (player.rankings[i - 1].place === null) {
        // Just after a gap
        rankings.push({ ...player.rankings[i], shouldLabel: true });
      } else if (
        player.rankings[i + 1] &&
        player.rankings[i + 1].place === null
      ) {
        // Just before a gap
        rankings.push({ ...player.rankings[i], shouldLabel: true });
      } else if (i === player.rankings.length - 1) {
        // Last year
        rankings.push({ ...player.rankings[i], shouldLabel: true });
      }
      rankings.push({ ...player.rankings[i], shouldLabel: false });
    } else {
      rankings.push({ ...player.rankings[i], shouldLabel: false });
    }
  }

  return {
    ...player,
    rankings,
  };
});

// Add padding so the lines stay longer at the year
const playersWithPadding: Player[] = playersWithLabels.map((player) => ({
  ...player,
  rankings: player.rankings.flatMap((ranking) => [
    { ...ranking, year: ranking.year - 0.25, shouldLabel: false },
    ranking,
    { ...ranking, year: ranking.year + 0.25, shouldLabel: false },
  ]),
}));

const rankingMap: Record<string, string> = {};

for (const player of players) {
  for (const ranking of player.rankings) {
    if (ranking.place === null) {
      continue;
    }
    rankingMap[`${ranking.year}_${ranking.place}`] = player.name;
  }
}

interface Props {}
export function BumpChartVictory(props: Props) {
  return (
    <VictoryChart
      height={600}
      width={800}
      domain={{ y: [1, 20] }}
      domainPadding={15}
      containerComponent={<VictoryVoronoiContainer />}
    >
      <VictoryAxis dependentAxis tickCount={20} invertAxis />
      <VictoryAxis tickFormat={(year) => year.toString()} />
      {playersWithPadding.map((player) => (
        <VictoryLine
          data={player.rankings}
          x="year"
          y="place"
          labels={(data) => (data.datum.shouldLabel ? player.name : null)}
          style={{
            data: {
              stroke: player.color,
              strokeWidth: (data) => (data.active ? "4px" : "2px"),
              opacity: (data) => (data.active ? "100%" : "60%"),
            },
            labels: {
              opacity: (data) => (data.active ? "100%" : "60%"),
            },
          }}
          labelComponent={<VictoryLabel dy={-3} />}
          interpolation="monotoneX"
        />
      ))}
    </VictoryChart>
  );
}
