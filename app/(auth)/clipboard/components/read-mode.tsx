/* eslint-disable @next/next/no-img-element */
"use client";
import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { belts } from "@/app/nmm/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useListComponents } from "@/domain/lesson/component.queries";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { getHeightClass } from "../../convos/play-v3/utils/get-height-class";
import { useTranslateTextMutation } from "../hooks/use-translated-text-mutation";

function ReadModeItem({
  text,
  setWords,
  translations,
  setTranslations,
  focused,
  setFocused,
  focusedWord,
  setFocusedWord,
  pinyinView,
  setPinyinView,
  sentenceView,
  setSentenceView,
  hskView,
  setHskView,
}: any) {
  // const [isHovered, setIsHovered] = useState("");
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

export function ReadMode({
  state,
  setWords,
  translations,
  setTranslations,
  focused,
  setFocused,
  pinyinView,
  setPinyinView,
  sentenceView,
  setSentenceView,
  hskView,
  setHskView,
}: any) {
  const [selected, setFocusedWord] = useState<any>(null);
  const currentTranslation = translations?.[focused];

  const height = getHeightClass(currentTranslation?.output?.length);
  return (
    <div className="my-32 relative">
      {sentenceView && (
        <div className="fixed top-[75px] max-w-4xl w-full z-30 dark:bg-black bg-white p-2">
          <div>
            <div className="sticky top-0 pt-4 px-2 pb-[4px] bg-gray-50 dark:bg-[rgb(9,10,11)]">
              <div className="pb-4">
                <h4 className="text-xs text-gray-500">Sentence</h4>
                <div
                  className={`${height} flex justify-between items-center mt-2 w-full`}
                >
                  <p className="space-x-2 text-[16px] font-extralight pb-[4px]">
                    {currentTranslation?.output}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-24 hidden sm:block mb-4">
              <h4 className="text-xs text-gray-500">Word</h4>

              {selected ? (
                <div className="h-14 mt-2 w-full">
                  <div className="flex justify-between items-center">
                    <p className="space-x-2 text-[16px] font-extralight">
                      <span>{selected?.hanzi}</span>

                      <span className="text-red-400">{selected?.pinyin}</span>
                    </p>

                    {selected?.level && <p>HSK {selected?.level}</p>}
                  </div>

                  <p className="font-extralight">
                    <span className="wrap">{selected?.en}</span>
                  </p>
                </div>
              ) : (
                <div className="h-14"></div>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "overflow-y-auto mb-24  text-2xl font-light dark:text-gray-200 block w-full outline-none resize-none bg-inherit overflow-hidden h-[881px]",
          sentenceView && "mt-80"
        )}
      >
        <div className="space-y-8">
          {state
            .split("\n")
            .filter(Boolean)
            .map((item: any) => {
              return (
                <ReadModeItem
                  focusedWord={selected}
                  setFocusedWord={setFocusedWord}
                  focused={focused}
                  setFocused={setFocused}
                  translations={translations}
                  setTranslations={setTranslations}
                  setWords={setWords}
                  key={item}
                  text={item}
                  pinyinView={pinyinView}
                  setPinyinView={setPinyinView}
                  sentenceView={sentenceView}
                  setSentenceView={setSentenceView}
                  hskView={hskView}
                  setHskView={setHskView}
                  state={state}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
