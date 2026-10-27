"use client";

import { ReaderDynocloze } from "@/app/(auth)/reader/components/reader-dynocloze";
import { ReaderFocusedRead } from "@/app/(auth)/reader/components/reader-focused-read";
import { ReaderInsights } from "@/app/(auth)/reader/components/reader-insights";
import { useReaderInteractionsSync } from "@/app/(auth)/reader/hooks/use-reader-interactions-sync";
import { splitReaderSentences } from "@/app/(auth)/reader/utils/split-reader-sentences";
import { Icons } from "@/components/ui/icons.v2";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

import { useGetCharacterLearningContext } from "./use-get-character-learning-context";

/** The reading surfaces a character can be read in, as the reader offers them. */
type CharacterReaderMode = "focused" | "read" | "dynocloze" | "insights";

const MODES: { id: CharacterReaderMode; title: string; Icon: any }[] = [
  { id: "focused", title: "Focused read", Icon: Icons.glassesRound },
  { id: "read", title: "Read", Icon: Icons.bookOpen },
  { id: "dynocloze", title: "Dynocloze", Icon: Icons.play },
  { id: "insights", title: "Insights", Icon: Icons.chartColumn },
];

/**
 * What the reading ledger files this page's lookups and bookmarks under.
 *
 * The ledger knows two kinds of surface: a saved reader text, and one that is
 * not a text of the reader's own. Only the second kind sends a tapped word to
 * nmm (`getReaderWordHref`), which is exactly where a word tapped here should
 * lead — so this page files itself as that kind, and says so in one place
 * instead of on four props.
 */
const readerSnippetKind = "convo" as const;

/**
 * The reader, opened on a character or word's own sentences.
 *
 * Every example the app has of this word — the lines it is said in inside the
 * convo library, then the dictionary's own examples — is gathered into one text,
 * one line per sentence, and handed to the same reading surfaces `/reader` uses:
 * focused read, the whole text at once, dynocloze, and the insights.
 *
 * The word is the reader item: what is looked up and what is bookmarked while
 * reading it is filed against the word itself, so the same reading list follows
 * the word wherever it is opened from.
 */
export const CharacterReaderView = ({
  characterId,
  lang: langProp,
}: {
  characterId: string;
  lang?: string;
}) => {
  const lang = langProp || "zh";

  const [mode, setMode] = useState<CharacterReaderMode>("focused");

  // Bookmarks and lookups kept here sync back to the account like the reader's
  // own, so a word saved while reading is on the reading list everywhere.
  useReaderInteractionsSync();

  const { data: meaning } = useListDiscoveryQuery({
    content: characterId,
    lang,
  });

  // The lines this word is said in across the convo library — the same examples
  // the overview's "Content Examples" tab lists.
  const contentSentences = useGetCharacterLearningContext({
    lang,
    characterId,
  });

  // …and the dictionary's own examples, for a word the library has never said.
  const { data: dictionarySentences } = useListSentencesQuery({
    component: characterId,
    lang,
  });

  /**
   * The text to read: every example once, the word's real lines before the
   * generated ones, with the reading each one came with kept beside it so the
   * stage can show a transcript's pinyin rather than guess at it.
   */
  const lines = useMemo(() => {
    const seen = new Set<string>();
    const gathered: { text: string; pinyin: string }[] = [];

    [...(contentSentences || []), ...(dictionarySentences || [])].forEach(
      (item: any) => {
        const text = (item?.hanzi || item?.input || "").trim();

        if (!text || seen.has(text)) {
          return;
        }

        seen.add(text);

        gathered.push({ text, pinyin: item?.pinyin || item?.roman || "" });
      },
    );

    // A word looked up as a sentence has no examples of its own: the sentence is
    // what there is to read.
    if (!gathered.length && characterId.trim().length > 4) {
      gathered.push({ text: characterId.trim(), pinyin: "" });
    }

    return gathered;
  }, [contentSentences, dictionarySentences, characterId]);

  const text = useMemo(
    () => lines.map(({ text }) => text).join("\n"),
    [lines],
  );

  // The transcript's own line pinyin, keyed by the sentence the reader splits
  // out of it — so read mode off shows the real reading, not a pinyin-pro guess.
  const linePinyinBySentence = useMemo(() => {
    const bySentence = new Map<string, string>();

    lines.forEach(({ text, pinyin }) => {
      if (!pinyin) {
        return;
      }

      splitReaderSentences(text, lang).forEach((sentence) => {
        if (sentence) {
          bySentence.set(sentence, pinyin);
        }
      });
    });

    return bySentence;
  }, [lines, lang]);

  const getLinePinyin = useMemo(
    () => (sentence: string) => linePinyinBySentence.get(sentence) || "",
    [linePinyinBySentence],
  );

  if (!text) {
    return (
      <div className="mt-16 mb-32 text-center text-gray-500 font-extralight">
        <p>There are no sentences to read this word in yet.</p>
      </div>
    );
  }

  return (
    <main>
      {/* The insights want the whole width, the way a lesson's analytics does;
          reading stays at a comfortable measure. */}
      <div
        className={cn(
          "m-auto",
          mode === "insights"
            ? "w-full max-w-screen-2xl lg:px-20"
            : "max-w-3xl",
        )}
      >
        <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              <span>{characterId}</span>

              {!!meaning?.pinyin && (
                <span className="ml-3 text-base font-light text-gray-500">
                  {meaning.pinyin}
                </span>
              )}
            </h1>

            <p className="text-xs text-gray-500 font-light mt-2 uppercase tracking-wider">
              <span>Reader</span>
              <span> · </span>
              <span>
                {lines.length} {lines.length === 1 ? "sentence" : "sentences"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1 border-[1px] border-gray-200 dark:border-gray-800 rounded-full px-1 py-1">
            {MODES.map(({ id, title, Icon }) => (
              <button
                key={id}
                title={title}
                onClick={() => {
                  setMode(id);
                }}
                className={cn(
                  "transition text-lg px-3 py-1.5 rounded-full",
                  mode === id
                    ? "text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-900"
                    : "text-gray-400 hover:text-rose-400",
                )}
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>

        {mode === "focused" && (
          <div className="mb-32">
            <ReaderFocusedRead
              readerItemId={characterId}
              readerItemTitle={characterId}
              text={text}
              lang={lang}
              snippetKind={readerSnippetKind}
              getLinePinyin={getLinePinyin}
            />
          </div>
        )}

        {mode === "read" && (
          <p className="mt-12 mb-32 whitespace-pre-wrap break-words text-lg font-extralight leading-9 text-gray-800 dark:text-gray-200">
            {text}
          </p>
        )}

        {mode === "dynocloze" && (
          <div className="mb-32">
            <ReaderDynocloze
              readerItemId={characterId}
              readerItemTitle={characterId}
              text={text}
              lang={lang}
              snippetKind={readerSnippetKind}
              getLinePinyin={getLinePinyin}
            />
          </div>
        )}

        {mode === "insights" && (
          <ReaderInsights
            readerItemId={characterId}
            text={text}
            lang={lang}
            kind={readerSnippetKind}
          />
        )}
      </div>
    </main>
  );
};
