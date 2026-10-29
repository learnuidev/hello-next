"use client";

import { HanziTooltip } from "@/components/_select-character/selected-character/hanzi-tooltip";

import { exampleLang, exampleVocabulary } from "../example-content";

/**
 * The dictionary — `HanziTooltip`, the same card the reader and the player open
 * when a word is tapped, over the words this content actually uses.
 *
 * Reading and pinyin come from the transcript; the entry itself is looked up the
 * way the app always looks a word up, so it is the real dictionary and not a
 * pretend one.
 */
export const DictionaryStage = () => (
  <div className="max-w-3xl">
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-3">
      {exampleVocabulary.slice(0, 40).map((word) => (
        <HanziTooltip
          key={word.hanzi}
          component={{
            hanzi: word.hanzi,
            input: word.hanzi,
            pinyin: word.pinyin,
            en: "",
            lang: exampleLang,
          }}
          character={word.hanzi}
          lang={exampleLang}
        >
          <span className="flex cursor-help items-baseline gap-1">
            <span className="text-2xl">{word.hanzi}</span>
            <span className="font-light text-sm text-gray-400">
              {word.pinyin}
            </span>
          </span>
        </HanziTooltip>
      ))}
    </div>
  </div>
);
