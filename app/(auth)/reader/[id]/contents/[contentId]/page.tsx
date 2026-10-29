"use client";

import { Nothing } from "@/app/nmm/nothing";
import { FloatingNavbar } from "@/components/floating-navbar";
import { Icons } from "@/components/ui/icons.v2";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { useGetReaderItemQuery } from "@/domain/reader/use-get-reader-item";
import { cn } from "@/lib/utils";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { getReaderViewHref } from "../../../reader.types";
import { readerCard, readerCardFull } from "../../../reader.styles";
import { detectReaderLang } from "../../../utils/detect-reader-lang";
import { getReaderPinyin } from "../../../utils/get-reader-pinyin";
import { highlightReaderWord } from "../../../utils/highlight-reader-word";
import { splitReaderSentences } from "../../../utils/split-reader-sentences";

/** Next decodes route params, but a `%` in the word itself must not throw. */
const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

/**
 * One word of a text, and every line of that text that says it.
 *
 * The page is the bridge between reading and looking something up: the word
 * itself is the way into nmm, and each line is the way back into the text — it
 * opens focused read on the sentence it was found in.
 */
export default function ReaderWordContents() {
  const params = useParams<{ id: string; contentId: string }>();

  const readerItemId = params?.id || "";
  const word = useMemo(
    () => (params?.contentId ? safeDecode(params.contentId) : ""),
    [params?.contentId],
  );

  const { data: item, isLoading } = useGetReaderItemQuery(readerItemId);

  const lang = useMemo(() => detectReaderLang(item?.text || ""), [item?.text]);

  const { data: meaning } = useListDiscoveryQuery({ content: word, lang });

  /** Every line of the text that says this word, with the step it is. */
  const sentences = useMemo(() => {
    if (!item?.text || !word) {
      return [];
    }

    return splitReaderSentences(item.text, lang)
      .map((sentence, index) => ({ sentence, index }))
      .filter(({ sentence }) => sentence.includes(word));
  }, [item?.text, lang, word]);

  const pinyin = meaning?.pinyin || meaning?.roman || getReaderPinyin(word);

  if (isLoading) {
    return (
      <main>
        <div className="max-w-6xl m-auto px-4 md:px-12 mt-16">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Loading…
          </p>
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main>
        <div className="max-w-6xl m-auto px-4 md:px-12">
          <Nothing icon={Icons.bookOpen} message="This text is not here">
            <Link
              href="/reader"
              className="mt-6 inline-block uppercase text-xs tracking-wider text-gray-400 border-[1px] border-gray-300 dark:border-gray-800 px-4 py-2 hover:text-rose-400 dark:hover:text-white transition"
            >
              <Icons.back className="mr-2 text-xs" />
              <span>Back to reader</span>
            </Link>
          </Nothing>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-6xl m-auto px-4 md:px-12">
        <div className="mt-12 flex items-center justify-between gap-4">
          <Link
            href={getReaderViewHref(item.id, "insights")}
            className="uppercase text-xs tracking-wider text-gray-400 hover:text-rose-400 dark:hover:text-white transition"
          >
            <Icons.back className="mr-2 text-xs" />
            <span>Insights</span>
          </Link>

          <p className="truncate text-xs uppercase tracking-wider text-gray-400">
            {item.title}
          </p>
        </div>

        {/* The word itself: its reading, what it means, and the way into nmm. */}
        <div className={cn(readerCardFull, "mt-8 p-6")}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <Link
              href={getNmmLink({ id: word, lang })}
              className="text-4xl font-bold text-gray-800 transition hover:text-rose-400 dark:text-gray-100"
            >
              {word}
            </Link>

            {!!pinyin && (
              <span className="text-lg font-light text-gray-500">{pinyin}</span>
            )}
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-gray-700 dark:text-gray-300">
              {meaning?.en || (meaning ? "" : "looking it up…")}
            </p>

            {!!meaning?.chinglish && (
              <p className="text-sm italic text-gray-500">
                {meaning.chinglish}
              </p>
            )}
          </div>

          <Link
            href={getNmmLink({ id: word, lang })}
            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 transition hover:text-rose-400"
          >
            <Icons.externalLink className="text-sm" />
            <span>Look up in nmm</span>
          </Link>
        </div>

        {/* Every line of the text that says it. */}
        <h2 className="mt-10 text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>Sentences</span>
          <span className="ml-2 text-gray-400">{sentences.length}</span>
        </h2>

        {sentences.length === 0 ? (
          <p className="my-16 text-center text-gray-500 font-extralight">
            This word is not in any line of the text any more.
          </p>
        ) : (
          <div className="mt-4 mb-32 space-y-3">
            {sentences.map(({ sentence, index }) => (
              <Link
                key={`${index}-${sentence}`}
                href={`${getReaderViewHref(item.id, "focused")}?sentenceIndex=${index}`}
                className={cn(
                  readerCard,
                  "block rounded-xl p-4 text-base leading-8 text-gray-700 transition hover:text-rose-400 dark:text-gray-200",
                )}
              >
                {highlightReaderWord(sentence, word)}
              </Link>
            ))}
          </div>
        )}
      </div>

      <FloatingNavbar />
    </main>
  );
}
