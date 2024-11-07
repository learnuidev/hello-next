import { WeeklyBarChart } from "./WeeklyBarChart";
import { useInsightsState } from "./use-insights-state";

export const CharacterDiscoveryBarChart = () => {
  const toDate = useInsightsState((state) => state.toDate);

  return (
    <div className="w-full hidden md:block">
      <WeeklyBarChart toDate={toDate} />
    </div>
  );
};
