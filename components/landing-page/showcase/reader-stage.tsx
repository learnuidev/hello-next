"use client";

import { ReaderFocusedRead } from "@/app/(auth)/reader/components/reader-focused-read";

import {
  exampleContent,
  exampleLang,
  exampleLinePinyin,
  exampleReaderText,
  exampleTranscriptions,
} from "../example-content";
import { useShowcaseSettings } from "./use-showcase-settings";

/**
 * The reader app — `ReaderFocusedRead` — reading the example transcript as one
 * text, with the transcript's own pinyin rather than a guess, and the timings
 * the lines carry.
 */
export const ReaderStage = () => {
  useShowcaseSettings();

  return (
    <ReaderFocusedRead
      readerItemId="landing-demo"
      readerItemTitle={exampleContent.title}
      text={exampleReaderText}
      lang={exampleLang}
      lineTimestamps={exampleTranscriptions.map((line) => line.start)}
      getLinePinyin={(sentence) => exampleLinePinyin.get(sentence) ?? ""}
    />
  );
};
