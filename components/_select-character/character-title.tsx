import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";
import { useReadModeStore } from "@/stores/use-readmode-store";
import Link from "next/link";
import { Icons } from "../ui/icons.v2";

export const CharacterTitle = ({
  pinyinOrRoman,
  lang,
  multiSentence,
  selectedCompInput,
  selectedCompEn,
  characterId,
}: any) => {
  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersQuery();

  const { data } = useListComponentVariantsQuery({ hanzi: characterId });

  const pinyins = data?.map((val) => val?.pinyin) || [];
  const englishMeanings = data?.map((val) => val?.en) || [];

  const { speak } = useSpeak();

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const selectedComp = useMemo(
    () =>
      components?.find(
        (component: any) => component?.hanzi === selectedCompInput
      ),
    [components, selectedCompInput]
  );

  //   const brightMode = useBrightModeStore((state: any) => state.mode);
  const brightMode = useReadModeStore((state) => state.readMode);

  const color = calculateColor({
    tone: selectedComp?.tone_level,
  });

  return (
    <div className="flex flex-col items-start space-y-2">
      {pinyins?.length > 1 ? (
        <h2 className="text-gray-400 font-extralight">{pinyins?.join("/")}</h2>
      ) : (
        <h2 className="text-gray-400 font-extralight">
          {pinyinOrRoman || pinyins?.[0]}
        </h2>
      )}

      {lang === "zh" ? (
        <div className="space-x-4 flex items-center">
          <div>
            {selectedCompInput?.split("")?.map((val: any, idx: any) => {
              const learnedChar = learnedCharacters2?.find(
                (char: any) => char?.hanzi === val
              );
              const comp = components?.find((char: any) => char?.hanzi === val);

              const color = calculateColor({
                tone: learnedChar?.tone_level,
              });
              const hoverColor = calculateHoverColor({
                tone: learnedChar?.tone_level || comp?.tone_level,
              });

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
        {selectedCompEn || englishMeanings?.[0]}
      </h2>
    </div>
  );
};
