"use client";

import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { isCharacterPartOfWordMatch } from "@/lib/content-bookmark";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { containsUnknownStyles } from "../utils/contains-unknown-styles";
import { ReaderView } from "./reader-view";

/**
 * One transcription of the reader.
 *
 * Reader mode keeps the whole book on the sheet, and these two components are
 * what makes that possible: they are memoised, so the playhead reporting its
 * position ten times a second re-renders the line the audio has just left and
 * the one it has just reached — and nothing else. Opening the character menu
 * would likewise re-render one line rather than the book.
 *
 * That is why every prop here is a stable value — a boolean, a string, an id, a
 * ref — and never a live `currentTime`.
 */

/** A line of the reader: the word-by-word view when read mode is on. */
export const ReaderTextLine = memo(function ReaderTextLine({
  transcription,
  isActive,
  className,
  lang,
  contentId,
  timeRef,
}: {
  transcription: any;
  isActive: boolean;
  /** The colour the line wears while it is, or is not, the one being read. */
  className: string;
  lang: string;
  contentId: string;
  timeRef: React.MutableRefObject<number> | null;
}) {
  return (
    <ReaderView
      currentTranscription={transcription}
      isActive={isActive}
      className={className}
      containsChinglish={false}
      hideEnglish
      contentId={contentId}
      lang={lang}
      timeRef={timeRef}
    />
  );
});

ReaderTextLine.displayName = "ReaderTextLine";

/**
 * A line of the reader with read mode off: the reading above the characters,
 * and every character tappable for the menu.
 */
export const ReaderParagraphLine = memo(function ReaderParagraphLine({
  transcription,
  isActive,
  isFocusMode,
  activeClassName,
  inactiveClassName,
  contentUnknowns,
  showPinyin,
  lang,
}: {
  transcription: any;
  isActive: boolean;
  /** `focus` mode paints each character with its tone colour. */
  isFocusMode: boolean;
  activeClassName: string;
  /**
   * What every other line wears: the page's own colour tone, so it sits back
   * without going soft — light on white, dark on black — with the sheet's blur
   * on top of it. `focus` mode mutes nothing, because there the tone colours are
   * the reading.
   */
  inactiveClassName: string;
  contentUnknowns: any;
  showPinyin: boolean;
  lang: string;
}) {
  const setShowMenuBar = useCharacterMenuBarStore(
    (state) => state.setShowMenuBar,
  );

  return (
    <div className="mn-r-leading-line">
      {showPinyin && (
        <p
          className={cn(
            "mn-r-text-guide mn-r-guide-gap font-extralight",
            // The reading belongs to the line it sits above, so it wears the
            // same colour the line does: the line being read is painted with the
            // colour of its transcription, every other one with the page's tone.
            isActive ? activeClassName : inactiveClassName,
          )}
        >
          {transcription.pinyin || transcription?.roman}
        </p>
      )}
      <p className={cn(isActive ? activeClassName : inactiveClassName)}>
        {smartSplit({
          input: transcription?.input,
          lang: transcription?.lang || lang,
        })?.map((item: any, idx: any) => {
          const containsInUnknown = contentUnknowns?.items?.find((val: any) => {
            return isCharacterPartOfWordMatch(
              transcription?.input,
              val?.input,
              item,
              idx,
            );
          });

          return (
            <span
              key={`${item}-pinin-view-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                const selectedText = getSelectedText();

                const text =
                  selectedText && selectedText?.length < 36 ? selectedText : item;

                setShowMenuBar({
                  text,
                  position: {
                    x: e.clientX,
                    y: e.clientY,
                  },
                  startTime: transcription?.start ?? null,
                });
              }}
            >
              <CharacterItem
                className={cn(
                  "mn-r-text-char",
                  isActive
                    ? // `focus` mode paints each character with its tone
                      // colour, so the current transcription must not be forced
                      // white.
                      isFocusMode
                      ? ""
                      : "   !dark:text-white"
                    : // The tone has to land here too, not only on the line
                      // around it: `CharacterItem` paints every character itself,
                      // and its own colour would win over an inherited one.
                      inactiveClassName,
                  containsInUnknown && containsUnknownStyles(!!containsInUnknown),
                  "font-light",
                )}
                character={item}
              />
            </span>
          );
        })}
      </p>
    </div>
  );
});

ReaderParagraphLine.displayName = "ReaderParagraphLine";
