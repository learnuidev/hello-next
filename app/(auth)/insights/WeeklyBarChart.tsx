import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import React, { PureComponent, useState } from "react";

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

import sub from "date-fns/sub";

import isAfter from "date-fns/isAfter";
import getDay from "date-fns/getDay";
import isThisWeek from "date-fns/isThisWeek";
import * as R from "ramda";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import isBefore from "date-fns/isBefore";

const days = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export function useGetWeeklyData({ toDate }: { toDate: Date }) {
  // const toDate = new Date();

  const fromDate = sub(toDate, {
    years: 0,
    months: 0,
    weeks: 0,
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // const [selectedData, setSelectedData] = useState<any>(null);

  const { data: learnedCharacters, isLoading: isLearnedCharactersLoading } =
    useListCharactersQuery();

  const chars = learnedCharacters?.filter((item: any) => {
    const createdAt = new Date(item?.createdAt);

    return isAfter(createdAt, fromDate);
  });

  const filteredCharacters = Object.entries(
    R.countBy(
      (x: any) => x.day,
      (learnedCharacters || [])
        // ?.filter((item: any) => {
        //   const createdAt = new Date(item?.createdAt);

        //   return isAfter(createdAt, fromDate) && isBefore(createdAt, toDate);
        // })
        ?.filter((item: any) => {
          const createdAt = new Date(item?.createdAt);

          if (isThisWeek(createdAt)) {
            // return isAfter(createdAt, fromDate);

            const now = new Date();

            const lastWeek = sub(now, {
              years: 0,
              months: 0,
              weeks: 0,
              days: 7,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
            return isAfter(createdAt, lastWeek);
          } else {
            return isAfter(createdAt, fromDate) && isBefore(createdAt, toDate);
          }

          // && isThisWeek(createdAt);
        })
        ?.map((item: any) => {
          const createdAt = new Date(item?.createdAt);
          const day = getDay(createdAt);

          return {
            ...item,
            dayIdx: day,
            day: days?.[day],
          };
        })
        ?.sort((a: any, b: any) => a?.dayIdx - b?.dayIdx)
    )
  ).map((x) => {
    return {
      day: x?.[0],
      count: x?.[1],
    };
  });

  const data = Object.entries(days)?.map((day: any) => {
    const exist = filteredCharacters?.find((x) => x?.day === day[1]);
    if (exist) {
      return exist;
    } else {
      return {
        day: day[1],
        count: 0,
      };
    }
  });

  return {
    data,
    isLoading: isLearnedCharactersLoading,
  };
}

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

export const WeeklyBarChart = ({ toDate }: { toDate: Date }) => {
  const { data } = useGetWeeklyData({ toDate });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid /> */}
        <XAxis dataKey={"day"} />
        <YAxis />

        <Tooltip content={<NewCharactersTooltip />} />
        {/* <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" /> */}
        <Bar type="monotone" dataKey="count" stroke="#00AB66" fill="#00AB66" />
      </BarChart>
    </ResponsiveContainer>
  );
};
