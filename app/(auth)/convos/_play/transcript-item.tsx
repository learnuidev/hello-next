"use client";

import { useRepeatHistoryStore } from "./use-repeat-history";

import React from "react";

import { Transcription } from "@/domain/transcribe/transcribe.types";

import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRouter } from "next/navigation";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import Link from "next/link";

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
  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  // const { data } = useListGrammarsQuery({ content: transcription?.hanzi });

  const router = useRouter();

  console.log("AUDIO URL", audioUrl);

  if (audioUrl) {
    return (
      <div
        role="button"
        className={`text-center space-y-2 ${
          transcription.start < currentTime && transcription.end > currentTime
            ? "text-yellow-500"
            : ""
        }`}
        onClick={() => {
          if (audioUrl) {
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
          } else {
            router.push(
              `/nmm/${transcription.hanzi || transcription.input}` + lang
                ? `?lang=${lang}`
                : ""
            );
          }
        }}
      >
        <p className={""}>{transcription?.hanzi || transcription?.input}</p>
        {pinyinMode ? (
          <>
            <p className="dark:text-gray-400 text-md">
              {transcription?.pinyin || transcription?.roman}
            </p>
            {/* <HoverCard>
              <HoverCardTrigger>
                <p className="dark:text-gray-400 text-md">
                  {transcription?.pinyin || transcription?.roman}
                </p>
              </HoverCardTrigger>
  
              <HoverCardContent>TODO</HoverCardContent>
            </HoverCard> */}
            <p className="dark:text-gray-300 text-md">{transcription?.en}</p>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <Link
      className={`block text-center space-y-2 ${
        transcription.start < currentTime && transcription.end > currentTime
          ? "text-yellow-500"
          : ""
      }`}
      target={"_blank"}
      href={`/nmm/${transcription.hanzi || transcription.input}${
        lang ? `?lang=${lang}` : ""
      }`}
    >
      <p className={""}>{transcription?.hanzi || transcription?.input}</p>
      {pinyinMode ? (
        <>
          <p className="dark:text-gray-400 text-md">
            {transcription?.pinyin || transcription?.roman}
          </p>
          {/* <HoverCard>
            <HoverCardTrigger>
              <p className="dark:text-gray-400 text-md">
                {transcription?.pinyin || transcription?.roman}
              </p>
            </HoverCardTrigger>

            <HoverCardContent>TODO</HoverCardContent>
          </HoverCard> */}
          <p className="dark:text-gray-300 text-md">{transcription?.en}</p>
        </>
      ) : null}
    </Link>
  );
};
