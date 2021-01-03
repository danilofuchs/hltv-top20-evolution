import {
  Curve,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import playersJson from "@src/data/players.json";
import { Player } from "@src/entities/player";
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

interface Props {}
export function BumpChartVictory(props: Props) {
  return (
    <VictoryChart
      height={400}
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
          colorScale="warm"
          interpolation="monotoneX"
          dataComponent={<Curve />}
        />
      ))}
      {/* {players.map((player) => (
        <LabelSeries data={buildDataForPlayer(player)} />
      ))} */}
    </VictoryChart>
  );
}
