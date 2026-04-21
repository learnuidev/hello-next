import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useFontSizeStore } from "../hooks/use-font-size";

import { nonHanYuChars } from "@/app/nmm/nmm-utils/filter-non-hanyu";
import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { isCharacterPartOfWordMatch } from "@/lib/content-bookmark";
import { formatRoman } from "@/lib/format-roman";
import { cn } from "@/lib/utils";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { containsUnknownStyles } from "../utils/contains-unknown-styles";

export function ReaderViewChinese({
  currentTranscription,
  className,
  currentTime,
  seekAndPlay,
  data,
  contentId,
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
  const { fontSize } = useFontSizeStore();

  const { text: selected } = useCharacterMenuBarStore();

  const { setShowMenuBar } = useCharacterMenuBarStore();

  // const isLong = currentTranscription?.input?.length > 60;

  return (
    <div className={cn(defautClassName, className)}>
      <div className={cn(defautClassName, className, "text-base/10")}>
        {data?.map((item, idx) => {
          const isSelected =
            selected && selected === (item?.hanzi || item?.input);

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
                  className={cn(
                    "dark:text-gray-500 text-gray-800",
                    "sm:text-sm",
                    "text-[14px]",
                  )}
                >
                  {formatRoman(item)}
                </span>
              )}

              <span>
                {smartSplit({
                  input: item?.hanzi || item?.input,
                  lang: currentTranscription?.lang,
                })?.map((charItem: any, charIdx: any) => {
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

                  return (
                    <span key={`${charItem}-pinin-view-${charIdx}`}>
                      <CharacterItem
                        character={charItem}
                        className={cn(
                          "sm:!text-3xl font-light",
                          "text-2xl",
                          isSelected
                            ? "dark:bg-emerald-600 bg-emerald-300"
                            : "",
                          !isSelected &&
                            containsUnknownStyles(!!containsInUnknown),
                          currentTime > item?.start &&
                            currentTime < item?.end &&
                            !nonHanYuChars.includes(charItem) &&
                            "underline underline-offset-8",
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
