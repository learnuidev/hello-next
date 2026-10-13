"use client";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { ReaderDynocloze } from "@/app/(auth)/reader/components/reader-dynocloze";
import { ReaderFocusedRead } from "@/app/(auth)/reader/components/reader-focused-read";
import { ReaderSideDock } from "@/app/(auth)/reader/components/reader-side-dock";
import { ReaderInsights } from "@/app/(auth)/reader/components/reader-insights";
import { useReaderStore } from "@/app/(auth)/reader/hooks/use-reader-store";
import { useReaderInteractionsSync } from "@/app/(auth)/reader/hooks/use-reader-interactions-sync";
import { ReaderSnippetLine } from "@/app/(auth)/reader/reader.types";
import { splitReaderSentences } from "@/app/(auth)/reader/utils/split-reader-sentences";
import { Icons } from "@/components/ui/icons.v2";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

type ConvoReaderMode = "focused" | "read" | "dynocloze" | "insights";

const MODES: { id: ConvoReaderMode; title: string; Icon: any }[] = [
  { id: "focused", title: "Focused read", Icon: Icons.glassesRound },
  { id: "read", title: "Read", Icon: Icons.bookOpen },
  { id: "dynocloze", title: "Dynocloze", Icon: Icons.play },
  { id: "insights", title: "Insights", Icon: Icons.chartColumn },
];

/**
 * The reader app, opened on a convo's transcript.
 *
 * The same reading surfaces the `/reader` library uses — focused read, the full
 * text, dynocloze and the insights — fed by the convo's transcriptions instead
 * of a saved reader text. The lines are joined into one text, and anything the
 * reader picks out is filed on the reading list pointing back at this convo.
 */
export const ReaderContentView = ({ contentId }: { contentId: string }) => {
  const { data: content, isLoading } = useGetContentQuery({ contentId });

  const [mode, setMode] = useState<ConvoReaderMode>("focused");

  const saveToReadingList = useReaderStore((state) => state.saveToReadingList);

  useReaderInteractionsSync();

  const text = useMemo(
    () =>
      (content?.transcriptions || [])
        .map((transcription: any) =>
          (transcription?.input || transcription?.hanzi || "").trim(),
        )
        .filter(Boolean)
        .join("\n"),
    [content],
  );

  const lang = content?.lang || "zh";

  // The transcript's own line pinyin, keyed by the sentence the reader splits
  // out of it — so the reader can show the real reading rather than a pinyin-pro
  // guess when read mode is off.
  const linePinyinBySentence = useMemo(() => {
    const bySentence = new Map<string, string>();

    (content?.transcriptions || []).forEach((transcription: any) => {
      const sentenceText = (
        transcription?.input ||
        transcription?.hanzi ||
        ""
      ).trim();
      const pinyin = transcription?.pinyin || transcription?.roman || "";

      if (!sentenceText) {
        return;
      }

      splitReaderSentences(sentenceText, lang).forEach((sentence) => {
        if (sentence && pinyin) {
          bySentence.set(sentence, pinyin);
        }
      });
    });

    return bySentence;
  }, [content, lang]);

  const getLinePinyin = useMemo(
    () => (sentence: string) => linePinyinBySentence.get(sentence) || "",
    [linePinyinBySentence],
  );

  const saveSnippet = (snippetText: string, line?: ReaderSnippetLine) => {
    if (!snippetText.trim()) {
      return;
    }

    saveToReadingList({
      text: snippetText,
      readerItemId: contentId,
      readerItemTitle: content?.title || "Convo",
      kind: "convo",
      ...(line ? { line } : {}),
    });
  };

  if (isLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  return (
    <main>
      <div
        className={cn(
          "m-auto px-4 md:px-12",
          mode === "insights"
            ? "w-full max-w-screen-2xl lg:px-20"
            : "max-w-3xl",
        )}
      >
        <div className="mt-12 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mt-2">{content?.title}</h1>
            <p className="text-xs text-gray-500 font-light mt-2 uppercase tracking-wider">
              <span>Reader</span>
              <span> · </span>
              <span>{text ? text.length : 0} characters</span>
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
              readerItemId={contentId}
              readerItemTitle={content?.title || "Convo"}
              text={text}
              lang={lang}
              onSaveSnippet={saveSnippet}
              snippetKind="convo"
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
              readerItemId={contentId}
              readerItemTitle={content?.title || "Convo"}
              text={text}
              lang={lang}
              snippetKind="convo"
              getLinePinyin={getLinePinyin}
            />
          </div>
        )}

        {mode === "insights" && (
          <ReaderInsights readerItemId={contentId} text={text} lang={lang} />
        )}
      </div>

      <ReaderSideDock
        showTranslate={mode === "focused" || mode === "dynocloze"}
      />
    </main>
  );
};
