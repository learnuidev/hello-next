import sub from "date-fns/sub";

import getDay from "date-fns/getDay";
import isAfter from "date-fns/isAfter";
import isThisWeek from "date-fns/isThisWeek";
import * as R from "ramda";

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

export function countByDate({ toDate, fromDate, list, studiedItems }: any) {
  const filteredList = list?.filter((item: any) => {
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
  });
  const filteredCharacters = Object.entries(
    R.countBy(
      (x: any) => x.day,
      filteredList
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

  console.log("FILTERED CHARACTERS", filteredList);

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
    studiedItems: filteredList,
  };
}
