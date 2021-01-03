import {
  XYPlot,
  LineSeries,
  LabelSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from "react-vis";
import playersJson from "@src/data/players.json";
import { Player } from "@src/entities/player";

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
export function BumpChart(props: Props) {
  return (
    <XYPlot height={400} width={800} yDomain={[20, 1]} margin={40}>
      <VerticalGridLines tickValues={xTickValues} />
      <HorizontalGridLines tickValues={yTickValues} />
      <XAxis tickValues={xTickValues} tickFormat={(tick) => tick.toString()} />
      <YAxis tickValues={yTickValues} />
      {players.map((player) => (
        <LineSeries
          data={buildDataForPlayer(player)}
          getNull={(d) => d.y !== null}
          curve={"curveMonotoneX"}
        />
      ))}
      {players.map((player) => (
        <LabelSeries data={buildDataForPlayer(player)} />
      ))}
    </XYPlot>
  );
}
