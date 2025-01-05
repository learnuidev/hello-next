import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useGetComponentQuery } from "@/domain/lesson/use-get-component-query";
import { cn } from "@/lib/utils";

import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { getStatusIcon } from "@/app/(auth)/insights/insights-v2/precision-insight-view/status-icons";
import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";
import { useGetCharacter } from "@/hooks/use-get-character";
import { useReadModeStore } from "@/stores/use-readmode-store";
import Link from "next/link";
import { Icons } from "../ui/icons.v2";
import { CharacterTrackButton } from "./selected-character/character-track-button";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { useState } from "react";
import { characterStore } from "./character-store";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { BookmarkButton } from "@/app/nmm/bookmark-button";
import { useSearchParams } from "next/navigation";
import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";

export const CharacterTitle = (props: any) => {
  const {
    lang,
    multiSentence,
    characterId,
    selectedCompInput: selectedCompInput2,
  } = props;
  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersQuery();
  const searchParams = useSearchParams();

  const context = searchParams?.get("context");

  const pinyinInput = characterStore((state) => state.pinyin);
  const setPinyin = characterStore((state) => state.setPinyin);

  const componentId = useGetComponentId();

  const { data } = useListComponentVariantsQuery({ hanzi: characterId });

  const character = useGetCharacter({ characterId: componentId });

  const pinyins = data?.map((val) => val?.pinyin) || [];
  const englishMeanings = data?.map((val) => val?.en) || [];

  const { speak } = useSpeak();

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const { data: selectedComp } = useGetComponentQuery({
    hanzi: componentId,
  });

  const { data: meaning, isLoading } = useListMeaningsQuery({
    content: componentId,
    lang,
  });

  const selectedCompInput = selectedComp?.hanzi || selectedCompInput2;

  // const brightMode = useReadModeStore((state) => state.readMode);

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const StatusIcon = getStatusIcon(character?.status);

  const finalEnVal =
    englishMeanings?.length === 1
      ? englishMeanings?.[0] || selectedComp?.en || meaning?.details?.en
      : selectedComp?.en || meaning?.details?.en || englishMeanings?.[0];

  const selectedPinyin = pinyins?.length
    ? pinyins?.join("/")
    : pinyins?.[0] ||
      pinyinInput ||
      selectedComp?.pinyin ||
      meaning?.details?.pinyin;

  const setIfExists = useSetIfExists();

  return (
    <div className="flex flex-col items-start space-y-2 w-full">
      {brightMode ? (
        pinyins?.length > 1 ? (
          <h2 className="text-gray-900 dark:text-gray-400  font-extralight">
            {pinyins?.map((pinyin, i, ctx) => {
              return (
                <Link
                  href={`/nmm/${characterId}?lang=zh&variant=${pinyin}`}
                  className=""
                  key={pinyin}
                >
                  {pinyin}
                  {ctx?.length - 1 !== i ? "; " : ""}
                </Link>
              );
            })}
          </h2>
        ) : (
          <h2 className="text-gray-900 dark:text-gray-400  font-extralight focus-visible:ring-0 focus-visible:ring-transparent w-full">
            {pinyins?.[0] ||
              pinyinInput ||
              selectedComp?.pinyin ||
              meaning?.details?.pinyin}
          </h2>
        )
      ) : null}

      {(lang || meaning?.lang) === "zh" ? (
        <div className="flex justify-between items-center w-full">
          <div className="space-x-4 flex items-center">
            <div>
              {selectedCompInput?.split("")?.map((val: any, idx: any) => {
                const learnedChar = learnedCharacters2?.find(
                  (char: any) => char?.hanzi === val
                );
                const comp = components?.find(
                  (char: any) => char?.hanzi === val
                );

                const color = calculateColor({
                  tone: learnedChar?.tone_level || selectedComp?.tone_level,
                });

                const hoverColor = calculateHoverColor({
                  tone: learnedChar?.tone_level || comp?.tone_level,
                });

                if (selectedCompInput?.length > 1) {
                  return (
                    <Link
                      onClick={() => {
                        if (meaning?.details) {
                          setIfExists({ ...meaning?.details });
                        }
                      }}
                      href={`/nmm/${val}?lang=zh${context ? `&context=${context}` : ""}`}
                      key={`${val}-${idx}`}
                      className={`${
                        brightMode || isCharactersLoading
                          ? `dark:text-gray-300 text-gray-700 ${hoverColor}`
                          : // learnedCharacters.includes(prop?.hanzi)
                            learnedChar
                            ? learnedChar?.status === "forgotten"
                              ? `text-gray-200 dark:text-gray-600 ${hoverColor}`
                              : // : lastAnswer?.totalCharacters?.includes(character?.hanzi)
                                //   ? "text-rose-500"
                                `${color} text-gray-300 ${hoverColor}`
                            : selectedComp?.length > 1 || selectedComp?.group
                              ? `dark:text-gray-500 text-gray-200 ${hoverColor}`
                              : `dark:text-gray-200 text-gray-800 ${hoverColor}`
                      } ${hoverColor} text-2xl transition lowercase font-light`}
                    >
                      {val}
                    </Link>
                  );
                }

                return (
                  <Link
                    // href={`/nmm/${val}?lang=zh`}
                    href={`/nmm/${val}?lang=zh${context ? `&context=${context}` : ""}`}
                    key={`${val}-${idx}`}
                    className={`${color} text-3xl sm:text-4xl transition lowercase font-light`}
                    // className={`${
                    //   brightMode || isCharactersLoading
                    //     ? learnedChar?.status === "forgotten" &&
                    //       componentId?.length > 1
                    //       ? `dark:text-gray-600`
                    //       : `dark:text-gray-300 text-gray-700 ${color}`
                    //     : // learnedCharacters.includes(prop?.hanzi)
                    //       learnedChar
                    //       ? `${color} text-gray-300 ${hoverColor}`
                    //       : selectedComp?.length > 1 || selectedComp?.group
                    //         ? `dark:text-gray-500 text-gray-200 ${hoverColor}`
                    //         : `dark:text-gray-700 text-gray-200 ${hoverColor}`
                    // } ${hoverColor} text-2xl transition lowercase font-light`}
                  >
                    {val}
                  </Link>
                );
              })}
            </div>

            <div className="space-x-4 flex">
              <button
                onClick={() => {
                  speak(selectedCompInput);
                }}
              >
                <Icons.volume className="text-2xl" />
              </button>

              <CharacterTrackButton />

              <BookmarkButton
                hanzi={characterId}
                lang={lang}
                en={finalEnVal}
                pinyin={selectedPinyin}
              />
            </div>
          </div>

          <div>
            {selectedCompInput?.length < 4 && (
              <StatusIcon.Icon className="text-2xl" />
            )}
            {/* {character?.status === "forgotten" && (
              <RedFireDuoTone className="text-2xl" />
            )} */}
          </div>
        </div>
      ) : lang === "zh" && multiSentence ? (
        <h1 className="text-xl my-0 py-0 font-extralight">
          {selectedCompInput}
        </h1>
      ) : (
        <h1
          className={cn(
            selectedCompInput?.length < 16 ? "text-2xl md:text-4xl" : "text-xl",
            "my-0 py-0 font-extralight"
          )}
        >
          {selectedCompInput}
        </h1>
      )}

      <h2 className="dark:text-gray-500 text-gray-700 font-light">
        {finalEnVal?.split("/")?.slice(0, 4)?.join("/")}
      </h2>
    </div>
  );
};
