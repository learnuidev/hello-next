"use client";
import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { languages } from "@/app/next/features/phrase/languages";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { Icons } from "@/components/ui/icons.v2";
import { Skeleton } from "@/components/ui/skeleton";
import { useListComponents } from "@/domain/lesson/component.queries";
import { cn } from "@/lib/utils";
import { useState } from "react";

function ReadModeItem({ text, setWords }: { text: string; setWords: any }) {
  const [isHovered, setIsHovered] = useState("");
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

  if (isContextLoading) {
    return (
      <p>
        <Skeleton className={"h-12 bg-gray-300 rounded-xl"} />
      </p>
    );
  }
  return (
    <>
      <p className="">
        {context?.map((contextItem: any) => {
          return (
            <span
              onMouseEnter={() => {
                setIsHovered(contextItem?.id);
              }}
              onMouseLeave={() => {
                setIsHovered("");
              }}
              key={contextItem.id}
              className={cn(
                "inline-flex flex-col items-center",

                "hover:text-black dark:hover:text-white dark:text-gray-300 text-gray-600"
              )}
            >
              <span className="text-sm">{contextItem?.pinyin}</span>
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
                          `${hoverColor}`,
                          isHovered === contextItem?.id ? color : ""
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

function ReadMode({ state, setWords }: { state: string; setWords: any }) {
  // const { data: context } = useListDictionaryMeaningsQuery(state, {
  //   onSuccess: (data: any) => {
  //     setWords((prev: any) => {
  //       return {
  //         ...prev,
  //         [state]: data,
  //       };
  //     });
  //   },
  // });
  return (
    <div className="overflow-y-auto my-32 text-3xl font-light dark:text-gray-200 block w-full outline-none resize-none bg-inherit overflow-hidden h-[881px]">
      {/* <div>
        <code>
          <pre>{JSON.stringify(context, null, 4)}</pre>
        </code>
      </div> */}

      <div className="space-y-8">
        {state
          .split("\n")
          .filter(Boolean)
          .map((item) => {
            return <ReadModeItem setWords={setWords} key={item} text={item} />;
          })}
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
      className="my-32 text-3xl font-light dark:text-gray-200 block w-full outline-none resize-none bg-inherit overflow-hidden h-[881px]"
      value={state}
      onChange={(event) => {
        setState(event.target.value);
      }}
    />
  );
}

export default function Clipboard() {
  const lang = languages[0];
  const [words, setWords] = useState({});
  const [mode, setMode] = useState("edit");
  const [state, setState] = useState(
    `他经历过中国的贫穷，所以他决心实施脱贫攻坚战略，带领中国人民摆脱绝对贫困
他见识过西方的繁华，所以他带领中国人民奋发图强，走到了世界中央
他愿意分享文明发展的成果，所以他和第三世界一起阔步向前
他知道贪婪的觊觎一直都在，所以他把解放军建成世界一流军队`
  );

  const wordsList = Object.entries(words)
    .filter((item) => state?.includes(item?.[0]))
    ?.map((item) => item?.[1])
    ?.flat();

  const uniqueWordsList = [
    ...new Set(wordsList?.map((item: any) => item?.pinyin).filter(Boolean)),
  ];

  console.log("UNIQUE WORDS", uniqueWordsList);

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
          <button
            className="w-12  justify-self-end"
            onClick={() => {
              setState("");
            }}
          >
            <Icons.gear className="text-2xl" />
          </button>
        </div>
      </header>

      {mode === "read" ? (
        <ReadMode state={state} setWords={setWords} />
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
              className="dark:bg-[rgb(31,32,33)]  bg-gray-100 px-8 py-2 rounded-full justify-self-center"
              onClick={() => {
                setMode("edit");
              }}
            >
              <Icons.bookOpen />
              <span className="pl-2"> Edit</span>
            </button>
          ) : (
            <button
              className="bg-rose-500 text-white  px-8 py-2 rounded-full justify-self-center"
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
              setState("");
            }}
          >
            <Icons.clipboard className="text-2xl" />
          </button>
        </div>
      </footer>
    </main>
  );
}
