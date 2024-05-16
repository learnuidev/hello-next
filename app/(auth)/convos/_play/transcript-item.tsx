"use client";

import { useRepeatHistoryStore } from "./use-repeat-history";

import React from "react";

import { Transcription } from "@/domain/transcribe/transcribe.types";

import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";

export const TranscriptItem = ({
  transcription,
  currentTime,
  lessonId,
  pinyinMode,
  seek,
}: {
  transcription: Transcription;
  currentTime: number;
  lessonId: number;
  pinyinMode: boolean;
  seek: any;
}) => {
  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  const { data } = useListGrammarsQuery({ content: transcription?.hanzi });

  return (
    <div
      role="button"
      className={`text-center space-y-2 ${
        transcription.start < currentTime && transcription.end > currentTime
          ? "text-yellow-500"
          : ""
      }`}
      onClick={() => {
        seek(transcription?.start);

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
      }}
    >
      <p className={""}>{transcription?.hanzi || transcription?.input}</p>
      {pinyinMode ? (
        <>
          <p className="dark:text-gray-400 text-md">{transcription?.pinyin}</p>
          <p className="dark:text-gray-300 text-md">{transcription?.en}</p>
        </>
      ) : null}
    </div>
  );
};
