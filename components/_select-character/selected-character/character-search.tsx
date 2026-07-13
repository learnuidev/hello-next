import { SearchHistoryResult } from "@/app/(auth)/insights/insights-v2/precision-insight-view/search-history-result";
import { useGetCharacter } from "@/hooks/use-get-character";

export const CharacterSearch = ({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) => {
  return (
    <div>
      <SearchHistoryResult query={characterId} />
    </div>
  );
};
