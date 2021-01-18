import {
  Curve,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryVoronoiContainer,
} from "victory";
import { Player, PlayerRank, YearRanking } from "@src/entities/player";
import React, { useCallback, useMemo } from "react";

interface Props {
  players: Player[];
  rankings: YearRanking[];
  onPlayerClick: (player: Player) => void;
}
export function BumpChart(props: Props) {
  const { players, rankings } = props;

  const years = rankings.map((ranking) => ranking.year);

  const playersWithHoles: Player[] = useMemo(
    () =>
      players.map((player) => ({
        ...player,
        rankings: years.map(
          (year) =>
            player.rankings.find((ranking) => ranking.year === year) || {
              year,
              place: null,
            }
        ),
      })),
    [players]
  );

  const playersWithLabels: Player[] = useMemo(
    () =>
      playersWithHoles.map((player) => {
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
      }),
    [playersWithHoles]
  );

  // Add padding so the lines stay longer at the year
  const playersWithPadding: Player[] = useMemo(
    () =>
      playersWithLabels.map((player) => ({
        ...player,
        rankings: player.rankings.flatMap((ranking) => [
          { ...ranking, year: ranking.year - 0.25, shouldLabel: false },
          ranking,
          { ...ranking, year: ranking.year + 0.25, shouldLabel: false },
        ]),
      })),
    [playersWithLabels]
  );

  const onActivated = useCallback((points: any[]) => {
    for (const point of points) {
      if (point.year && point.place && point.childName) {
        const ign = point.childName;
        const player = players.find((player) => player.ign === ign);
        if (player) {
          return props.onPlayerClick(player);
        }
      }
    }
  }, []);

  return (
    <VictoryChart
      height={600}
      width={800}
      domain={{ y: [1, 20] }}
      domainPadding={15}
      containerComponent={
        <VictoryVoronoiContainer voronoiPadding={5} onActivated={onActivated} />
      }
    >
      <VictoryAxis
        dependentAxis
        tickCount={20}
        invertAxis
        style={{
          grid: {
            stroke: "#e0e0e0",
            strokeDasharray: "4 1",
          },
        }}
      />
      <VictoryAxis tickFormat={(year) => year.toString()} />
      {playersWithPadding.map((player) => (
        <VictoryLine
          key={player.name}
          data={player.rankings}
          name={player.ign}
          x="year"
          y="place"
          labels={(data) => (data.datum.shouldLabel ? player.ign : null)}
          dataComponent={<Curve />}
          labelComponent={<VictoryLabel dy={-3} />}
          style={{
            data: {
              stroke: player.color,
              strokeWidth: (data) => (data.active ? "5px" : "2px"),
              strokeLinecap: "round",
              opacity: (data) => (data.active ? "100%" : "60%"),
            },
          }}
          interpolation="monotoneX"
        />
      ))}
    </VictoryChart>
  );
}
