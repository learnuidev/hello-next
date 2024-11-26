"use client";

import sub from "date-fns/sub";
import { useInsightsState } from "./use-insights-state";
import add from "date-fns/add";
import { isAfter } from "date-fns";

export function InsightsFilters() {
  // const now = new Date();
  const setToDate = useInsightsState((state) => state.setToDate);
  const toDate = useInsightsState((state) => state.toDate);

  const endOfWeek = add(new Date(), {
    years: 0,
    months: 0,
    weeks: 0,
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  return (
    <div className="flex items-center justify-between">
      {/* <h1 className="text-3xl font-bold tracking-tight"> Insights</h1> */}

      <div></div>

      <div className="space-x-4 dark:text-gray-400">
        <button
          className="dark:hover:text-gray-100"
          onClick={() => {
            const fromDate = sub(toDate, {
              years: 0,
              months: 0,
              weeks: 0,
              days: 7,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
            setToDate(fromDate);
          }}
        >
          Prev
        </button>
        <button
          disabled={isAfter(
            add(toDate, {
              years: 0,
              months: 0,
              weeks: 0,
              days: 7,
              hours: 0,
              minutes: 0,
              seconds: 0,
            }),
            endOfWeek
          )}
          className="dark:hover:text-gray-100"
          onClick={() => {
            const fromDate = add(toDate, {
              years: 0,
              months: 0,
              weeks: 0,
              days: 7,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
            setToDate(fromDate);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
