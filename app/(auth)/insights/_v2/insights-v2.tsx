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

// const dataA = [
//   { x: "Personal Drones", y: 57 },
//   { x: "Smart Thermostat", y: 40 },
//   { x: "Television", y: 38 },
//   { x: "Smartwatch", y: 37 },
//   { x: "Fitness Monitor", y: 25 },
//   { x: "Tablet", y: 19 },
//   { x: "Camera", y: 15 },
//   { x: "Laptop", y: 13 },
//   { x: "Phone", y: 12 },
// ];

// const dataB = dataA.map((point) => {
//   const y = Math.round(point.y + 3 * (Math.random() - 0.5));
//   return { ...point, y };
// });

const width = 400;
const height = 400;

export const InsightsV2 = () => {
  const { data: learnedCharacters } = useListCharactersQuery();

  const grouped = Object.groupBy(
    learnedCharacters || [],
    (item: any) => item?.lang
  );

  const uniqueLangs = [
    ...(new Set(learnedCharacters?.map((x: any) => x.lang)) as any),
  ];
  //   .filter((x) => ["zh", "fa", "hi", "ne"]?.includes(x));

  const dataA = uniqueLangs?.map((lang) => {
    const x = humanLangs[lang] || lang;
    const y = grouped[lang] || [];

    return {
      x,
      y: ((y?.length * 1) / 3050) * 100,
    };
  });
  // .filter((x) => x?.y > 2);

  const dataB = dataA.map((point: any) => {
    const y = Math.round(point.y + 3 * (Math.random() - 0.5));
    return { ...point, y };
  });

  console.log("DATA", dataA);

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
            // height={400}
            // width={400}
            domainPadding={{ x: 0, y: 0 }}
            // domainPadding={{ x: 5, y: [0, 20] }}
            scale={{ x: "time" }}
            horizontal
          >
            <VictoryAxis
              style={{
                // axis: { stroke: "#756f6a" },
                // axisLabel: { fontSize: 20, padding: 30 },
                // grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
                // ticks: { stroke: "grey", size: 5 },
                tickLabels: { fontSize: 5, fill: "white" },
              }}
            />
            <VictoryBar
              //   padding={20}
              barWidth={({ index }) => 10}
              dataComponent={<Bar />}
              style={style}
              data={dataA}
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};
