import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faLanguage, faRepeat } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { cn } from "@/lib/utils";
import { europeanLangs } from "@/libs/constants/european-langs";
import { resolveLangCode } from "@/libs/openai/utils";
import { useParams, useRouter } from "next/navigation";
import {
  isNonRomanLang,
  isRomanLang,
} from "../_select-character/utils/is-non-roman-lang";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { Icons } from "../ui/icons.v2";
import { useWordsClickedHistoryStore } from "./hooks/use-words-clicked-history-state";
import { useContentEditStore } from "./use-content-edit-store";
import { smartSplit } from "./utils/smart-split";
import { useAdaptive } from "@/libs/adaptive/adaptive-provider";
import { mandoEventIds } from "@/libs/adaptive/mando-event-ids";

export const TranscriptItem = ({
  example,
  toggleLoops,
  setToggleLoops,
  currentTime,
  focusMode,
  isVideoHidden,
  playerRef,
  learnedCharacters,
  contentId,
  // components,
}: any) => {
  const params = useParams<{ "content-id": string }>();

  const { adaptive } = useAdaptive();

  const setWords = useWordsClickedHistoryStore((state) => state.setHistory);

  const { data } = useGetContentQuery({ contentId });

  const setIfExists = useSetIfExists();

  const editMode = useContentEditStore((state) => state.editMode);
  const setEditMode = useContentEditStore((state) => state.setEditMode);

  const times = useContentEditStore((state) => state.times);
  const setTimes = useContentEditStore((state) => state.setTimes);
  const router = useRouter();

  const deleteTranscription = (id: string) => {
    setTimes((prev: any) => prev.filter((item: any) => item.id !== id));
  };

  const finalTranscriptions = editMode
    ? data?.transcriptions
    : data?.transcriptions;

  const setTimer = (
    type: "start" | "end" | "pinyin" | "hanzi" | "roman" | "en" | "input",
    newValue?: string
  ) => {
    const offset = newValue || playerRef?.current?.getCurrentTime();

    setTimes((prev: any) => {
      const predicateFn = (item: any) => item?.id === example?.id;
      const exists = prev?.find(predicateFn);

      if (exists && exists?.contentId) {
        const updated = prev.map((item: any) => {
          if (item?.id === example?.id) {
            return {
              ...exists,
              [type]: offset,
            };
          }

          return item;
        });

        return updated;
      }

      let updated = prev;

      const currIndex = finalTranscriptions?.findIndex(predicateFn);

      const isLast = finalTranscriptions?.length - 1 === currIndex;

      if (!isLast && type === "end") {
        const nextIndex = currIndex + 1;
        const nextExample = finalTranscriptions?.[nextIndex];
        const nextExists = prev?.find(
          (item: any) => item?.id === nextExample?.id
        );

        if (nextExists) {
          updated = updated.map((item: any) => {
            if (item?.id === nextExample?.id) {
              return {
                ...nextExists,
                ["start"]: offset,
              };
            }

            return item;
          });
        } else {
          updated = updated.concat({
            id: nextExample?.id,
            start: offset,
          });
        }
      }

      if (exists) {
        updated = updated.map((item: any) => {
          if (item?.id === example?.id) {
            return {
              ...exists,
              [type]: offset,
            };
          }

          return item;
        });
      }

      updated = updated.concat({
        id: example?.id,
        [type]: offset,
      });

      return updated;
    });
  };

  const timeStamp = times?.find((time: any) => time?.id === example?.id) as any;

  const { data: contents } = useListCharactersQuery() as any;

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
  const totalRepeats = [
    ...new Set(
      histories
        ?.filter((history: any) => {
          return (
            history?.contentId === contentId &&
            history?.input === (example?.input || example?.hanzi)
          );
        })
        .map((x: any) => parseInt(`${x.createdAt}`.slice(0, -3)))
    ),
  ].map((x) => x);

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
              : example?.input || example?.hanzi
          )}&op=translate`}
          className="text-gray-500 hover:text-red-500 dark:hover:text-white"
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
                : example?.input || example?.hanzi
            )}`}
            className="text-gray-500 hover:text-red-500 dark:hover:text-white"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLanguage} />
          </Link>
        )}

        <Link
          onClick={() => {
            setIfExists({ ...example, contentId });
          }}
          href={`/nmm/${encodeURIComponent(
            // toggleLoops.length
            //   ? toggleLoops
            //       ?.sort((a: any, b: any) => a?.end - b?.end)
            //       ?.map((x: any) => x?.hanzi || x?.input)
            //       ?.join("")
            // :
            example?.input || example?.hanzi
          )}${example?.lang ? `?lang=${resolveLangCode(example?.lang)}` : ""}`}
          className="text-gray-500 hover:text-red-500 dark:hover:text-white"
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
              return val.concat({ ...example, contentId });
            });
          }}
        >
          <FontAwesomeIcon
            className={
              toggleLoops?.find((item: any) => item?.end === example?.end)
                ? "dark:text-white text-black"
                : "dark:text-gray-500 text-gray-400"
            }
            icon={faRepeat}
          />
        </button>
        {editMode && (
          <button
            onClick={() => {
              deleteTranscription(example.id);
            }}
          >
            <Icons.trash
              className={
                toggleLoops?.find((item: any) => item?.end === example?.end)
                  ? "dark:text-white text-black"
                  : "dark:text-gray-500 text-gray-400"
              }
              icon={faRepeat}
            />
          </button>
        )}
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
                ? "dark:text-gray-400 text-rose-400"
                : "dark:text-gray-500 text-gray-500"
            } transition`}
          >
            {example?.en || content?.en}
          </p>
        )}
      </>
    );
  };

  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  return (
    <div className="w-120 px-4">
      <div className="flex items-center space-x-4">
        <div
          className={`${
            focusMode ? "text-center" : "text-left"
          } w-full ${focusMode || isVideoHidden ? "" : ""}`}
          role="button"
          onClick={() => {
            adaptive(mandoEventIds.clickedOnTranscript.id, {
              contentId,
              transcriptId: example?.id,
              input: example?.input || example?.hanzi,
            });
            // setNewContextId();
            setRepeatHistories({
              contentId: contentId,
              ...example,
              input: example?.input || example?.hanzi,
              roman: example?.roman || example?.pinyin,
              createdAt: Date.now(),
            });

            const startTime =
              timeStamp?.start || example?.timestamp?.[0] || example?.start;

            router.push(`/convos/${contentId}?start=${startTime}`);

            playerRef.current.seekTo(startTime, "seconds");

            try {
              playerRef.current?.player?.player?.play();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {isNonRomanLang(example?.lang) &&
            showPinyin &&
            (example?.pinyin || example?.roman) && (
              <p
                className={`${
                  (timeStamp?.start ||
                    example?.timestamp?.[0] ||
                    example?.start) < currentTime &&
                  (timeStamp?.end || example?.timestamp?.[1] || example?.end) >
                    currentTime
                    ? "text-rose-400"
                    : "dark:text-gray-400 text-gray-300"
                } transition text-md text-left text-gray-500`}
              >
                {example?.lang === "zh" ? example?.pinyin : example?.roman}
              </p>
            )}
          <div className="text-left">
            {smartSplit({
              input: example?.input || example?.hanzi,
              lang: example?.lang,
            }).map((item: any, idx: any) => {
              const isInTimeRange =
                (timeStamp?.start ??
                  example?.timestamp?.[0] ??
                  example?.start) < currentTime &&
                (timeStamp?.end ?? example?.timestamp?.[1] ?? example?.end) >
                  currentTime;

              const isLearned = learnedCharacters?.find(
                (char: any) => char?.hanzi === item
              );

              return (
                <span
                  key={`${JSON.stringify(item)}-${idx}-${Math.random()}-todo`}
                  className={cn("transition text-md", {
                    "text-rose-400": isInTimeRange,
                    "dark:text-gray-200": !isInTimeRange && isLearned,
                    "dark:text-gray-300 text-black":
                      !isInTimeRange && !isLearned,
                    "text-xl": isRomanLang(example?.lang),
                  })}
                  onClick={() => {
                    setWords({
                      word: item,
                      transcriptionId: example?.id,
                      contentId,
                    });
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>

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

      {example?.lang !== "zh"
        ? null
        : editMode && (
            <input
              className="w-full"
              value={timeStamp?.["pinyin"] || example?.pinyin}
              onChange={(event) => {
                setTimer("pinyin", event?.target?.value);
              }}
            />
          )}
      {europeanLangs?.includes(example?.lang) || example.lang === "zh"
        ? null
        : editMode && (
            <input
              className="w-full"
              value={timeStamp?.["roman"] || example?.roman}
              onChange={(event) => {
                setTimer("roman", event?.target?.value);
              }}
            />
          )}
      {europeanLangs?.includes(example?.lang)
        ? null
        : (timeStamp?.hanzi || example?.hanzi) &&
          editMode && (
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
