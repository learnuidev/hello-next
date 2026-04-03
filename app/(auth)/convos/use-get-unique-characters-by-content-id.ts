"use client";

import { useGetContentQuery } from "@/domain/content/content.queries";

import { filterNonEnglishAlphabets } from "@/app/nmm/nmm-utils/filter-non-english-alphabets";
import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";

export function listUniqueCharaters({
  text,
  lang,
}: {
  text: string;
  lang: string;
}) {
  const uniqueCharacters: string[] =
    lang === "zh"
      ? text?.toLocaleLowerCase()?.split("")?.filter(filterNonHanYu)
      : lang === "en"
        ? ([
            ...new Set(
              text
                .split(" ")
                ?.flat()
                ?.map((word: string) => {
                  let newWord = word
                    ?.replaceAll(", ", "")
                    ?.replaceAll(":", "")
                    ?.replaceAll("-", "")
                    ?.replaceAll("?", "")
                    ?.replaceAll(",", "");

                  const indexOfSingleQuote = newWord?.indexOf("'");

                  if (
                    indexOfSingleQuote === 0 ||
                    indexOfSingleQuote + 1 === newWord?.length
                  ) {
                    newWord = newWord?.replaceAll("'", "");
                  }

                  return newWord;
                })
                ?.filter(Boolean)
            ),
          ] as string[])
        : ([
            ...new Set(text.split(" ").map(filterNonEnglishAlphabets)),
          ] as string[]);

  return uniqueCharacters;
}

export function useListUniqueCharatersByContentId({
  contentId,
}: {
  contentId: string;
}) {
  const { data: lesson } = useGetContentQuery({ contentId });

  const lang = lesson?.lang || lesson?.transcriptions?.[0]?.lang;

  const uniqueCharacters: string[] =
    lang === "zh"
      ? [
          // @ts-ignore
          ...new Set(
            lesson?.transcriptions
              // allLessonAnswers
              ?.map(
                (answer: { hanzi: string; input: string }) =>
                  answer?.hanzi || answer?.input
              )
              ?.join("")
          ),
        ]
          .join("")
          ?.toLocaleLowerCase()
          ?.split("")
          ?.filter(filterNonHanYu)
      : lang === "en"
        ? ([
            ...new Set(
              lesson?.transcriptions
                // allLessonAnswers
                ?.map(
                  (answer: { hanzi: string; input: string }) =>
                    answer?.hanzi || answer?.input?.split(" ")
                )
                ?.flat()
                ?.map((word: string) => {
                  let newWord = word
                    ?.replaceAll(", ", "")
                    ?.replaceAll(":", "")
                    ?.replaceAll("-", "")
                    ?.replaceAll("?", "")
                    ?.replaceAll(",", "");

                  const indexOfSingleQuote = newWord?.indexOf("'");

                  if (
                    indexOfSingleQuote === 0 ||
                    indexOfSingleQuote + 1 === newWord?.length
                  ) {
                    newWord = newWord?.replaceAll("'", "");
                  }

                  return newWord;
                })
                ?.filter(Boolean)
            ),
          ] as string[])
        : ([
            ...new Set(
              lesson?.transcriptions
                // allLessonAnswers
                ?.map(
                  (answer: { hanzi: string; input: string }) =>
                    answer?.hanzi || answer?.input?.split(" ")
                )
                ?.flat()
                .map(filterNonEnglishAlphabets)
            ),
          ] as string[]);

  return uniqueCharacters;
}
