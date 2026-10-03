"use client";

import { useReadModeState } from "@/components/read-mode-button";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { useReaderStore } from "../hooks/use-reader-store";
import { getReaderPinyin } from "../utils/get-reader-pinyin";
import { isHanCharacter } from "../utils/is-han-character";
import { ReaderWord, segmentReaderWords } from "../utils/segment-reader-text";
import { splitReaderSentences } from "../utils/split-reader-sentences";
import { ReaderCharacter, useReaderCharacterMaps } from "./reader-character";
import { ReaderMiniDictionary } from "./reader-mini-dictionary";

/**
 * Focused read: one line at a time, big and centred, in a stage of its own.
 *
 * Nothing else of the text is on the page. The line before and the line after
 * are not dimmed around it, nothing moves between lines, nothing fades: the
 * reader gets the line they are on, and stepping replaces it.
 *
 * What also does not move is everything around the line. The stage holds a
 * height of its own, so the progress bar above it and the arrows and buttons
 * below it stay exactly where they are, whether the line is short or long — a
 * view whose controls jump about as the text changes length is a view you have
 * to chase.
 *
 * The words are the interactive part: tapping them picks them out (the same
 * selection read mode uses) and the bar below files the pick — or the whole
 * line — into the reading list. The arrows and the keyboard step through the
 * text. The line in the middle is asked about as it arrives, so its translation
 * is usually there by the time the reader wants it.
 *
 * Read mode spaces the words out and pinyin hangs a reading over every one of
 * them; characters come from the reader's own character maps rather than a
 * `CharacterItem` each, and the line you stop on is remembered per text.
 */
