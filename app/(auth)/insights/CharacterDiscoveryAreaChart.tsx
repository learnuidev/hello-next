import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import React, { PureComponent, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { course1 } from "@/data/convos/bm1/index";
import { useSelectedDataStore } from "./use-selected-data";

const data = [
  {
    name: "June 23, 2023",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const getIntroOfPage = (label: string) => {
  if (label === "Page A") {
    return "Page A is about men's clothing";
  }
  if (label === "Page B") {
    return "Page B is about women's dress";
  }
  if (label === "Page C") {
    return "Page C is about women's bag";
  }
  if (label === "Page D") {
    return "Page D is about household goods";
  }
  if (label === "Page E") {
    return "Page E is about food";
  }
  if (label === "Page F") {
    return "Page F is about baby food";
  }
  return "";
};

const NewCharactersTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const currentPayload = payload[0]?.payload;
    const newCharacters = currentPayload?.newCharacters?.join("");
    return (
      <div className="custom-tooltip">
        {/* <code>
          <pre className="trim">{`${JSON.stringify(
            currentPayload?.phraseId
          )}`}</pre>
        </code> */}

        {newCharacters?.length ? (
          <p> {`${newCharacters} (${newCharacters?.length})`}</p>
        ) : null}

        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

export const CharacterDiscoveryAreaChart = () => {
  // const [selectedData, setSelectedData] = useState<any>(null);

  const selectedData = useSelectedDataStore(
    (state: any) => state?.selectedData
  );
  const setSelectedData = useSelectedDataStore(
    (state: any) => state?.setSelectedData
  );
  const demoUrl = "https://codesandbox.io/s/simple-area-chart-4ujxw";

  const { data: answers } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const newData = answers.map((curr: any, idx: number, ctx: any) => {
    return {
      ...curr,
      name: curr?.createdAt,
    };
  });

  const currentLesson = course1?.lessons?.find(
    (lesson: any) => lesson?.id === selectedData?.journeyId
  );

  const currentPhrase = currentLesson?.lessons?.find(
    // BUG:
    // (lesson: any) => lesson?.id === selectedData?.hanzi
    (lesson: any) => lesson?.id === selectedData?.phraseId
  );

  console.log("SELECTED DATA", selectedData);

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full hidden md:block">
          <h1 className="text-center font-extralight">
            New Characters Discovered{" "}
          </h1>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              onClick={(props: any) => {
                // setSelectedData(props);
                setSelectedData(props?.activePayload?.[0]?.payload);
                console.log("YO", props);
              }}
              width={500}
              height={400}
              data={newData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              {/* <CartesianGrid /> */}
              <XAxis hide />
              <YAxis />

              <Tooltip
                content={
                  //  @ts-ignore
                  <NewCharactersTooltip />
                }
              />
              {/* <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" /> */}
              <Area
                type="monotone"
                dataKey="new"
                stroke="#ffbe76"
                fill="#ffbe76"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full">
          <h1 className="text-center font-extralight">
            Total Characters Discovered
          </h1>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              onClick={(props: any) => {
                setSelectedData(props?.activePayload?.[0]?.payload);
              }}
              width={500}
              height={400}
              data={newData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              {/* <CartesianGrid /> */}
              <XAxis hide />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                fill="#8884d8"
              />
              {/* <Area type="monotone" dataKey="new" stroke="#ffbe76" fill="#ffbe76" /> */}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {currentPhrase ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 text-center text-gray-700 dark:text-gray-300 font-light mt-24">
          <div className="w-full">
            <p>{currentPhrase?.pinyin}</p>
            <p>
              {currentPhrase?.hanzi
                ?.split("")
                ?.map((char: string, idx: number) => {
                  return (
                    <span
                      className={`text-2xl ${
                        selectedData?.newCharacters?.includes(char)
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                      key={`${char}-${idx}-${idx}`}
                    >
                      {char}
                    </span>
                  );
                })}
            </p>
            <p className="">{currentPhrase?.lit}</p>
            <p>{currentPhrase?.en}</p>
          </div>

          {selectedData?.totalCharacters?.length ? (
            <div className="w-full text-sm text-gray-700 h-48">
              <h4 className="text-gray-400 dark:text-gray-600 mb-4 text-xl font-extralight">
                {" "}
                Total Characters Discovered
              </h4>

              <p className="text-6xl dark:text-gray-200">
                {selectedData?.totalCharacters?.length}
              </p>
            </div>
          ) : null}

          {/* <code>
            <pre>{JSON.stringify(selectedData, null, 2)}</pre>
          </code> */}
        </div>
      ) : null}

      <div className="flex justify-center items-center text-2xl text-gray-600 dark:text-gray-400 flex-wrap">
        {selectedData?.totalCharacters?.map((char: string, idx: number) => {
          return (
            <button
              className={`p-2 ${
                selectedData?.newCharacters?.includes(char)
                  ? "text-yellow-500"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              role="button"
              onClick={() => {}}
              key={`${idx}-${char}-${idx}`}
            >
              {" "}
              {char}
            </button>
          );
        })}
      </div>
    </div>
  );
};
