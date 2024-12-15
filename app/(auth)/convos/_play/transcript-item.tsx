"use client";

import { useRepeatHistoryStore } from "./use-repeat-history";
import React from "react";
import { Transcription } from "@/domain/transcribe/transcribe.types";
import { useRouter } from "next/navigation";

import { Icons } from "@/components/ui/icons.v2";
import { useSpeak } from "./use-speak";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";

export const TranscriptItem = ({
  transcription,
  currentTime,
  lessonId,
  pinyinMode,
  audioUrl,
  seek,
  lang,
}: {
  transcription: Transcription;
  currentTime: number;
  lessonId: number;
  pinyinMode: boolean;
  audioUrl: string;
  seek: any;
  lang?: string;
}) => {
  const { speak } = useSpeak(lang);

  const editMode = useContentEditStore((state) => state.editMode);
  const setEditMode = useContentEditStore((state) => state.setEditMode);
  const resetTimes = useContentEditStore((state) => state.resetTimes);
  const times = useContentEditStore((state) => state.times);
  const setTimes = useContentEditStore((state) => state.setTimes);

  const setTimer = (
    type: "start" | "end" | "pinyin" | "hanzi" | "roman" | "en" | "input",
    newValue?: string
  ) => {
    const offset = newValue || currentTime - 0.2;
    setTimes((prev: any) => {
      const exists = prev?.find((item: any) => item?.id === transcription?.id);

      if (exists) {
        return prev.map((item: any) => {
          if (item?.id === transcription?.id) {
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
        id: transcription?.id,
        [type]: offset,
      });
    });
  };

  const timeStamp = times?.find(
    (time: any) => time?.id === transcription?.id
  ) as any;

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  // const { data } = useListGrammarsQuery({ content: transcription?.hanzi });

  const router = useRouter();

  console.log("PINYIN", pinyinMode);

  const pinyinOrRoman = transcription?.pinyin ? "pinyin" : "roman";

  if (audioUrl) {
    return (
      <div
        role="button"
        className={`space-y-2 ${
          transcription.start < currentTime && transcription.end > currentTime
            ? "text-yellow-500"
            : ""
        }`}
        onClick={() => {
          if (audioUrl) {
            // seek(transcription?.start);

            setRepeatHistories({
              lessonId: lessonId,
              eventType: "speech/repeat",
              eventTime: new Date().getTime(),
              startTime: transcription.start,
              hanzi: transcription.hanzi,
              pinyin: transcription.pinyin,
              en: transcription.en,
              step: transcription.step,
              // item
            });
          } else {
            router.push(
              `/nmm/${transcription.hanzi || transcription.input}` + lang
                ? `?lang=${lang}`
                : ""
            );
          }
        }}
      >
        {pinyinMode ? (
          <>
            <p className="dark:text-gray-500 text-md">
              {transcription?.pinyin || transcription?.roman}
            </p>
          </>
        ) : null}

        <p className={"space-x-2 text-xl"}>
          <a
            target={"_blank"}
            href={`/nmm/${transcription.input || transcription.hanzi}${
              lang ? `?lang=${lang}` : ""
            }`}
          >
            {" "}
            {transcription?.input || transcription?.hanzi}
          </a>

          <span>
            <button
              onClick={() => {
                seek(transcription?.start);
                // speak(transcription?.hanzi || transcription?.input || "");
              }}
            >
              <Icons.volume />{" "}
            </button>{" "}
          </span>
        </p>

        {/* <p className={""}>{transcription?.hanzi || transcription?.input}</p> */}
        {pinyinMode ? (
          <>
            <p className="dark:text-gray-400 text-md">{transcription?.en}</p>
          </>
        ) : null}

        {editMode && (
          <input
            className="w-full"
            value={timeStamp?.[pinyinOrRoman] || transcription?.[pinyinOrRoman]}
            onChange={(event) => {
              setTimer(pinyinOrRoman, event?.target?.value);
            }}
          />
        )}
        {/* {(timeStamp?.hanzi || transcription?.hanzi) && editMode && (
          <input
            className="w-full"
            value={timeStamp?.hanzi || transcription?.hanzi}
            onChange={(event) => {
              setTimer("hanzi", event?.target?.value);
            }}
          />
        )} */}

        {(timeStamp?.input || transcription?.input) && editMode && (
          <input
            className="w-full"
            value={timeStamp?.input || transcription?.input}
            onChange={(event) => {
              setTimer("input", event?.target?.value);
            }}
          />
        )}

        {editMode && (
          <input
            className="w-full"
            value={timeStamp?.en || transcription?.en}
            onChange={(event) => {
              setTimer("en", event?.target?.value);
            }}
          />
        )}

        {editMode && (
          <div className="flex text-gray-400 text-[12px] items-center justify-end space-x-2">
            <div>
              <input
                value={timeStamp?.start || transcription?.start}
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
                value={timeStamp?.end || transcription?.end}
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
  }

  return (
    <div className="flex flex-row">
      <div></div>
      <div
        className={`block space-y-2 ${
          transcription.start < currentTime && transcription.end > currentTime
            ? "text-yellow-500"
            : ""
        }`}
        // target={"_blank"}
        // href={`/nmm/${transcription.hanzi || transcription.input}${
        //   lang ? `?lang=${lang}` : ""
        // }`}
      >
        {pinyinMode ? (
          <>
            <p className="dark:text-gray-500 text-md">
              {transcription?.pinyin || transcription?.roman}
            </p>
          </>
        ) : null}
        <p className={"space-x-2 text-xl"}>
          <a
            target={"_blank"}
            href={`/nmm/${transcription.input || transcription.hanzi}${
              lang ? `?lang=${lang}` : ""
            }`}
          >
            {" "}
            {transcription?.input || transcription?.hanzi}
          </a>

          <span>
            <button
              onClick={() => {
                speak(transcription?.input || transcription?.hanzi);
              }}
            >
              <Icons.volume />{" "}
            </button>{" "}
          </span>
        </p>
        {pinyinMode ? (
          <>
            <p className="dark:text-gray-400 text-md">{transcription?.en}</p>
          </>
        ) : null}
      </div>
    </div>
  );
};
