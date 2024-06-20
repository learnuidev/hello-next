"use client";

import { useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { useRouter } from "next/navigation";

import { useSelectedCharacter } from "./use-selected-character";
import { SelectedCharacter } from "@/components/selected-character";
import { useListParseQuery } from "@/domain/nmm/nmm.queries";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import Link from "next/link";

export function ConvoInsights({ lessonId }: { lessonId: string }) {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const router = useRouter();

  const { data: lesson } = useGetContentQuery({ contentId: lessonId });

  console.log("LESSON", lesson);

  const lang = lesson?.lang || lesson?.transcriptions?.[0]?.lang;

  const { data: learnedCharacters } = useListCharactersQuery();

  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const uniqueWords = [
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
    ?.filter(
      (x: string) =>
        ![
          "？",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "”",
          "“ ",
          "，",
          "：",
          "；",
          "、",
          "！",
          "（",
          "）",
          "“",
          "。",
          "‘",
          "’",
          "《",
          "》",
          "/",
          "!",
          "(",
          ")",
          ".",
          "?",
          "",
          " ",
        ]?.includes(x?.toLowerCase()) || !Boolean(x)
    );

  console.log("unique words", uniqueWords);

  const totalNewCharaters = uniqueWords?.filter((char) => {
    const isLearned = learnedCharacters?.find(
      (item: any) => item?.hanzi === char
    );

    return !!isLearned;
  })?.length;

  const understandingRate = Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(totalNewCharaters / uniqueWords?.length);

  if (isLoading) {
    return (
      <div className=" px-4 md:px-32 my-4 md:my-8">
        <div className="text-center my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
          ...
        </div>
      </div>
    );
  }

  return selectedChar ? (
    <SelectedCharacter characterId={selectedChar} />
  ) : (
    <div className="w-full px-4 md:px-32 my-4 md:my-8">
      <div>
        <div className="flex justify-between w-full">
          <div className="flex justify-start space-x-16">
            <h2 className="text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
              {uniqueWords?.length}{" "}
              <span className="text-sm md:text-xl">total characters </span>
            </h2>
            <h2 className="text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
              <span className="text-yellow-500">
                {" "}
                {uniqueWords?.length - totalNewCharaters}
              </span>
              <span className="text-sm md:text-xl">new characters </span>
            </h2>
          </div>

          <h2 className="text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            <span className="text-gray-300"> {understandingRate}</span>
          </h2>
        </div>

        <div className="my-8">
          <div className="my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
            {uniqueWords?.map((char, idx: number) => {
              const isLearned = learnedCharacters?.find(
                (item: any) => item?.hanzi === char
              );
              return (
                <Link
                  href={`/nmm/${char}${lang ? `?lang=${lang}` : ""}`}
                  // onClick={() => {
                  //   setSelectedChar(char);
                  // }}
                  className={`p-2 ${
                    // ""
                    isLearned
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                  // className="p-2"
                  key={`${idx}-${char}-${idx}`}
                >
                  {" "}
                  {char}
                </Link>
              );
            })}
          </div>
        </div>
        {/* <div className="my-8">
          <div className="my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
            {unlockedNMMCharacters?.map((char, idx: number) => {
              return (
                <span
                  role="button"
                  onClick={() => {
                    setSelectedChar(char);
                  }}
                  className={`p-2 ${
                    currentLevel?.maxCharacterLevel >= char?.hmmCharacterLevel
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                  // className="p-2"
                  key={`${idx}-${char?.hanzi}-${idx}`}
                >
                  {" "}
                  {char?.hanzi}
                </span>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
}
