import { Icons } from "@/components/ui/icons.v2";
import { ProfileStatsItem } from "./profile-stats-item";

export const TimeStudiedStats = () => {
  return (
    <ProfileStatsItem stat={"88 min"} title="Time" subtitle="Studied">
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
