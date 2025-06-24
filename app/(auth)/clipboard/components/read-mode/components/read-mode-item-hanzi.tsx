import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { belts } from "@/app/nmm/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useListComponents } from "@/domain/lesson/component.queries";
import { cn } from "@/lib/utils";
import { useClipboardFocus } from "../../../hooks/use-clipboard-focus";
import { useClipboardHskView } from "../../../hooks/use-clipboard-hsk-view";
import { useClipboardPinyinView } from "../../../hooks/use-clipboard-pinyin-view";
import { useClipboardTranslations } from "../../../hooks/use-clipboard-translations";
import { useClipboardWords } from "../../../hooks/use-clipboard-words";
import { useTranslateTextMutation } from "../../../hooks/use-translated-text-mutation";
import { useClipboardFocused } from "../hooks/use-clipboard-focused";

export function ReadModeItemHanzi({
  text,
  lang,
  sentenceIndex,
}: {
  text: string;
  lang: string;
  sentenceIndex: number;
}) {
  const { focused, setFocused } = useClipboardFocus();
  const { setWords } = useClipboardWords();
  const { hskView } = useClipboardHskView();

  const { pinyinView } = useClipboardPinyinView();
  const { focusedWord, setFocusedWord } = useClipboardFocused();
  const { translations, setTranslations } = useClipboardTranslations();

  const { data: context, isLoading: isContextLoading } =
    useListDictionaryMeaningsQuery(text, lang, {
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

  console.log("context", context);

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
          if (!translations?.[text] && !translateTextMutation.isPending) {
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
                {(contextItem?.hanzi || contextItem?.input)
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
