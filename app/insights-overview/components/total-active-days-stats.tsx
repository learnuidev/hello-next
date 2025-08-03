import { Icons } from "@/components/ui/icons.v2";
import { ProfileStatsItem } from "./profile-stats-item";
import { useGetTotalActiveDays } from "../hooks/use-get-total-active-days";

export const TotalActiveDaysStats = () => {
  const totalActiveDays = useGetTotalActiveDays();
  return (
    <ProfileStatsItem
      stat={totalActiveDays}
      title="Total"
      subtitle="Active Days"
    >
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
