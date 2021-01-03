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

const years = new Set(players[0].rankings.map((rank) => rank.year));

const yTickValues = new Array(20).fill(0).map((_, i) => i + 1);
const xTickValues = Array.from(years.values()).sort((a, b) => a - b);

const buildDataForPlayer = (player: Player): any[] => {
  return player.rankings.map((rank) => ({
    x: rank.year,
    y: rank.place as number,
    // label: player.name,
  }));
};

interface Props {}
export function BumpChartVictory(props: Props) {
  return (
    <VictoryChart
      height={400}
      width={800}
      domain={{ y: [20, 1] }}
      containerComponent={
        <VictoryVoronoiContainer
          portalZIndex={1000}
          mouseFollowTooltips
          // labels={({ datum }) => `${datum.year}, ${datum.place}`}
          // labelComponent={<VictoryTooltip dy={-7} constrainToVisibleArea />}
        />
      }
    >
      {/* <VerticalGridLines tickValues={xTickValues} />
      <HorizontalGridLines tickValues={yTickValues} />
      <XAxis tickValues={xTickValues} tickFormat={(tick) => tick.toString()} />
      <YAxis tickValues={yTickValues} /> */}
      {players.map((player) => (
        <VictoryLine
          data={player.rankings}
          x="year"
          y="place"
          labels={() => player.name}
          dataComponent={<Curve />}
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
