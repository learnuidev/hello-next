import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import React, { PureComponent, useState } from "react";

import sub from "date-fns/sub";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";
import getDay from "date-fns/getDay";
import isThisWeek from "date-fns/isThisWeek";
// import isLastWeek from 'date-fns/is'
import * as R from "ramda";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useSelectedDataStore } from "./use-selected-data";
import { isThisMonth } from "date-fns";
import { useListSpeakQuery } from "@/domain/hsk/use-list-speak-query";

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

export const useGetLearnedData = () => {
  const selectedData = useSelectedDataStore(
    (state: any) => state?.selectedData
  );
  const setSelectedData = useSelectedDataStore(
    (state: any) => state?.setSelectedData
  );
  const demoUrl = "https://codesandbox.io/s/simple-area-chart-4ujxw";

  const { data: answers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const newData = answers
    // @ts-ignore
    ?.filter((answer: any) => {
      const createdAt = new Date(answer?.createdAt);

      return isThisMonth(createdAt);
      // return false;
    })
    .map((curr: any, idx: number, ctx: any) => {
      return {
        ...curr,
        name: curr?.createdAt,
      };
    });

  return {
    data: newData,
    isLoading,
  };
};

export const CharacterLearnedBarChart = () => {
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

  const newData = answers
    ?.filter((answer: any) => {
      const createdAt = new Date(answer?.createdAt);

      return isThisMonth(createdAt);
      // return false;
    })
    .map((curr: any, idx: number, ctx: any) => {
      return {
        ...curr,
        name: curr?.createdAt,
      };
    });

  const { data: course1 } = useListSpeakQuery();

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
        <BarChart
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
          <Bar type="monotone" dataKey="new" stroke="#fd5c63" fill="#fd5c63" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
