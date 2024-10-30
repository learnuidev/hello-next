import { Icons } from "@/components/ui/icons.v2";
import { useGetTotalTimeStudied } from "../hooks/use-get-total-time-studied";
import { ProfileStatsItem } from "./profile-stats-item";

export const TimeStudiedStats = () => {
  const timeStudied = useGetTotalTimeStudied();
  return (
    <ProfileStatsItem stat={timeStudied} title="Time" subtitle="Reviwed">
      <Icons.eightOClock
        className="text-4xl"
        style={{
          "--fa-primary-color": "#FEEE91",
          "--fa-secondary-color": "#FEEE91",
        }}
      />
    </ProfileStatsItem>
  );
};
