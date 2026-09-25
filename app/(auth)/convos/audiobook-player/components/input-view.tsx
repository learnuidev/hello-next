import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { useReadModeSweep } from "../hooks/use-read-mode-sweep";
import { isCharacterPartOfWordMatch } from "@/lib/content-bookmark";
import { containsUnknownStyles } from "../utils/contains-unknown-styles";
import { SweepTiming } from "./karaoke/sweep";

/** Whitespace carries no glyph, so it never takes part in the sweep. */
const isSpacePiece = (text: string) => /^\s*$/.test(text);

export function InputView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
  className,
  contentId,
  currentTime = 0,
  isActive: activeProp,
  timeRef,
}: CurrentTranscriptionProps) {
  const { data: contentUnknowns } = useListContentUnknownsQuery(contentId);
  // Subscribed by selector: with the whole book on the reader's sheet, taking
  // the store itself would re-render every line every time a character is
  // tapped.
  const setShowMenuBar = useCharacterMenuBarStore(
    (state) => state.setShowMenuBar,
  );

  const pieces: string[] = useMemo(
    () =>
      smartSplit({
        input: currentTranscription?.input,
        lang: currentTranscription?.lang,
      }) || [],
    [currentTranscription?.input, currentTranscription?.lang],
  );

  // This view is what the reader falls back to for a line with no per-word
  // timings at all (another language, or a line the aligner never reached).
  // Those lines are paced by hand, exactly as the karaoke view paces them: the
  // line's own duration is shared out between its words by length, so the
  // read-along fill still travels across the sentence.
  const timings = useMemo<(SweepTiming | null)[]>(() => {
    const start = Number(currentTranscription?.start);
    const end = Number(currentTranscription?.end);
    const units = pieces.filter((piece) => !isSpacePiece(piece));

    if (!Number.isFinite(start) || !Number.isFinite(end) || !(end > start)) {
      return units.map(() => null);
    }

    const characters = units.reduce((acc, piece) => acc + piece.length, 0) || 1;
    const secondsPerCharacter = (end - start) / characters;

    let cursor = start;

    return units.map((piece) => {
      const timing = {
        start: cursor,
        end: cursor + piece.length * secondsPerCharacter,
      };

      cursor = timing.end;

      return timing;
    });
  }, [pieces, currentTranscription?.start, currentTranscription?.end]);

  // The reader sheet hands the active line down so the fill and the highlight
  // can never disagree; the start/end test is the fallback for other callers.
  const isActive =
    activeProp ??
    (currentTranscription?.start < currentTime &&
      currentTranscription?.end > currentTime);

  const sweepRef = useReadModeSweep<HTMLParagraphElement>({
    active: isActive,
    timeRef,
    timings,
  });

  // Without word timings there is nothing to pace, so the line is left alone.
  const sweeping = isActive && !!timeRef && timings.some(Boolean);

  let unit = 0;

  return (
    <p ref={sweepRef} className="mn-r-text-base">
      {pieces.map((item: any, idx: any) => {
        const containsInUnknown = contentUnknowns?.items?.find((val) => {
          return isCharacterPartOfWordMatch(
            currentTranscription?.input,
            val?.input,
            item,
            idx,
          );
        });

        const isSpace = isSpacePiece(item);
        const slot =
          sweeping && !isSpace && timings[unit]
            ? { word: unit, glyph: 0, glyphs: 1 }
            : undefined;

        if (!isSpace) {
          unit += 1;
        }

        return (
          <span
            key={`${item}-pinin-view-${idx}`}
            onClick={(e) => {
              const selectedText = getSelectedText();
              const text =
                selectedText && selectedText?.length < 36 ? selectedText : item;

              setShowMenuBar({
                text,
                position: { x: e.clientX, y: e.clientY },
                startTime: null,
              });
            }}
          >
            <CharacterItem
              character={item}
              sweepSlot={slot}
              className={cn(
                containsUnknownStyles(!!containsInUnknown),
                containsInUnknown && "font-light text-3xl",
                slot && "mn-r-sweep",
                // The line's own colour, last: this view draws characters that
                // carry their colour themselves, so the tone of a line that is
                // not being read — or the highlight of the one that is — has to
                // be handed to each of them rather than inherited from the line
                // around them.
                className,
              )}
            />
          </span>
        );
      })}
    </p>
  );
}
