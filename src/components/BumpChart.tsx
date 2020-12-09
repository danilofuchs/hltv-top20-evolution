import { Bump } from "@nivo/bump";

interface Props {}
export function BumpChart(props: Props) {
  return (
    <Bump
      data={[
        {
          id: "1",
          data: [
            { x: 1, y: 2 },
            { x: 2, y: 1 },
          ],
          teste: 2,
        },
        {
          id: "2",
          data: [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
          ],
        },
      ]}
      height={400}
      width={800}
      enableGridY={false}
    />
  );
}
