import { Icons } from "@/components/ui/icons.v2";
import { ProfileStatsItem } from "./profile-stats-item";

export const LongestStreakStats = () => {
  return (
    <ProfileStatsItem stat={"1 day"} title="Longest" subtitle="Streak">
      <Icons.fireDuoTone
        className="text-4xl"
        style={{
          "--fa-primary-color": "#CC2B52",
          "--fa-secondary-color": "#AF1740",
        }}
      />
    </ProfileStatsItem>
  );
};
