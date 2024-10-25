import { cn } from "@/lib/utils";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useMemo } from "react";
import { useListComponents } from "@/domain/lesson/component.queries";

import { useReadModeStore } from "@/stores/use-readmode-store";
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { Icons } from "../ui/icons.v2";

export const CharacterTitle = ({
  pinyinOrRoman,
  lang,
  multiSentence,
  selectedCompInput,
  selectedCompEn,
}: any) => {
  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersQuery();

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
      <h2 className="text-gray-400 font-extralight">{pinyinOrRoman}</h2>

      {lang === "zh" ? (
        <div className="space-x-4 flex items-center">
          <div>
            {selectedCompInput?.split("")?.map((val: any, idx: any) => {
              const learnedChar = learnedCharacters2?.find(
                (char: any) => char?.hanzi === val
              );

              const color = calculateColor({
                tone: learnedChar?.tone_level,
              });

              return (
                <a
                  href={`/nmm/${val}?lang=zh`}
                  key={`${val}-${idx}`}
                  className={`${
                    brightMode || isCharactersLoading
                      ? "dark:text-gray-300 text-gray-700"
                      : // learnedCharacters.includes(prop?.hanzi)
                        learnedChar
                        ? learnedChar?.status === "forgotten"
                          ? "text-gray-900"
                          : // : lastAnswer?.totalCharacters?.includes(character?.hanzi)
                            //   ? "text-rose-500"
                            `hover:${color} text-gray-300`
                        : selectedComp?.length > 1 || selectedComp?.group
                          ? "dark:text-gray-500 text-gray-200"
                          : "dark:text-gray-700 text-gray-200"
                  } dark:hover:text-white text-2xl md:text-2xl transition lowercase font-light`}
                >
                  {val}
                </a>
              );
            })}
          </div>

          <button
            onClick={() => {
              speak(selectedCompInput);
            }}
          >
            <Icons.volume className="text-2xl" />
          </button>
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

      {/* {brightMode && ( */}
      <h2 className="text-gray-500 font-light">{selectedCompEn}</h2>
      {/* )} */}
    </div>
  );
};
