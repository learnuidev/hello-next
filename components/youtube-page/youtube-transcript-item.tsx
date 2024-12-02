import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faLanguage, faRepeat } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { resolveLangCode } from "@/libs/openai/utils";
import { useParams } from "next/navigation";
import { Icons } from "../ui/icons.v2";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useContentEditStore = create(
  persist(
    (set: any, get: any) => ({
      editMode: false,
      setEditMode: (mode?: any) => set({ editMode: mode || !get().editMode }),
      times: [],
      resetTimes: () => set({ times: [] }),
      setTimes: (f: any) =>
        typeof f === "function"
          ? set({ times: f(get().times) })
          : set({ times: f }),
    }),
    {
      name: "mandario/transcript-item-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const TranscriptItem = ({
  example,
  toggleLoops,
  setToggleLoops,
  currentTime,
  focusMode,
  isVideoHidden,
  playerRef,
  learnedCharacters,
  // components,
}: any) => {
  const params = useParams<{ "content-id": string }>();
  const contentId = params["content-id"];

  const editMode = useContentEditStore((state) => state.editMode);
  const setEditMode = useContentEditStore((state) => state.setEditMode);

  const times = useContentEditStore((state) => state.times);
  const setTimes = useContentEditStore((state) => state.setTimes);

  const setTimer = (
    type: "start" | "end" | "pinyin" | "hanzi" | "roman" | "en" | "input",
    newValue?: string
  ) => {
    const offset = newValue || currentTime - 0.2;
    setTimes((prev: any) => {
      const exists = prev?.find((item: any) => item?.id === example?.id);

      if (exists) {
        return prev.map((item: any) => {
          if (item?.id === example?.id) {
            return {
              ...exists,
              [type]: offset,
            };
          }

          return item;
        });
        // return prev.concat({
        //   ...exists,
        //   start: currentTime,
        // });
      }

      return prev.concat({
        id: example?.id,
        [type]: offset,
      });
    });
  };

  const timeStamp = times?.find((time: any) => time?.id === example?.id) as any;

  const { data: contents } = useListCharactersQuery();

  // const { data: grammars } = useListGrammarsQuery({ content: example?.input });

  // const grammarContent = (
  //   grammars as ListGrammarsResponse
  // )?.grammarAnalysis?.find((grammar) => grammar?.input === example?.input);

  const content =
    contents?.find(
      (contentItem: any) =>
        (contentItem?.input || contentItem?.hanzi) ===
        (example?.input || example?.hanzi)
    ) ||
    learnedCharacters?.find(
      (contentItem: any) =>
        (contentItem?.input || contentItem?.hanzi) ===
        (example?.input || example?.hanzi)
    );

  const setRepeatHistories = useRepeatHistoryStore((state) => state.setHistory);

  const histories = useRepeatHistoryStore((state) => state.history);
  const totalRepeats = histories?.filter((history: any) => {
    return (
      history?.contentId === contentId &&
      history?.input === (example?.input || example?.hanzi)
    );
  });

  const ConfigButtons = () => {
    return (
      <div className="space-x-2 flex flex-row items-center">
        <Link
          target="_blank"
          href={`https://translate.google.com/?tl=en&text=${encodeURIComponent(
            toggleLoops.length
              ? toggleLoops
                  ?.sort((a: any, b: any) => a?.end - b?.end)
                  ?.map((x: any) => x?.hanzi || x?.input)
                  ?.join("")
              : example?.hanzi || example?.input
          )}&op=translate`}
          className="text-gray-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faGoogle} />
        </Link>

        {example?.lang === "zh" && (
          <Link
            href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
              toggleLoops.length
                ? toggleLoops
                    ?.sort((a: any, b: any) => a?.end - b?.end)
                    ?.map((x: any) => x?.hanzi || x?.input)
                    ?.join("")
                : example?.hanzi || example?.input
            )}`}
            className="text-gray-500 hover:text-white"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLanguage} />
          </Link>
        )}

        <Link
          href={`/nmm/${encodeURIComponent(
            // toggleLoops.length
            //   ? toggleLoops
            //       ?.sort((a: any, b: any) => a?.end - b?.end)
            //       ?.map((x: any) => x?.hanzi || x?.input)
            //       ?.join("")
            // :
            example?.hanzi || example?.input
          )}${example?.lang ? `?lang=${resolveLangCode(example?.lang)}` : ""}`}
          className="text-gray-500 hover:text-white"
          target="_blank"
        >
          <Icons.mandarin />
        </Link>
        <button
          onClick={() => {
            setToggleLoops((val: any) => {
              const exist = val?.find(
                (item: any) => item?.end === example?.end
              );
              if (exist) {
                return val?.filter((item: any) => {
                  return item?.end !== example?.end;
                });
              }
              return val.concat(example);
            });
          }}
        >
          <FontAwesomeIcon
            className={
              toggleLoops?.find((item: any) => item?.end === example?.end)
                ? "text-white"
                : "text-gray-500"
            }
            icon={faRepeat}
          />
        </button>
      </div>
    );
  };

  const Explanations = () => {
    return (
      <>
        {(content?.en || example?.en) && (
          <p
            className={`${
              (example?.timestamp?.[0] || example?.start) < currentTime &&
              (example?.timestamp?.[1] || example?.end) > currentTime
                ? "dark:text-gray-400"
                : "dark:text-gray-500 text-gray-500"
            } transition`}
          >
            {example?.en || content?.en}
          </p>
        )}
      </>
    );
  };

  const exampleKeys = Object.keys(example);

  const pinyinOrRoman = example?.pinyin ? "pinyin" : "roman";
  const hanziOrInput = example?.input ? "input" : "hanzi";

  return (
    <div className="w-120 px-4">
      {/* {editMode && (
        <div>
          <code>
            <pre>{JSON.stringify(example, null, 2)}</pre>
          </code>
        </div>
      )} */}
      <div className="flex items-center space-x-4">
        <div
          className={`${
            focusMode ? "text-center" : "text-left"
          } w-full ${focusMode || isVideoHidden ? "" : ""}`}
          role="button"
          onClick={() => {
            setRepeatHistories({
              contentId: contentId,
              ...example,
              input: example?.input || example?.hanzi,
              roman: example?.roman || example?.pinyin,
              createdAt: Date.now(),
            });

            playerRef.current.seekTo(
              timeStamp?.start || example?.timestamp?.[0] || example?.start,
              "seconds"
            );

            try {
              playerRef.current?.player?.player?.play();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="px-0 transition">
                {(example?.pinyin || example?.roman) && (
                  <p
                    className={`${
                      (timeStamp?.start ||
                        example?.timestamp?.[0] ||
                        example?.start) < currentTime &&
                      (timeStamp?.end ||
                        example?.timestamp?.[1] ||
                        example?.end) > currentTime
                        ? "text-rose-400"
                        : "dark:text-gray-400 text-gray-300"
                    } transition text-md text-left`}
                  >
                    {example?.pinyin || example?.roman}
                  </p>
                )}
                <div className="text-left">
                  {(example?.input || example?.hanzi || example?.nepali || "")
                    .split("")
                    .map((item: any, idx: any) => {
                      // const component = components?.find(
                      //   (char: any) => char?.hanzi === item
                      // );

                      return (
                        <span
                          key={`${JSON.stringify(item)}-${idx}-${Math.random()}`}
                          className={`${
                            (timeStamp?.start ||
                              example?.timestamp?.[0] ||
                              example?.start) < currentTime &&
                            (timeStamp?.end ||
                              example?.timestamp?.[1] ||
                              example?.end) > currentTime
                              ? "text-rose-400"
                              : learnedCharacters?.find(
                                    (char: any) => char?.hanzi === item
                                  )
                                ? "dark:text-gray-200"
                                : "dark:text-gray-300 text-gray-300"
                          } transition text-md`}
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-black border-gray-800 p-4">
                <Explanations />

                <div className="mt-4">
                  <ConfigButtons />
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Explanations />
        </div>

        <div>
          <ConfigButtons />

          <div className="flex text-gray-400 text-[12px] items-center justify-end space-x-2">
            <Icons.music />
            <p className="font-extralight">{totalRepeats?.length}</p>
          </div>
        </div>
      </div>
      <div className="mt-4"> </div>

      {editMode && (
        <input
          className="w-full"
          value={timeStamp?.[pinyinOrRoman] || example?.[pinyinOrRoman]}
          onChange={(event) => {
            setTimer(pinyinOrRoman, event?.target?.value);
          }}
        />
      )}
      {(timeStamp?.hanzi || example?.hanzi) && editMode && (
        <input
          className="w-full"
          value={timeStamp?.hanzi || example?.hanzi}
          onChange={(event) => {
            setTimer("hanzi", event?.target?.value);
          }}
        />
      )}
      {(timeStamp?.input || example?.input) && editMode && (
        <input
          className="w-full"
          value={timeStamp?.input || example?.input}
          onChange={(event) => {
            setTimer("input", event?.target?.value);
          }}
        />
      )}

      {editMode && (
        <input
          className="w-full"
          value={timeStamp?.en || example?.en}
          onChange={(event) => {
            setTimer("en", event?.target?.value);
          }}
        />
      )}

      {editMode && (
        <div className="flex text-gray-400 text-[12px] items-center justify-end space-x-2">
          <div>
            <input
              value={timeStamp?.start || example?.start}
              onChange={(event) => {
                setTimer("start", event?.target?.value);
              }}
            />
            <button
              onClick={() => {
                setTimer("start");
              }}
            >
              Set Start{" "}
            </button>
          </div>

          <div>
            <input
              value={timeStamp?.end || example?.end}
              onChange={(event) => {
                setTimer("end", event?.target?.value);
              }}
            />

            <button
              onClick={() => {
                setTimer("end");
              }}
            >
              {" "}
              Set End{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
