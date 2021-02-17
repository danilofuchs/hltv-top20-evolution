import { Player } from "@src/entities/player";
import { getCountryFlagSrc } from "@src/utils/country";
import { useMemo } from "react";
import { VictoryArea, VictoryChart, VictoryLabel, VictoryStack } from "victory";

type CountriesStats = Record<string, Record<string, number>>;

interface CountryData {
  countryCode: string;
  stats: {
    year: string;
    playerCount: number;
  }[];
}

interface Props {
  players: Player[];
}
export function CountriesChart(props: Props) {
  const { players } = props;

  const countriesData = useMemo(() => {
    const countriesStats: CountriesStats = {};

    for (const player of players) {
      const { country, rankings } = player;
      if (!country) {
        continue;
      }

      for (const ranking of rankings) {
        if (!ranking.place) {
          continue;
        }
        const countryStats = countriesStats[country];
        if (!countryStats) {
          countriesStats[country] = {};
        }

        const currentCount = countriesStats[country][ranking.year];
        countriesStats[country][ranking.year] = currentCount
          ? currentCount + 1
          : 1;
      }
    }

    const countriesData: CountryData[] = Object.entries(countriesStats).map(
      ([countryCode, stats]) => ({
        countryCode,
        stats: Object.entries(stats).map(([year, playerCount]) => ({
          year,
          playerCount,
        })),
      })
    );

    return countriesData;
  }, [players]);

  console.log(countriesData.length);

  return (
    <VictoryChart height={600} width={800}>
      <VictoryStack colorScale="qualitative">
        {countriesData.map((data) => (
          <VictoryArea
            data={data.stats}
            x="year"
            y="playerCount"
            interpolation="monotoneX"
            labels={() => data.countryCode}
            labelComponent={
              <VictoryLabel>
                {() => "asd"}
                {/* {(label) => <img src={getCountryFlagSrc(data.countryCode)} />} */}
              </VictoryLabel>
            }
            style={{
              data: {
                // fill: "",
              },
            }}
          />
        ))}
      </VictoryStack>
    </VictoryChart>
  );
}
