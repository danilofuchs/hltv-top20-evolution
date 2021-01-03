import {
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

interface Props {}
export function BumpChartVictory(props: Props) {
  return (
    <VictoryChart
      height={400}
      width={800}
      domain={{ y: [20, 1] }}
      containerComponent={
        <VictoryVoronoiContainer portalZIndex={1000} mouseFollowTooltips />
      }
    >
      <VictoryAxis dependentAxis tickCount={20} />
      <VictoryAxis tickFormat={(year) => year.toString()} />
      {players.map((player) => (
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
          // dataComponent={<Curve />}
        />
      ))}
      {/* {players.map((player) => (
        <LabelSeries data={buildDataForPlayer(player)} />
      ))} */}
    </VictoryChart>
  );
}
