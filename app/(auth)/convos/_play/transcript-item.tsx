"use client";

import { useRepeatHistoryStore } from "./use-repeat-history";
import React, { useEffect, useRef, useState } from "react";
import { Transcription } from "@/domain/transcribe/transcribe.types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/ui/icons.v2";

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
  const synthRef = useRef(window.speechSynthesis);

  const [voicesList, setVoicesList] = useState<any>({});

  const selecectedVoice = voicesList?.["zh-CN"]?.filter(
    (voice: any) => voice?.name === "Li-Mu"
  )?.[0] as any;

  const speak = (word: string) => {
    const utter = new SpeechSynthesisUtterance(word);

    utter.rate = 0.8;

    utter.voice = selecectedVoice?.voice;
    synthRef.current.speak(utter);
  };

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  useEffect(() => {
    setTimeout(() => {
      const voices = [...synthRef.current.getVoices()]
        .filter((x) => x.lang === "zh-CN")
        .map((item) => ({
          voice: item,
          name: item.name,
          lang: item.lang,
          voiceURI: item.voiceURI,
          localService: item.localService,
        }))
        .reduce((acc: any, curr) => {
          if (acc[curr.lang]) {
            return {
              ...acc,
              [curr.lang]: acc[curr.lang].concat(curr),
            };
          }

          return {
            ...acc,
            [curr.lang]: [curr],
          };
        }, {});

      setVoicesList(voices);
    }, 100);
  }, [synthRef]);

  // const { data } = useListGrammarsQuery({ content: transcription?.hanzi });

  const router = useRouter();

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
            href={`/nmm/${transcription.hanzi || transcription.input}${
              lang ? `?lang=${lang}` : ""
            }`}
          >
            {" "}
            {transcription?.hanzi || transcription?.input}
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
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center items-center space-x-4">
      <div></div>
      <div
        className={`block text-center space-y-2 ${
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
            href={`/nmm/${transcription.hanzi || transcription.input}${
              lang ? `?lang=${lang}` : ""
            }`}
          >
            {" "}
            {transcription?.hanzi || transcription?.input}
          </a>

          <span>
            <button
              onClick={() => {
                speak(transcription?.hanzi || transcription?.input || "");
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
