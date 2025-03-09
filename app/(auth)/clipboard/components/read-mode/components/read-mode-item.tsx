import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { belts } from "@/app/nmm/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useListComponents } from "@/domain/lesson/component.queries";
import { cn } from "@/lib/utils";
import { useTranslateTextMutation } from "../../../hooks/use-translated-text-mutation";
import { useReadModeStore } from "../hooks/use-readmode-store";

export function ReadModeItem({
  text,
  setWords,
  translations,
  setTranslations,
  focused,
  setFocused,
  focusedWord,
  // setFocusedWord,
  pinyinView,
  hskView,
}: any) {
  const setFocusedWord = useReadModeStore((state) => state.setFocusedWord);
  const { data: context, isLoading: isContextLoading } =
    useListDictionaryMeaningsQuery(text, {
      onSuccess: (data: any) => {
        setWords((prev: any) => {
          return {
            ...prev,
            [text]: data,
          };
        });
      },
    });

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const translateTextMutation = useTranslateTextMutation();

  if (isContextLoading) {
    return (
      <p>
        <Skeleton className={"h-12 dark:bg-gray-700 bg-gray-300 rounded-xl"} />
      </p>
    );
  }
  return (
    <>
      <p
        className={
          focused
            ? focused === text
              ? "dark:text-white text-black"
              : "text-gray-800"
            : ""
        }
        onMouseEnter={() => {
          setFocused(text);
          if (!translations?.[text] && !translateTextMutation?.isLoading) {
            translateTextMutation
              .mutateAsync({
                targetLang: "en",
                sourceLang: "zh-CN",
                input: text,
              })
              .then((resp) => {
                setTranslations((prev: any) => {
                  return {
                    ...prev,
                    [text]: resp,
                  };
                });
              });
          }
        }}
        onMouseLeave={() => {
          setFocused(null);
        }}
      >
        {context?.map((contextItem: any) => {
          const belt = belts?.find(
            (belt) => belt?.hskLevel === contextItem?.level
          );
          return (
            <span
              onClick={() => {
                setFocusedWord((prevContextItem: any) =>
                  prevContextItem?.id !== contextItem?.id ? null : contextItem
                );
              }}
              onMouseEnter={() => {
                setFocusedWord(contextItem);
              }}
              onMouseLeave={() => {
                setFocusedWord(null);
              }}
              key={contextItem.id}
              className={cn(
                "inline-flex flex-col items-center",

                "hover:text-black dark:hover:text-white dark:text-gray-300 text-gray-600",

                hskView && contextItem?.level && belt
                  ? `border-b-[2px] ${belt?.border}`
                  : "",
                "mx-[2px]"
              )}
            >
              {pinyinView && (
                <span className={cn("text-xs", "lowercase")}>
                  {contextItem?.pinyin}
                </span>
              )}
              <span>
                {contextItem?.hanzi
                  ?.split("")
                  .map((hanziItem: string, idx: number) => {
                    const comp = components?.find(
                      (char: any) => char?.hanzi === hanziItem
                    );

                    const color = calculateColor({
                      tone: comp?.tone_level,
                    });

                    const hoverColor = calculateHoverColor({
                      tone: comp?.tone_level,
                    });

                    return (
                      <span
                        className={cn(
                          focusedWord?.id === contextItem?.id ? color : "",
                          `${hoverColor}`,
                          "transition"
                        )}
                        key={`${idx}-${hanziItem}`}
                      >
                        {hanziItem}
                      </span>
                    );
                  })}
              </span>
            </span>
          );
        })}
      </p>
    </>
  );
}