export const ReaderFocusedRead = ({
  readerItemId,
  readerItemTitle,
  text,
  lang,
  onSaveSnippet,
}: {
  readerItemId: string;
  readerItemTitle: string;
  text: string;
  lang: string;
  onSaveSnippet: (text: string) => void;
}) => {
  const sentences = useMemo(
    () => splitReaderSentences(text, lang),
    [text, lang],
  );

  const readingPositions = useReaderStore((state) => state.readingPositions);
  const setReadingPosition = useReaderStore(
    (state) => state.setReadingPosition,
  );

  const { readMode } = useReadModeState();
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const showEn = useBrightModeStore((state) => state.showEn);
  const { showChinglish } = useChinglishState();

  const [showParent, setShowParent] = useState(false);
  // The word the mini dictionary is open on.
  const [tappedWord, setTappedWord] = useState<{
    text: string;
    key: string;
  } | null>(null);

  /**
   * Whatever is highlighted in the line is what the dictionary opens on: a
   * word tapped, or a run of text dragged over with the mouse. The highlight
   * is the source of truth, so the dictionary can never be showing something
   * other than what is lit up.
   */
  const lookUpSelection = () => {
    const highlighted = window.getSelection()?.toString().trim();

    if (highlighted) {
      setTappedWord({ text: highlighted, key: "" });
    }
  };

  const lastIndex = Math.max(sentences.length - 1, 0);

  const [index, setIndex] = useState(readingPositions?.[readerItemId] || 0);
  const currentIndex = Math.min(index, lastIndex);

  const currentSentence = sentences[currentIndex] || "";
  const words = useMemo(
    () => segmentReaderWords(currentSentence, lang),
    [currentSentence, lang],
  );

  /**
   * The parent's paragraphs: the text split the way it was written — the same
   * paragraph-per-line, blank-lines-as-gaps shape the read tab draws — with each
   * paragraph's sentences and the step number each of them is, so a tap on one
   * moves the reader to that step.
   *
   * `splitReaderSentences` works a line at a time, so splitting each line here
   * gives exactly the sentences the whole text splits into, in the same order:
   * the step a sentence gets in the parent is the step it has in the stage.
   */
  const parentParagraphs = useMemo(() => {
    if (!showParent) {
      return [];
    }

    let step = 0;

    return text.split(/\r?\n/).map((line) => ({
      line,
      sentences: splitReaderSentences(line, lang).map((sentence) => ({
        sentence,
        step: step++,
      })),
    }));
  }, [showParent, text, lang]);

  // Readings only mean something for a Chinese text, and they are their own
  // switch: read mode spaces the words out, pinyin hangs the reading off them.
  const showReadings = showPinyin && lang === "zh";

  const readings = useMemo(() => {
    const readingsByWord = new Map<string, string>();

    if (!showReadings) {
      return readingsByWord;
    }

    words.forEach((word) => {
      if (word.isWordLike && word.text.trim()) {
        readingsByWord.set(word.text, getReaderPinyin(word.text));
      }
    });

    return readingsByWord;
  }, [words, showReadings]);

  // Only the line on screen is drawn, but it is drawn character by character
  // with the colours they have learned: two maps fetched once, rather than a
  // subscription per glyph. See `reader-character`.
  const characterMaps = useReaderCharacterMaps();

  /**
   * The line is taller than its text once the reader switches things on: read
   * mode spaces the words out, and a reading stacks a second line on top of
   * every one of them — a 14px reading over a 20–24px word, so a row is a good
   * forty pixels deep. A line-height meant for the words alone will not hold
   * that, and the rows end up crowding one another, which is why the leading
   * grows with both switches.
   *
   * The reading's leading is in `rem` rather than a ratio because the reading
   * is a fixed stack: the length that clears it is the same whatever size the
   * words are. It steps up at `sm` to stay ahead of the plain line, which the
   * bigger text sets taller on its own.
   */
  const lineSpacing = showReadings
    ? "leading-[3.6rem] sm:leading-[4.5rem]"
    : readMode
      ? "leading-loose"
      : "leading-relaxed";

  // The line in the middle of the stage is asked about as it arrives, and the
  // answer handed back is this line's, never the last line's.
  const { data: translation } = useListDiscoveryQuery({
    content: currentSentence,
    lang,
  });

  useEffect(() => {
    setReadingPosition(readerItemId, currentIndex);
  }, [readerItemId, currentIndex, setReadingPosition]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setIndex(Math.min(currentIndex + 1, lastIndex));
      }

      if (event.key === "ArrowLeft") {
        setIndex(Math.max(currentIndex - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, lastIndex]);

  /**
   * One word of the line: the characters with the colours they have learned, and
   * the reading over them when pinyin is on.
   */
  const renderWord = (word: ReaderWord, key: string) => {
    if (!word.isWordLike || !word.text.trim()) {
      return <span key={key}>{word.text}</span>;
    }

    // The highlight belongs to what the dictionary is open on, so every word of
    // it wears the mark — a tapped word, or every word of a run of text that
    // was dragged over.
    const selected =
      !!tappedWord &&
      (tappedWord.text === word.text || tappedWord.text.includes(word.text));

    const pickableWord = (
      <span
        key={key}
        title="Tap to pick this word"
        onClick={(event) => {
          // A tap on a word is the word's, not the line's.
          event.stopPropagation();

          // A highlight wins over the word under the pointer: clicking a run of
          // text that is already lit up keeps the run, it does not shrink it to
          // the word that was clicked.
          const highlighted = window.getSelection()?.toString().trim();

          setTappedWord(
            highlighted
              ? { text: highlighted, key: "" }
              : { text: word.text, key },
          );
        }}
        className={cn(
          "rounded transition cursor-pointer",
          // With a reading above it the word becomes a little ruby stack. The
          // stack is sized to the glyph rather than to the line, which is what
          // pulls the pinyin down onto the character: a line-height borrowed
          // from the big paragraph around it would float the reading a good ten
          // pixels away.
          showReadings
            ? "px-1 text-xl lg:text-2xl leading-tight"
            : readMode
              ? "px-1"
              : "",
          selected ? "bg-rose-500/20 text-rose-400" : "hover:text-rose-400",
        )}
      >
        {/* Each character carries its own learned state; latin letters have
            none, so they stay plain text. */}
        {Array.from(word.text).map((character, characterIndex) =>
          isHanCharacter(character) ? (
            <ReaderCharacter
              key={`${key}-${characterIndex}`}
              character={character}
              maps={characterMaps}
            />
          ) : (
            <span key={`${key}-${characterIndex}`}>{character}</span>
          ),
        )}
      </span>
    );

    if (!showReadings) {
      return pickableWord;
    }

    return (
      <span key={key} className="inline-flex flex-col items-center align-top">
        {/* Snug against the character: the box is sized to the reading rather
            than to the line, because `leading-none` text in a taller box leaves
            all of its slack underneath — and that slack, plus a margin on top
            of it, is what used to hold the reading a good three pixels off the
            word. A little air stays wanted, since tone marks are drawn above
            the x-height and should not sit on the hanzi below.

            And the reading is not a footnote: it is part of the line rather
            than commentary on the word, so it carries the text colour with the
            glyphs — black on white, where the characters are black and there is
            nothing darker to go. On black it steps down from their white to a
            soft grey, so the reading sits beside the word instead of shouting
            over it. */}
        <span className="text-xs text-black dark:text-gray-400 leading-none h-3.5 whitespace-nowrap">
          {readings.get(word.text) || ""}
        </span>

        {pickableWord}
      </span>
    );
  };

  if (!sentences.length) {
    return (
      <div className="mt-16 text-center text-gray-500 font-extralight">
        <p>This text has no sentences to read.</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <p className="text-center text-xs uppercase tracking-wider text-gray-500">
        <span>{currentIndex + 1}</span>
        <span> / </span>
        <span>{sentences.length}</span>
      </p>

      <div className="h-[2px] w-full bg-gray-100 dark:bg-gray-900 mt-6">
        <div
          className="h-[2px] bg-rose-500/60 transition-all"
          style={{
            width: `${((currentIndex + 1) / sentences.length) * 100}%`,
          }}
        />
      </div>

      {/* The stage: a height of its own, with the line centred in it, so the
          arrows and the buttons under it never move — a line that runs to three
          rows leaves them exactly where a line of one row leaves them.

          It is also sticky. Reading the parent means scrolling down past the
          line you are on, and a reader who has to scroll back up to find it has
          lost their place: the stage holds the top of the screen instead, with
          a background of its own so the text passes underneath it rather than
          through it. */}
      <div className="sticky top-0 z-20 mt-20 flex min-h-[14rem] flex-col justify-center bg-white text-center dark:bg-[rgb(9,10,11)] sm:min-h-[18rem]">
        <p
          onMouseUp={lookUpSelection}
          className={cn(
            "text-2xl sm:text-4xl font-light text-black dark:text-white",
            lineSpacing,
          )}
        >
          {words.map((word, wordIndex) =>
            renderWord(word, `${currentIndex}:${wordIndex}`),
          )}
        </p>

        {/* The translation belongs to the line it is of, the way a translation
            sits under a lyric — and being inside the stage is what keeps the
            controls below from moving when one arrives. */}
        {(showEn || showChinglish) && !!translation && (
          <p
            className={cn(
              "mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400",
              showChinglish && translation.chinglish
                ? "font-light italic"
                : "font-light",
            )}
          >
            {showChinglish && translation.chinglish
              ? translation.chinglish
              : translation.en}
          </p>
        )}
      </div>

      <div className="flex justify-center items-center mt-20 gap-16 text-2xl">
        <button
          title="Previous line"
          disabled={currentIndex === 0}
          onClick={() => {
            setIndex(Math.max(currentIndex - 1, 0));
          }}
          className={currentIndex === 0 ? "text-gray-700" : "text-gray-400"}
        >
          <Icons.arrowLeft />
        </button>

        <button
          title="Next line"
          disabled={currentIndex >= lastIndex}
          onClick={() => {
            setIndex(Math.min(currentIndex + 1, lastIndex));
          }}
          className={
            currentIndex >= lastIndex ? "text-gray-700" : "text-gray-400"
          }
        >
          <Icons.arrowRight />
        </button>
      </div>

      <div className="flex justify-center items-center mt-10 gap-6 text-xs uppercase tracking-wider text-gray-500">
        <button
          className="hover:text-rose-400 transition"
          onClick={() => {
            onSaveSnippet(currentSentence);
          }}
        >
          <Icons.bookmark className="mr-2" />
          <span>Save this line</span>
        </button>

        <button
          className="hover:text-rose-400 transition"
          onClick={() => {
            setShowParent(!showParent);
          }}
        >
          {showParent ? "Hide parent" : "Show parent"}
        </button>
      </div>

      {!!tappedWord && (
        <ReaderMiniDictionary
          readerItemId={readerItemId}
          readerItemTitle={readerItemTitle}
          text={text}
          lang={lang}
          selected={tappedWord.text}
          onClose={() => {
            setTappedWord(null);
          }}
          onGoToSentence={(sentenceIndex) => {
            setIndex(sentenceIndex);
          }}
        />
      )}

      {showParent && (
        /*
          The parent is the text as it was written: the read tab's measure,
          weight and leading, paragraph per line with the blank lines kept as
          gaps. Read mode and pinyin are deliberately not applied to it — the
          readings belong to the line in the stage, and the parent is there to be
          read as a whole and to be pointed at.

          What it keeps of its own is that it is clickable: a tap on a line moves
          the reading position to that line, and the line being read is the one at
          full strength while the rest wait in the dim.
        */
        <div className="mt-12 text-lg font-extralight leading-9 text-gray-800 dark:text-gray-200">
          {parentParagraphs.map((paragraph, paragraphIndex) => {
            // A blank line is a break in the text, not an empty sentence: the
            // read tab keeps it as a gap and so does this.
            if (!paragraph.line.trim()) {
              return (
                <div key={`blank-${paragraphIndex}`} className="h-6" />
              );
            }

            return (
              <p
                key={`paragraph-${paragraphIndex}`}
                className="whitespace-pre-wrap"
              >
                {paragraph.sentences.map(({ sentence, step }) => (
                  <span
                    key={`${paragraphIndex}-${step}`}
                    title="Go to this line"
                    onClick={() => {
                      setIndex(step);
                    }}
                    className={cn(
                      "cursor-pointer transition mr-1",
                      // Dimmed by opacity rather than by a text colour, because
                      // the characters carry colours of their own: a grey on the
                      // line would not reach a glyph that has learned a tone.
                      step === currentIndex ? "" : "opacity-50 hover:opacity-90",
                    )}
                  >
                    {sentence}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};
