import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useFontSizeStore } from "../hooks/use-font-size";
import pinyin from "pinyin";

import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { useSearchOnlyPinyinState } from "@/components/search-only-pinyin-button";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { formatRoman } from "@/lib/format-roman";
import { cn } from "@/lib/utils";
import { useSegmentTextQuery } from "@/libs/utils/segment-text";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { useContentSearchHistory } from "../hooks/use-content-search-history";
import { EnView } from "./en-view";
import { InputView } from "./input-view";
import {
  filterNonHanYu,
  nonHanYuChars,
} from "@/app/nmm/nmm-utils/filter-non-hanyu";

function ReaderViewChinese({
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

  const { setShowSearchOnlyPinyin, showSearchOnlyPinyin } =
    useSearchOnlyPinyinState();

  const { searchHistory, addSearchHistory } = useContentSearchHistory({
    contentId: contentId || "",
  });

  return (
    <div className={cn(defautClassName, className)}>
      <div className={cn(defautClassName, className)}>
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
                "leading-none"
              )}
              key={`${JSON.stringify(item)}-${idx}-${idx}`}
            >
              {showPinyin && (
                <span
                  style={{ fontSize: `${fontSize * 0.75}px` }}
                  className={cn("dark:text-gray-500 text-gray-800")}
                >
                  {formatRoman(item)}
                </span>
              )}

              <span style={{ fontSize: `${fontSize}px !important` }}>
                {smartSplit({
                  input: item?.hanzi || item?.input,
                  lang: currentTranscription?.lang,
                })?.map((charItem: any, charIdx: any) => {
                  const containsInUnknown = contentUnknowns?.items?.find(
                    (val) => val?.input?.includes(charItem)
                  );

                  return (
                    <span key={`${charItem}-pinin-view-${charIdx}`}>
                      <CharacterItem
                        character={charItem}
                        style={{ fontSize: `${fontSize * 0.75}px` }}
                        className={cn(
                          "!text-3xl",
                          isSelected
                            ? "dark:bg-emerald-600 bg-emerald-300"
                            : "",
                          !isSelected &&
                            containsInUnknown &&
                            "font-light dark:!text-pink-300 !text-pink-500",

                          currentTime > item?.start &&
                            currentTime < item?.end &&
                            !nonHanYuChars.includes(charItem) &&
                            "underline underline-offset-8"
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

export function ReaderView({
  currentTime,
  hideEnglish = false,
  currentTranscription,
  seekAndPlay,
  containsChinglish,
  className,
  contentId,
  lang,
}: CurrentTranscriptionProps) {
  const { data: _segmentedData } = useSegmentTextQuery({
    text: currentTranscription?.input,
    lang: currentTranscription?.lang,
  });

  const data: any =
    currentTranscription?.words?.map((word) => {
      const pinyinItem = pinyin(word?.input || "")
        .map((item) => item[0])
        .join("");
      return {
        ...word,
        pinyin: pinyinItem,
      };
    }) || _segmentedData;

  const showEn = useBrightModeStore((state) => state.showEn);

  const defautClassName = "mb-4  gap-0 space-y-0";

  return (
    <div>
      {currentTranscription?.lang === "zh" && data ? (
        <ReaderViewChinese
          currentTime={currentTime}
          className={className}
          data={data}
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
          contentId={contentId}
          lang={lang}
        />
      ) : (
        <div className={cn(defautClassName, className)}>
          {isNonRomanLang(currentTranscription?.lang) ? (
            <p>
              {currentTranscription?.lang === "zh"
                ? currentTranscription?.pinyin
                : currentTranscription?.roman}
            </p>
          ) : null}
          <InputView
            currentTime={currentTime}
            containsChinglish={containsChinglish}
            currentTranscription={currentTranscription}
            seekAndPlay={seekAndPlay}
            contentId={contentId}
            lang={lang}
          />
        </div>
      )}

      {hideEnglish
        ? null
        : showEn && (
            <EnView
              currentTime={currentTime}
              containsChinglish={containsChinglish}
              currentTranscription={currentTranscription}
              seekAndPlay={seekAndPlay}
              contentId={contentId}
              lang={lang}
            />
          )}
    </div>
  );
}
