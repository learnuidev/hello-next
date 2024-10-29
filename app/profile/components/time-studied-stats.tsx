import { Icons } from "@/components/ui/icons.v2";
import { useGetTotalTimeStudied } from "../hooks/use-get-total-time-studied";
import { ProfileStatsItem } from "./profile-stats-item";

export const TimeStudiedStats = () => {
  const timeStudied = useGetTotalTimeStudied();
  return (
    <ProfileStatsItem stat={timeStudied} title="Time" subtitle="Studied">
      <Icons.eightOClock
        className="text-4xl"
        style={{
          "--fa-primary-color": "#8ABFA3",
          "--fa-secondary-color": "#00FF9C",
        }}
      />
    </ProfileStatsItem>
  );
};
