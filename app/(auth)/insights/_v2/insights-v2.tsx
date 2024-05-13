"use client";

import { groupBy } from "ramda";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
  Bar,
  Axis,
  LineSegment,
} from "victory";
import { cn } from "@/lib/utils";
import { belts } from "@/app/nmm/utils";
import { useInsightsState } from "../use-insights-state";
import { useGetWeeklyData } from "../WeeklyBarChart";

const humanLangs = {
  ne: "Nepali",
  ur: "Urdu",
  fa: "Farsi",
  ar: "Arabic",
  ko: "Korean",
  ja: "Japanese",
  th: "Thai",
  it: "Italian",
  af: "Afrikaans",
  hi: "Hindi",
  nl: "Dutch",
  ro: "Romanian",
  en: "English",
  pt: "Portuguese",
  nepali: "Nepali",
  hindi: "Hindi",
  hi_IN: "Hindi",
  zh: "Mandarin",
  ml: "Malayalam",
  fr: "French",
  es: "Spanish",
  mo: "Romanian (Moldova)",
  vi: "Vietnamese",
} as any;

const width = 400;
const height = 400;

export const InsightsV2 = () => {
  const { data: learnedCharacters } = useListCharactersQuery();

  const grouped = groupBy((item: any) => item?.lang)(learnedCharacters || []);

  const uniqueLangs = [
    ...(new Set(learnedCharacters?.map((x: any) => x.lang)) as any),
  ];

  const dataA = uniqueLangs?.map((lang) => {
    const x = humanLangs[lang] || lang;
    const y = grouped[lang] || [];

    return {
      x,
      y: ((y?.length * 1) / 3050) * 100,
    };
  });

  const TopEightLanguages = () => {
    return (
      <div className="mt-8 mx-auto w-80">
        <p className="text-center text-[13px] text-[#808080] my-8 font-['Gill Sans']">
          Top Eight Languages{" "}
        </p>
        <div className="space-y-2">
          {Object.entries(grouped)
            // .filter((group) => {
            //   const [lang, items] = group;

            //   return items?.length > 30;
            // })
            .sort((a: any, b: any) => b?.[1]?.length - a?.[1]?.length)
            .slice(0, 8)
            .map((group) => {
              const [lang, items] = group;

              const itemLen = items?.length || 0;

              const x = humanLangs[lang] || lang;

              const belt = belts?.filter(
                (belt) =>
                  belt.minCharacterLevel < itemLen &&
                  itemLen < belt.maxCharacterLevel
              )[0];

              const barHeight = "h-6";

              const itemsLength = (items || [])?.length * 1;

              const percentage = (itemsLength / belt?.maxCharacterLevel) * 100;

              return (
                <div key={"lang"}>
                  <div className="flex justify-between">
                    <p className="text-left text-gray-300 font-extralight text-sm">
                      {x}
                    </p>

                    <div className="text-left">{itemsLength}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const toDate = useInsightsState((state) => state.toDate);

  const { data } = useGetWeeklyData({ toDate });

  //   console.log("DATA", data);
  const chartData = data?.map((item) => {
    return {
      x: item.day,
      y: item.count,
    };
  });

  const style = {
    data: { fill: "tomato" },
  };

  const VictoryChartVersion = () => {
    return (
      <div className="w-full">
        <div className="w-full">
          <VictoryChart
            domain={{ y: [0, 100] }}
            domainPadding={{ x: 0, y: 0 }}
            scale={{ x: "time" }}
            horizontal
          >
            <VictoryAxis
              style={{
                tickLabels: { fontSize: 5, fill: "white" },
              }}
              axisComponent={
                <LineSegment
                  events={{
                    onClick: (event: any) => {
                      //   alert("yo", event);
                      //   alert("axis", JSON.stringify(event));
                    },
                  }}
                />
              }
            />
            <VictoryBar
              //   padding={20}
              barWidth={({ index }) => 10}
              dataComponent={
                <Bar
                  events={{
                    onClick: (event: any) => {
                      console.log(event);
                      //   alert(event);
                    },
                  }}
                />
              }
              style={style}
              data={dataA}
            />
          </VictoryChart>
        </div>
      </div>
    );
  };

  return (
    <div className="my-4 md:my-16">
      {/* <h1 className="my-8 text-2xl md:text-4xl font-extralight">Stats</h1> */}

      <section className="grid grid-cols-4 gap-4">
        <div className="mt-8 h-80 col-span-4 md:col-span-2">
          <VictoryChart
            // animate={{ duration: 400 }}
            // height={400}
            // width={400}
            // domainPadding={{ x: 50, y: [0, 20] }}
            scale={{ x: "time" }}
          >
            <VictoryLabel
              x={225}
              y={5}
              style={{
                fill: "gray",
              }}
              textAnchor="middle"
              text="Number of words learned per day"
            />

            <VictoryAxis
              style={{
                tickLabels: { fill: "gray" },
              }}
              // axisComponent={
              //   <LineSegment
              //     events={{
              //       onClick: (event: any) => {
              //         //   alert("yo", event);
              //         //   alert("axis", JSON.stringify(event));
              //       },
              //     }}
              //   />
              // }
            />

            <VictoryBar
              dataComponent={<Bar events={{ onMouseOver: () => {} }} />}
              style={{
                data: { fill: "tomato" },
              }}
              data={chartData}
            />
          </VictoryChart>
        </div>

        <div className="h-32 col-span-4 md:col-span-2">
          <TopEightLanguages />
        </div>
      </section>
    </div>
  );
};
