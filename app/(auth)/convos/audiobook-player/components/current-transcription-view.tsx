import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { useReadModeState } from "@/components/read-mode-button";
import { useSearchOnlyPinyinState } from "@/components/search-only-pinyin-button";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { formatRoman } from "@/lib/format-roman";
import { cn } from "@/lib/utils";
import { useSegmentTextQuery } from "@/libs/utils/segment-text";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { useContentSearchHistory } from "../hooks/use-content-search-history";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";

function EnView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
}: CurrentTranscriptionProps) {
  const { showChinglish } = useChinglishState();
  return (
    <p
      onClick={() => {
        if (seekAndPlay) seekAndPlay(currentTranscription.start);
      }}
      className="text-[16px] sm:text-xl"
    >
      {showChinglish && containsChinglish
        ? currentTranscription?.chinglish
        : currentTranscription?.en}
    </p>
  );
}

function InputView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
  contentId,
}: CurrentTranscriptionProps) {
  const { data: contentUnknowns } = useListContentUnknownsQuery(contentId);
  const { setShowMenuBar } = useCharacterMenuBarStore();

  return (
    <p
      className={cn(
        currentTranscription?.lang === "zh"
          ? "text-lg sm:text-3xl"
          : "text-[16px] sm:text-xl"
      )}
    >
      {smartSplit({
        input: currentTranscription?.input,
        lang: currentTranscription?.lang,
      })?.map((item: any, idx: any) => {
        const containsInUnknown = contentUnknowns?.items?.find((val) =>
          val?.input?.includes(item)
        );

        return (
          <span
            key={`${item}-pinin-view-${idx}`}
            onClick={(e) => {
              const selectedText = getSelectedText();
              const text =
                selectedText && selectedText?.length < 36
                  ? selectedText
                  : item;

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
                "font-light dark:!text-pink-300 !text-pink-500"
              }
            />
          </span>
        );
      })}
    </p>
  );
}

export function ReaderView({
  currentTranscription,
  className,
  seekAndPlay,
  data,
  contentId,
}: CurrentTranscriptionProps & {
  data: {
    input: string;
    hanzi: string;
    pinyin?: string;
    roman?: string;
    start?: number;
    end?: number;
  }[];
}) {
  const { data: contentUnknowns } = useListContentUnknownsQuery(contentId);
  const defautClassName = "mb-4 sm:mb-16 gap-0 space-y-0";

  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  const { selected, setSelected } = useSelectedItem();

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
          const containsHistory = searchHistory?.find(
            (historyItem: any) =>
              historyItem?.input === item?.hanzi || item?.input
          );
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
                  className={cn(
                    "text-sm ",

                    "dark:text-gray-400 text-gray-800"
                  )}
                >
                  {formatRoman(item)}
                </span>
              )}

              <span
                className={
                  currentTranscription?.lang === "zh"
                    ? "text-lg sm:text-xl lg:text-2xl"
                    : "text-[16px] sm:text-xl"
                }
              >
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
                        className={
                          containsInUnknown &&
                          "font-light dark:!text-pink-300 !text-pink-500"
                        }
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
function NormalView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
  className,
  contentId,
  lang,
}: CurrentTranscriptionProps) {
  const defautClassName = "mb-4 sm:mb-16 gap-0 space-y-0";

  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const showEn = useBrightModeStore((state) => state.showEn);

  return (
    <div className="text-start">
      {showPinyin && (
        <p className="text-sm dark:text-gray-400 text-gray-800">
          {currentTranscription?.pinyin || currentTranscription?.roman}
        </p>
      )}

      <div className={cn(defautClassName, className)}>
        <InputView
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
          contentId={contentId}
          lang={lang}
        />
      </div>

      {showEn && (
        <EnView
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

export function PinyinView({
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

  const data: any = currentTranscription?.words || _segmentedData;
  const showEn = useBrightModeStore((state) => state.showEn);

  const defautClassName = "mb-4 sm:mb-16 gap-0 space-y-0";

  return (
    <div>
      {currentTranscription?.lang === "zh" && data ? (
        <ReaderView
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
            containsChinglish={containsChinglish}
            currentTranscription={currentTranscription}
            seekAndPlay={seekAndPlay}
            contentId={contentId}
            lang={lang}
          />
        </div>
      )}

      {showEn && (
        <EnView
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

export function CurrentTranscriptionView({
  currentTranscription,
  containsChinglish,
  seekAndPlay,
  className,
  contentId,
  lang,
}: CurrentTranscriptionProps) {
  const { readMode } = useReadModeState();

  return (
    <div className={cn("mt-4 lg:mt-24 max-w-7xl mx-4", className)}>
      {readMode ? (
        <div className="max-w-7xl">
          <PinyinView
            containsChinglish={containsChinglish}
            currentTranscription={currentTranscription}
            seekAndPlay={seekAndPlay}
            className={className}
            contentId={contentId}
            lang={lang}
          />
        </div>
      ) : (
        <NormalView
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
          className={className}
          contentId={contentId}
          lang={lang}
        />
      )}
    </div>
  );
}
