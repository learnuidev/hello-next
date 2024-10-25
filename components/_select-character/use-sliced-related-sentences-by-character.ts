import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";
import { usePaginationStore } from "@/stores/use-pagination-store";

export const useSlicedRelatedSentencesByCharacter = (characterId: string) => {
  const { data: relatedHskWords } = useListRelatedHSKWords(characterId);

  const pagination = usePaginationStore((state) => state.pagination);

  const relatedSentences = relatedHskWords
    ?.filter((item) => (item?.hanzi || item?.input)?.length > 4)
    ?.sort((a, b) => a?.pinyin?.length - b?.pinyin?.length);

  const totalSentencs = Math.ceil(relatedSentences?.length / 10);

  const options = Array(totalSentencs)
    .fill(1)
    .map((val, idx) => {
      return {
        start: idx === 0 ? idx : idx * 10,
        end: (1 + idx) * 10,
      };
    });

  const sliced = relatedSentences?.slice(
    pagination?.start || 0,
    pagination?.end || 10
  );

  return sliced;
};
