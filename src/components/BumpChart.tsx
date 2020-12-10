import { Bump, BumpInputSerie } from "@nivo/bump";
import players from "@src/data/players.json";
import { Player } from "@src/entities/player";

const data: BumpInputSerie[] = (players as Player[]).map((player) => ({
  id: player.name,
  name: player.name,
  data: [
    {
      x: 2013,
      y: player.rankings[2013],
    },
    {
      x: 2014,
      y: player.rankings[2014],
    },
    {
      x: 2015,
      y: player.rankings[2015],
    },
    {
      x: 2016,
      y: player.rankings[2016],
    },
    {
      x: 2017,
      y: player.rankings[2017],
    },
    {
      x: 2018,
      y: player.rankings[2018],
    },
    {
      x: 2019,
      y: player.rankings[2019],
    },
  ],
}));

interface Props {}
export function BumpChart(props: Props) {
  return (
    <Bump
      data={data}
      height={400}
      width={800}
      margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
      enableGridY={false}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
      }}
    />
  );
}
