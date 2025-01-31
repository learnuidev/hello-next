/* eslint-disable @next/next/no-img-element */
"use client";
import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { languages } from "@/app/next/features/phrase/languages";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { belts } from "@/app/nmm/utils";
import { Icons } from "@/components/ui/icons.v2";
import { Skeleton } from "@/components/ui/skeleton";
import { useListComponents } from "@/domain/lesson/component.queries";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { chineseConverter } from "mandarino/src/utils/chinese-converter";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { getHeightClass } from "../convos/play-v3/utils/get-height-class";
import { createIndexDBStore } from "@/libs/index-db/index-db";

function SettingsPopover({
  pinyinView,
  setPinyinView,
  sentenceView,
  setSentenceView,
  hskView,
  setHskView,
}: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-12 justify-self-end">
          <Icons.gear className="text-2xl" />
        </button>
        {/* <Button variant="outline">Open popover</Button> */}
      </PopoverTrigger>
      <PopoverContent className="w-80 dark:border-gray-900 border-gray-100 dark:bg-[rgb(21,22,23)] bg-gray-100 rounded-2xl">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-bold leading-none">Clipboard Settings</h4>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2 justify-between">
              <Label htmlFor="airplane-mode">Show Pinyin</Label>
              <Switch
                color="dark:bg-blue-500"
                // className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={pinyinView}
                onCheckedChange={() => {
                  setPinyinView((prev: any) => !prev);
                }}
              />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <Label htmlFor="airplane-mode">Show Sentences</Label>
              <Switch
                color="dark:bg-blue-500"
                // className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={sentenceView}
                onCheckedChange={() => {
                  setSentenceView((prev: any) => !prev);
                }}
              />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <Label htmlFor="airplane-mode">Show HSK </Label>
              <Switch
                color="dark:bg-blue-500"
                // className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={hskView}
                onCheckedChange={() => {
                  setHskView((prev: any) => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const useTranslatedTextStore = createIndexDBStore({
  name: "mandarino/translatedText",
  handler: (set: any, get: any) => ({
    dictionary: {},
    getDictionary: (id: string) => get().dictionary?.[id],
    setDictionary: (id: string, event: any) =>
      set({
        dictionary: {
          ...get().dictionary,
          [id]: event,
        },
      }),
  }),
});

const useTranslateTextMutation = () => {
  const token = useJwtToken();

  const queryClient = useQueryClient();

  const getDictionary = useTranslatedTextStore((state) => state.getDictionary);
  const setDictionary = useTranslatedTextStore((state) => state.setDictionary);

  return useMutation({
    mutationFn: async ({
      sourceLang,
      targetLang,
      input,
    }: {
      sourceLang: string;
      targetLang: string;
      input: string;
    }) => {
      const found = getDictionary(input);

      if (found) {
        console.log("FOUND translation", found);
        return found;
      }

      console.log("Not found in cache, fetching translation");

      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/translations/translate-text`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            sourceLang,
            targetLang,
            input,
          }),
        }
      );

      const respJson = await res.json();

      setDictionary(input, respJson);

      return respJson;
    },
  });
};

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
                // setIsHovered(contextItem?.id);
              }}
              onMouseLeave={() => {
                setFocusedWord(null);
                // setIsHovered("");
              }}
              key={contextItem.id}
              className={cn(
                "inline-flex flex-col items-center",

                "hover:text-black dark:hover:text-white dark:text-gray-300 text-gray-600",
                // focused
                //   ? focused === text
                //     ? "text-black dark:text-white"
                //     : "text-gray-600"
                //   : "",

                hskView && contextItem?.level && belt
                  ? `border-b-[2px] ${belt?.border}`
                  : "",
                "mx-[2px]"
              )}
            >
              {pinyinView && (
                <span
                  className={cn(
                    "text-xs",
                    "lowercase"
                    // focused
                    //   ? focused === text
                    //     ? "dark:text-white text-black"
                    //     : "text-gray-500"
                    //   : ""
                  )}
                >
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
                          // focused
                          //   ? focused === text
                          //     ? "dark:text-white text-black"
                          //     : "text-gray-500"
                          //   : "",
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
      {/* <p>{text}</p> */}

      {/* <div>
        <code>
          <pre>{JSON.stringify(context, null, 4)}</pre>
        </code>
      </div> */}
    </>
  );
}

function ReadMode({
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

function EditMode({
  state,
  setState,
}: {
  state: string;
  setState: (value: string) => void;
}) {
  return (
    <textarea
      placeholder="Paste text here"
      className="my-32 text-2xl font-light dark:text-gray-200 block w-full outline-none resize-none bg-inherit overflow-hidden h-[881px]"
      value={state}
      onChange={(event) => {
        setState(chineseConverter(event.target.value));
      }}
    />
  );
}

export default function Clipboard() {
  const defaultState = `国之交在于民相亲。习近平主席指出，“中美关系的希望在人民，基础在民间”。

我们有理由相信，在经济全球化的滚滚大潮中，在网络世界的互联互通中，那个你中有我、我中有你的人类命运共同体，只会越发紧密，必将携手向前。

在这个意义上，与其说是“TikTok 难民”，不如说是“地球村村民”；与其说是“流浪”，不如说是找到了“新家”。`;
  const oldDefaultState = `他经历过中国的贫穷，所以他决心实施脱贫攻坚战略，带领中国人民摆脱绝对贫困
他见识过西方的繁华，所以他带领中国人民奋发图强，走到了世界中央
他愿意分享文明发展的成果，所以他和第三世界一起阔步向前
他知道贪婪的觊觎一直都在，所以他把解放军建成世界一流军队`;
  const lang = languages[0];
  const [words, setWords] = useState({});
  const [focused, setFocused] = useState(null);
  const [translations, setTranslations] = useState({});
  const [mode, setMode] = useState("edit");
  const [state, setState] = useState(defaultState);
  const [pinyinView, setPinyinView] = useState(false);
  const [sentenceView, setSentenceView] = useState(false);
  const [hskView, setHskView] = useState(false);

  const wordsList = Object.entries(words)
    .filter((item) => state?.includes(item?.[0]))
    ?.map((item) => item?.[1])
    ?.flat();

  const uniqueWordsList = [
    ...new Set(wordsList?.map((item: any) => item?.pinyin).filter(Boolean)),
  ];

  const totalWords = uniqueWordsList?.length || 0;
  return (
    <main className="relative max-w-4xl mx-auto px-6">
      <header className="w-full max-w-4xl sm:pr-0 pr-12 fixed top-0 py-4 z-30 dark:bg-[rgb(9,10,11)]/75 bg-white/75 dark:bg-react/75 backdrop-blur-sm">
        <div className="grid grid-cols-3 justify-between w-full">
          <div></div>
          <div
            className="bg-gray-100 dark:bg-[rgb(23,24,25)] py-[4px] rounded-full justify-self-center"
            onClick={() => {
              setState("");
            }}
          >
            <div className="pr-4 pl-4 py-[2px] w-full flex items-center justify-between space-x-4">
              <img src={lang.src} alt={lang.title} className="h-6 block" />

              <p className="font-bold text-2xl">{totalWords}</p>

              <p className="text-sm">Words</p>
            </div>
          </div>

          <SettingsPopover
            pinyinView={pinyinView}
            setPinyinView={setPinyinView}
            sentenceView={sentenceView}
            setSentenceView={setSentenceView}
            hskView={hskView}
            setHskView={setHskView}
          />
          {/* <button
            className="w-12  justify-self-end"
            onClick={() => {
              setState("");
            }}
          >
            <Icons.gear className="text-2xl" />
          </button> */}
        </div>
      </header>

      {mode === "read" ? (
        <ReadMode
          pinyinView={pinyinView}
          setPinyinView={setPinyinView}
          sentenceView={sentenceView}
          setSentenceView={setSentenceView}
          hskView={hskView}
          setHskView={setHskView}
          focused={focused}
          setFocused={setFocused}
          state={state}
          setWords={setWords}
          translations={translations}
          setTranslations={setTranslations}
        />
      ) : (
        <EditMode state={state} setState={setState} />
      )}

      <footer className="w-full max-w-4xl sm:pr-0 pr-12 fixed bottom-0 py-8 z-30 dark:bg-[rgb(9,10,11)]/75 bg-white/75 dark:bg-react/75 backdrop-blur-sm">
        <div className="grid grid-cols-3 justify-between w-full">
          <button
            className="w-12 justify-self-start"
            onClick={() => {
              setState("");
            }}
          >
            <Icons.trash className="text-2xl" />
          </button>
          {mode === "read" ? (
            <button
              className="dark:bg-[rgb(31,32,33)]  bg-gray-100 px-4 sm:px-8 py-2 rounded-full justify-self-center"
              onClick={() => {
                setMode("edit");
              }}
            >
              <Icons.bookOpen />
              <span className="pl-2"> Edit</span>
            </button>
          ) : (
            <button
              className="bg-rose-500 text-white  px-4 sm:px-8 py-2 rounded-full justify-self-center"
              onClick={() => {
                setMode("read");
              }}
            >
              <Icons.bookOpen />
              <span className="pl-2"> Read</span>
            </button>
          )}
          <button
            className="w-12  justify-self-end"
            onClick={() => {
              setState(defaultState);
            }}
          >
            <Icons.clipboard className="text-2xl" />
          </button>
        </div>
      </footer>
    </main>
  );
}
