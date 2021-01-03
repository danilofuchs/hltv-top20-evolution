import {
  Curve,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import playersJson from "@src/data/players.json";
import { Player, PlayerRank } from "@src/entities/player";
import React from "react";

const players = playersJson as Player[];
// Add padding so the lines stay longer at the year
const playersWithPadding: Player[] = players.map((player) => ({
  ...player,
  rankings: player.rankings.flatMap((ranking) => [
    { ...ranking, year: ranking.year - 0.25 },
    ranking,
    { ...ranking, year: ranking.year + 0.25 },
  ]),
}));

// Label only first appearances after a gap
interface PlayerRankWithLabel extends PlayerRank {
  shouldLabel: boolean;
}
const playersWithLabels: Player[] = players.map((player) => {
  const rankings: PlayerRankWithLabel[] = [];
  for (let i = 0; i < player.rankings.length; i++) {
    if (player.rankings[i].place !== null) {
      if (i === 0) {
        rankings.push({ ...player.rankings[i], shouldLabel: true });
      } else if (player.rankings[i - 1].place === null) {
        rankings.push({ ...player.rankings[i], shouldLabel: true });
      }
    } else {
      rankings.push({ ...player.rankings[i], shouldLabel: false });
    }
  }

  return {
    ...player,
    rankings,
  };
});

interface Props {}
export function BumpChartVictory(props: Props) {
  return (
    <VictoryChart
      height={600}
      width={800}
      domain={{ y: [1, 20] }}
      domainPadding={10}
      containerComponent={
        <VictoryVoronoiContainer portalZIndex={1000} mouseFollowTooltips />
      }
    >
      <VictoryAxis dependentAxis tickCount={20} invertAxis />
      <VictoryAxis tickFormat={(year) => year.toString()} />
      {playersWithPadding.map((player) => (
        <VictoryLine
          data={player.rankings}
          x="year"
          y="place"
          labels={() => player.name}
          style={{
            data: {
              stroke: (args) => (args.active ? "tomato" : "black"),
            },
          }}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{
                stroke: (args) => (args.active ? "tomato" : "black"),
              }}
            />
          }
          interpolation="monotoneX"
          dataComponent={<Curve />}
        />
      ))}
      {playersWithLabels.map((player) => (
        <VictoryScatter
          data={player.rankings}
          x="year"
          y="place"
          labels={(data) => (data.datum.shouldLabel ? player.name : null)}
          labelComponent={<VictoryLabel dy={-3} />}
          dataComponent={<></>}
        />
      ))}
    </VictoryChart>
  );
}
