import { Icons } from "@/components/ui/icons.v2";
import { ProfileStatsItem } from "./profile-stats-item";

export const LifeTimeSentencesStats = () => {
  return (
    <ProfileStatsItem stat={134} title="Sentences" subtitle="Lifetime">
      <Icons.messageQuote
        className="text-4xl"
        style={{
          "--fa-primary-color": "#A594F9",
          "--fa-secondary-color": "#CDC1FF",
        }}
      />
    </ProfileStatsItem>
  );
};
