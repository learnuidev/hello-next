import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

import { nonHanYuChars } from "@/app/nmm/nmm-utils/filter-non-hanyu";
import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { isCharacterPartOfWordMatch } from "@/lib/content-bookmark";
import { formatRoman } from "@/lib/format-roman";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { useReadModeSweep } from "../hooks/use-read-mode-sweep";
import { useTranscriptionHighlight } from "../hooks/use-transcription-highlight";
import { containsUnknownStyles } from "../utils/contains-unknown-styles";
import { SweepTiming } from "./karaoke/sweep";

/** Whitespace carries no glyph, so it never takes part in the sweep. */
const isSpacePiece = (text: string) => /^\s*$/.test(text);

export function ReaderViewChinese({
  currentTranscription,
  className,
  currentTime = 0,
  isActive: activeProp,
  seekAndPlay,
  data,
  contentId,
  timeRef,
}: CurrentTranscriptionProps & {
  data: {
    input: string;
    hanzi: string;
    pinyin?: string;
    roman?: string;
    start: number;
    end: number;
  }[];
}) {
  const { data: contentUnknowns } = useListContentUnknownsQuery(contentId);
  const defautClassName = "gap-0 space-y-0";

  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  // Only the line holding the selected word re-renders when a character is
  // tapped: with a whole book on the sheet, subscribing to the selection itself
  // would re-render every line of it on every tap.
  const wordTexts = useMemo(
    () => new Set((data || []).map((item) => item?.hanzi || item?.input)),
    [data],
  );

  const selected = useCharacterMenuBarStore((state) =>
    wordTexts.has(state.text) ? state.text : null,
  );

  const setShowMenuBar = useCharacterMenuBarStore(
    (state) => state.setShowMenuBar,
  );

  // const isLong = currentTranscription?.input?.length > 60;

  // The line being read fills in as it is spoken — the same animation the
  // karaoke view runs — while every other line keeps its static highlight. The
  // sheet that renders the whole book decides which line that is; the start/end
  // test is the fallback for callers showing a single transcription.
  const isActive =
    activeProp ??
    (currentTranscription?.start < currentTime &&
      currentTranscription?.end > currentTime);

  const timings = useMemo<(SweepTiming | null)[]>(
    () =>
      (data || []).map((item) => {
        const start = Number(item?.start);
        const end = Number(item?.end);

        return Number.isFinite(start) && Number.isFinite(end) && end > start
          ? { start, end }
          : null;
      }),
    [data],
  );

  const sweepRef = useReadModeSweep({ active: isActive, timeRef, timings });

  // The colour a transcription is painted with while it is the one being read.
  // Only the text colour is wanted here — the block background belongs to the
  // characters — so the reader's background is left out.
  const { activeClassName: activeTextClassName } = useTranscriptionHighlight({
    background: "",
  });

  return (
    <div className={cn(defautClassName, className)}>
      <div
        ref={sweepRef}
        className={cn(defautClassName, className, "text-base/10")}
      >
        {data?.map((item, idx) => {
          const isSelected =
            selected && selected === (item?.hanzi || item?.input);

          const pieces: string[] =
            smartSplit({
              input: item?.hanzi || item?.input,
              lang: currentTranscription?.lang,
            }) || [];

          // A word is usually more than one character and the reader paints
          // each character on its own (every character carries its own tone
          // colour), so the word's sweep is shared out between them: the fill
          // still travels across the word instead of every character lighting
          // up at once.
          const glyphs = pieces.filter((piece) => !isSpacePiece(piece)).length;
          const sweeping = isActive && !!timeRef && !!timings[idx];
          let glyph = 0;

          return (
            <span
              onClick={(e) => {
                const selectedText = getSelectedText();

                const text =
                  selectedText && selectedText?.length < 36
                    ? selectedText
                    : item.hanzi || item?.input;

                setShowMenuBar({
                  text,
                  position: { x: e.clientX, y: e.clientY },
                  startTime: item?.start ?? null,
                });
              }}
              className={cn(
                "inline-flex flex-col items-center justify-center",

                ["，", "。"]?.includes(item?.input)
                  ? ""
                  : "px-[2px] py-[0px] sm:px-[4px]",
                "leading-none",
              )}
              key={`${JSON.stringify(item)}-${idx}-${idx}`}
            >
              {showPinyin && (
                <span
                  // The guide fills with the word it belongs to: one reading,
                  // one box, so it sweeps across the whole word rather than
                  // splitting itself between the characters below.
                  data-r-word={sweeping ? idx : undefined}
                  data-r-glyph={sweeping ? 0 : undefined}
                  data-r-glyphs={sweeping ? 1 : undefined}
                  className={cn(
                    // The guide normally sits back in its own quieter grey, but
                    // on the transcription being read it is painted with the
                    // same colour as the characters under it — the colour the
                    // input itself is being given.
                    isActive
                      ? activeTextClassName
                      : "dark:text-gray-500 text-gray-800",
                    "sm:text-sm",
                    "text-[14px]",
                    sweeping && "mn-r-sweep",
                  )}
                >
                  {formatRoman(item)}
                </span>
              )}

              <span>
                {pieces.map((charItem: any, charIdx: any) => {
                  const containsInUnknown = contentUnknowns?.items?.find(
                    (val) => {
                      return isCharacterPartOfWordMatch(
                        item?.hanzi || item?.input,
                        val?.input,
                        charItem,
                        charIdx,
                      );
                    },
                  );

                  const slot =
                    sweeping && !isSpacePiece(charItem)
                      ? { word: idx, glyph: glyph++, glyphs }
                      : undefined;

                  return (
                    <span key={`${charItem}-pinin-view-${charIdx}`}>
                      <CharacterItem
                        character={charItem}
                        sweepSlot={slot}
                        className={cn(
                          "sm:!text-3xl font-light",
                          "text-2xl",
                          isSelected
                            ? "dark:bg-emerald-600 bg-emerald-300"
                            : "",
                          !isSelected &&
                            containsUnknownStyles(!!containsInUnknown),
                          // The sweep *is* the highlight of the word being
                          // read, so it stands in for the static underline.
                          sweeping
                            ? slot && "mn-r-sweep"
                            : currentTime > item?.start &&
                                currentTime < item?.end &&
                                !nonHanYuChars.includes(charItem) &&
                                "underline underline-offset-8",
                          className,
                        )}
                      />
                    </span>
                  );
                })}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
