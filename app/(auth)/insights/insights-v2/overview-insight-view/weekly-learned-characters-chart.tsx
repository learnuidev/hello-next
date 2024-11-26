"use client";

import {
  Bar,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryVoronoiContainer,
} from "victory";
import { useListWeeklyLearnedCharacters } from "../../use-list-weekly-learned-characters";

export const WeeklyLearnedCharactersChart = () => {
  const { data } = useListWeeklyLearnedCharacters();

  const chartData = data?.map((item) => {
    return {
      x: item.day,
      y: item.count,
    };
  });

  return (
    <VictoryChart
      // animate={{ duration: 400 }}
      // height={450}
      // width={400}
      // domainPadding={{ x: 50, y: [0, 20] }}
      scale={{ x: "time" }}
      containerComponent={
        <VictoryVoronoiContainer
          style={{}}
          labels={({ datum }) =>
            datum.y > 0 ? `${datum.x} \n ${datum.y} components` : null
          }
        />
      }
    >
      <VictoryLabel
        x={225}
        y={5}
        style={{
          fill: "gray",
        }}
        textAnchor="middle"
        text="Number of components learned per day"
      />

      <VictoryAxis
        dependentAxis
        // label="Total # of Songs"
        // x={0}
        offsetX={40}
        // style={sharedAxisStyles}
      />

      <VictoryAxis
        style={{
          tickLabels: { fill: "gray" },
        }}
      />

      <VictoryBar
        // dataComponent={<Bar events={{ onMouseOver: () => {} }} />}
        style={{
          data: { fill: "darkgray" },
        }}
        dataComponent={
          <Bar
            events={{
              onClick: (event: any, ctx: any) => {
                //   alert(event);
              },
            }}
          />
        }
        data={chartData}
      />
    </VictoryChart>
  );
};
