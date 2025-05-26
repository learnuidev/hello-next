/* eslint-disable react-hooks/exhaustive-deps */
import { CharacterItem } from "@/components/_select-character/character-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import Link from "next/link";
import { useMemo } from "react";

export const ReviewItemHanzi = ({
  input,
  lang,
}: {
  input: string;
  lang: string;
}) => {
  const splittedItem = useMemo(() => {
    return smartSplit({ input, lang });
  }, [smartSplit, input, lang]);
  return (
    <h1 className="text-center text-3xl">
      {splittedItem?.map((item: string, idx: number) => {
        return (
          <Link
            href={`/nmm/${item}${lang ? `?lang=${lang}` : ""}`}
            key={`review-cloze-${idx}-${item}`}
            target="_blank"
          >
            <CharacterItem
              character={item}
              className="text-center text-3xl font-light"
            />
          </Link>
        );
      })}
    </h1>
  );
};
