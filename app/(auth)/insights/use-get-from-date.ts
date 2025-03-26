import sub from "date-fns/sub";
import { useInsightsState } from "./use-insights-state";

function getFromDate({ toDate }: { toDate: Date }) {
  const fromDate = sub(toDate, {
    years: 0,
    months: 0,
    weeks: 0,
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  return fromDate;
}

export function useGetFromAndToDate() {
  const toDate = useInsightsState((state) => state.toDate);

  const fromDate = getFromDate({ toDate });

  return { fromDate, toDate };
}
