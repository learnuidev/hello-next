import { Icons } from "@/components/ui/icons.v2";
import { ProfileStatsItem } from "./profile-stats-item";
import { useGetTotalLifetimeSentences } from "../hooks/use-get-total-lifetime-sentences";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export const LifeTimeWordsStats = () => {
  const { data: learnedCharacters } = useListCharactersQuery();

  const lifeTimeSentences = useGetTotalLifetimeSentences();

  const totalWords =
    learnedCharacters?.filter(
      (item: any) => (item?.hanzi || item?.input)?.length > 1
    )?.length || 0;
  return (
    <ProfileStatsItem stat={totalWords} title="Words" subtitle="Lifetime">
      <Icons.treeDuotone
        className="text-4xl"
        style={{
          "--fa-primary-color": "#CDC1FF",
          "--fa-secondary-color": "#A594F9",
        }}
      />
    </ProfileStatsItem>
  );
};
