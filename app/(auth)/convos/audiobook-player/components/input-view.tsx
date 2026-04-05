import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { cn } from "@/lib/utils";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { useFontSizeStore } from "../hooks/use-font-size";
import { isCharacterPartOfWordMatch } from "@/lib/content-bookmark";

export function InputView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
  contentId,
}: CurrentTranscriptionProps) {
  const { data: contentUnknowns } = useListContentUnknownsQuery(contentId);
  const { setShowMenuBar } = useCharacterMenuBarStore();
  const { fontSize } = useFontSizeStore();

  return (
    <p style={{ fontSize: `${fontSize}px` }}>
      {smartSplit({
        input: currentTranscription?.input,
        lang: currentTranscription?.lang,
      })?.map((item: any, idx: any) => {
        const containsInUnknown = contentUnknowns?.items?.find((val) => {
          return isCharacterPartOfWordMatch(
            currentTranscription?.input,
            val?.input,
            item,
            idx
          );
        });

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
              className={
                containsInUnknown &&
                "font-light dark:!text-pink-300 !text-pink-500 text-2xl"
              }
            />
          </span>
        );
      })}
    </p>
  );
}
