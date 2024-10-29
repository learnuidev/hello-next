import { Icons } from "@/components/ui/icons.v2";
import { ProfileStatsItem } from "./profile-stats-item";
import { useGetTotalLifetimeSentences } from "../hooks/use-get-total-lifetime-sentences";

export const LifeTimeSentencesStats = () => {
  const lifeTimeSentences = useGetTotalLifetimeSentences();
  return (
    <ProfileStatsItem
      stat={lifeTimeSentences}
      title="Sentences"
      subtitle="Lifetime"
    >
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
