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

export const CharacterTitle = (props: any) => {
  const {
    lang,
    multiSentence,
    characterId,
    selectedCompInput: selectedCompInput2,
  } = props;
  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersQuery();

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

  const selectedCompInput = selectedComp?.hanzi || selectedCompInput2;

  const brightMode = useReadModeStore((state) => state.readMode);

  const StatusIcon = getStatusIcon(character?.status);

  return (
    <div className="flex flex-col items-start space-y-2 w-full">
      {brightMode ? (
        pinyins?.length > 1 ? (
          <h2 className="text-gray-400 font-extralight">
            {pinyins?.join("/")}
          </h2>
        ) : (
          <h2 className="text-gray-400 font-extralight">
            {selectedComp?.pinyin || pinyins?.[0]}
          </h2>
        )
      ) : null}

      {lang === "zh" ? (
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
                      href={`/nmm/${val}?lang=zh`}
                      key={`${val}-${idx}`}
                      className={`${
                        brightMode || isCharactersLoading
                          ? `dark:text-gray-300 text-gray-700 ${hoverColor}`
                          : // learnedCharacters.includes(prop?.hanzi)
                            learnedChar
                            ? learnedChar?.status === "forgotten"
                              ? `text-gray-900 ${hoverColor}`
                              : // : lastAnswer?.totalCharacters?.includes(character?.hanzi)
                                //   ? "text-rose-500"
                                `${color} text-gray-300 ${hoverColor}`
                            : selectedComp?.length > 1 || selectedComp?.group
                              ? `dark:text-gray-500 text-gray-200 ${hoverColor}`
                              : `dark:text-gray-700 text-gray-200 ${hoverColor}`
                      } ${hoverColor} text-2xl transition lowercase font-light`}
                    >
                      {val}
                    </Link>
                  );
                }

                return (
                  <Link
                    href={`/nmm/${val}?lang=zh`}
                    key={`${val}-${idx}`}
                    className={`${color} text-2xl transition lowercase font-light`}
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

      <h2 className="text-gray-500 font-light">
        {selectedComp?.en || englishMeanings?.[0]}
      </h2>
    </div>
  );
};
