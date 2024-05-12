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

  const style = {
    data: { fill: "tomato" },
  };

  const VictoryChartVersion = () => {
    return (
      <div className="">
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
              //   events={[
              //     {
              //       target: "tickLabels",
              //       //   mutation: () => {},
              //       eventHandlers: {
              //         onClick: (data) => {
              //           //   alert("YO", data);
              //           return [
              //             {
              //               target: "labels",
              //               mutation: (props) => {
              //                 return props.text === "clicked"
              //                   ? null
              //                   : { text: "clicked" };
              //               },
              //             },
              //           ];
              //         },
              //       },
              //     },
              //   ]}
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
    <div className="mx-4 md:mx-24 flex flex-col justify-start items-center w-full">
      <h1 className="w-full my-8 text-4xl font-extralight"> Stats</h1>

      <div className="mx-4 mt-8">
        <div className="space-y-2">
          {Object.entries(grouped)
            // .filter((group) => {
            //   const [lang, items] = group;

            //   return items?.length > 30;
            // })
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

              const percentage =
                (((items || [])?.length * 1) / belt?.maxCharacterLevel) * 100;

              return (
                <div key={"lang"}>
                  <div className="grid grid-cols-12">
                    <p className="text-left text-gray-300 font-extralight text-sm">
                      {x}
                    </p>

                    <div className="w-[320px] relative">
                      <div
                        className={cn(
                          "w-full bg-gray-200 rounded-none dark:bg-black",
                          barHeight
                        )}
                      >
                        <div
                          className={cn(
                            belt?.fill || "bg-orange-600",
                            "rounded-none",
                            barHeight
                          )}
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>
                      </div>

                      <div className="text-left absolute z-50 top-[1px]  right-0">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              );

              return (
                <div
                  key={lang}
                  className="flex items-center justify-center mt-12"
                >
                  <div>
                    <p className="text-left text-gray-300 font-extralight text-sm">
                      {x}
                    </p>
                    <div className="w-[400px]">
                      <div
                        className={cn(
                          "w-full bg-gray-200 rounded-none dark:bg-black",
                          barHeight
                        )}
                      >
                        <div
                          className={cn(
                            belt?.fill || "bg-orange-600",
                            "rounded-none",
                            barHeight
                          )}
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-left">{percentage.toFixed(1)}%</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
