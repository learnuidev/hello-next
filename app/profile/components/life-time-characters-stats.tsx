import { Icons } from "@/components/ui/icons.v2";
import { useGetTotalLifetimeCharacters } from "../hooks/use-get-total-lifetime-characters";
import { ProfileStatsItem } from "./profile-stats-item";

export const LifeTimeCharactersStats = () => {
  const lifeTimeCharacters = useGetTotalLifetimeCharacters();
  return (
    <ProfileStatsItem
      stat={lifeTimeCharacters}
      title="Characters"
      subtitle="Lifetime"
    >
      <Icons.seedlingDuotone
        className="text-4xl"
        style={{
          "--fa-primary-color": "#FEEE91",
          "--fa-secondary-color": "#FEEE91",
        }}
      />
    </ProfileStatsItem>
  );
};
