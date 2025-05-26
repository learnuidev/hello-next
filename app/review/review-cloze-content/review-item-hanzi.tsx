/* eslint-disable react-hooks/exhaustive-deps */
import { CharacterItem } from "@/components/_select-character/character-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import Link from "next/link";

export const ReviewItemHanzi = ({
  input,
  lang,
}: {
  input: string;
  lang: string;
}) => {
  return (
    <h1 className="text-center text-3xl">
      {smartSplit({ input: input, lang })
        .split("")
        .map((item: string, idx: number) => {
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
