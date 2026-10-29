"use client";

import { useMemo, useState } from "react";

import { getRandomWords } from "@/app/review/review-cloze/utils/get-random-words";
import { shuffleArray } from "@/app/review/review-cloze/utils/shuffle-array";
import { DynoOptionsContainer } from "@/components/dyno-cloze-core/dyno-cloze-core";
import { DynaClozeHeader } from "@/components/dyno-cloze-core/dyna-cloze-header";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

import {
  exampleLang,
  exampleTranscriptions,
  exampleVocabulary,
  splitLineWords,
} from "../example-content";
import { useShowcaseSettings } from "./use-showcase-settings";

/** The line the cloze drills — the chorus, so it is worth learning by heart. */
const line =
  exampleTranscriptions.find((entry) => entry.input.includes("街头走一走")) ??
  exampleTranscriptions[0];

/**
 * Dyna-cloze, the app's own: `DynaClozeHeader` hides one word of the line and
 * `DynoOptionsContainer` offers it back among three other words from the
 * content. The options, the feedback colours and the transport are the ones the
 * cloze screens use — the sentence and its words come from the transcript.
 */
export const ClozeStage = () => {
  useShowcaseSettings();

  const [wordIndex, setWordIndex] = useState(0);
  const [response, setResponse] = useState<any>(null);

  const words = useMemo(
    () => (line ? splitLineWords(line.input) : []),
    [],
  );

  const word = words[wordIndex] ?? "";

  const hidden = useMemo(() => {
    if (!line || !word) {
      return line?.input ?? "";
    }

    return line.input.replaceAll(word, "__".repeat(word.length));
  }, [word]);

  const options = useMemo(() => {
    if (!word) {
      return [];
    }

    // Another word of the content as a distractor; `en` carries the word itself
    // so the answer can be compared the way the cloze compares it.
    const distractors = getRandomWords(
      exampleVocabulary
        .filter((entry) => entry.hanzi !== word)
        .map((entry) => ({ hanzi: entry.hanzi, input: entry.hanzi, en: entry.hanzi })),
      3,
    );

    return shuffleArray([
      { hanzi: word, input: word, en: word },
      ...distractors,
    ]);
  }, [word]);

  if (!line) {
    return null;
  }

  const isCorrect = (option: any) => option?.en === word;

  return (
    <div>
      <DynaClozeHeader
        response={response}
        sentence={{
          hanzi: line.input,
          hanziHidden: hidden,
          pinyin: line.pinyin,
          lang: exampleLang,
          en: line.en,
          chinglish: line.chinglish,
        }}
      />

      <DynoOptionsContainer>
        {options.map((option: any, index: number) => (
          <button
            key={`dynacloze-${index}-${option.hanzi}`}
            disabled={!!response}
            onClick={() =>
              setResponse({
                type: isCorrect(option) ? "correct" : "incorrect",
                answer: option,
              })
            }
            className={cn(
              "border-orange-400 text-black border-[2px] p-2 dark:text-white text-lg block text-center",
              response
                ? isCorrect(option)
                  ? response.type === "correct"
                    ? "bg-green-500 border-green-600 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600 border-red-500"
                  : "bg-gray-800 opacity-10 text-gray-200 border-gray-500"
                : "hover:bg-orange-500 hover:text-white hover:scale-110",
              "transition",
            )}
          >
            <span className="block">{option.hanzi}</span>
          </button>
        ))}
      </DynoOptionsContainer>

      <div className="flex justify-center items-center mt-12 gap-12 text-2xl">
        <button
          onClick={() => {
            setResponse(null);
            setWordIndex((current) => Math.max(current - 1, 0));
          }}
          className={wordIndex === 0 ? "text-gray-500" : ""}
        >
          <Icons.arrowLeft />
        </button>

        <button
          onClick={() => {
            setResponse(null);
            setWordIndex((current) =>
              current === words.length - 1 ? 0 : current + 1,
            );
          }}
        >
          <Icons.arrowDown />
        </button>

        <button
          onClick={() => {
            setResponse(null);
            setWordIndex((current) => Math.min(current + 1, words.length - 1));
          }}
          className={wordIndex === words.length - 1 ? "text-gray-500" : ""}
        >
          <Icons.arrowRight />
        </button>
      </div>
    </div>
  );
};
