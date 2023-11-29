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

import sub from "date-fns/sub";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";
import getDay from "date-fns/getDay";
import isThisWeek from "date-fns/isThisWeek";
import * as R from "ramda";

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

  return (
    <div className="w-full hidden md:block">
      {/* <h1 className="text-center font-extralight">
        New Characters Discovered{" "}
      </h1> */}

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          onClick={(props: any) => {
            // setSelectedData(props);
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

          <Tooltip
            content={
              //  @ts-ignore
              <NewCharactersTooltip />
            }
          />
          {/* <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" /> */}
          <Area type="monotone" dataKey="new" stroke="#ffbe76" fill="#ffbe76" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
