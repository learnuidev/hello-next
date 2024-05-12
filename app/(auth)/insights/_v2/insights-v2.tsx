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
} from "victory";

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

  return (
    <div className="m-auto flex flex-col w-full justify-center">
      <h1 className="text-center w-full mb-[-100px] mt-8 text-4xl font-extralight">
        {" "}
        Stats
      </h1>
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
              events={[
                {
                  target: "tickLabels",
                  //   mutation: () => {},
                  eventHandlers: {
                    onClick: (data) => {
                      //   alert("YO", data);
                      return [
                        {
                          target: "labels",
                          mutation: (props) => {
                            return props.text === "clicked"
                              ? null
                              : { text: "clicked" };
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
            <VictoryBar
              //   padding={20}
              barWidth={({ index }) => 10}
              dataComponent={<Bar />}
              style={style}
              data={dataA}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onClick: (data) => {
                      alert("YO");
                      return [
                        {
                          target: "labels",
                          mutation: (props) => {
                            return props.text === "clicked"
                              ? null
                              : { text: "clicked" };
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};
