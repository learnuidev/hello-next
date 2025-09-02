import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { cn } from "@/lib/utils";
import { useSegmentTextQuery } from "@/libs/utils/segment-text";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { isChinesePunctuation } from "@/lib/is-chinese-punctuation";

function EnView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
}: CurrentTranscriptionProps) {
  const { showChinglish } = useChinglishState();
  return (
    <p
      onClick={() => {
        seekAndPlay(currentTranscription.start);
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
}: CurrentTranscriptionProps) {
  const { selected, setSelected } = useSelectedItem();

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
        return (
          <span key={`${item}-pinin-view-${idx}`}>
            <CharacterItem
              character={item}
              onClick={() => {
                const selectedText = getSelectedText();

                if (selectedText && selectedText?.length < 36) {
                  setSelected(selectedText);
                } else {
                  setSelected(item);
                }
              }}
            />
          </span>
        );
      })}
    </p>
  );
}
function NormalView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
}: CurrentTranscriptionProps) {
  return (
    <div>
      <EnView
        containsChinglish={containsChinglish}
        currentTranscription={currentTranscription}
        seekAndPlay={seekAndPlay}
      />

      <div className="mt-4 sm:mt-16">
        <InputView
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
        />
      </div>
    </div>
  );
}

function PinyinView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
}: CurrentTranscriptionProps) {
  const { data: _data } = useListDictionaryMeaningsQuery(
    currentTranscription?.input,
    currentTranscription?.lang
  );

  const { data: _segmentedData } = useSegmentTextQuery({
    text: currentTranscription?.input,
    lang: currentTranscription?.lang,
  });

  const data = _data || _segmentedData;

  const { selected, setSelected } = useSelectedItem();

  return (
    <div className="max-w-7xl mx-auto">
      <EnView
        containsChinglish={containsChinglish}
        currentTranscription={currentTranscription}
        seekAndPlay={seekAndPlay}
      />
      {currentTranscription?.lang === "zh" && data ? (
        <div className="mt-4 sm:mt-16 gap-0 space-y-0">
          {data?.map((item, idx) => {
            return (
              <span
                onClick={() => {
                  const selectedText = getSelectedText();
                  if (selectedText && selectedText?.length < 36) {
                    setSelected(selectedText);
                  } else if (selected === (item?.hanzi || item?.input)) {
                    setSelected(null);
                  } else {
                    setSelected(item.hanzi || item?.input);
                  }
                }}
                className={cn(
                  "inline-flex flex-col items-center justify-center",

                  ["，", "。"]?.includes(item?.input)
                    ? ""
                    : "px-[2px] py-[0px] sm:px-[4px]",
                  "leading-none"
                )}
                key={`${JSON.stringify(item)}-${idx}${_data ? "perm" : "tempo"}`}
              >
                <span className="text-sm dark:text-gray-400 text-gray-800">
                  {isChinesePunctuation(item?.input || item?.hanzi)
                    ? ""
                    : item?.pinyin}
                </span>

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
                  })?.map((item: any, idx: any) => {
                    return (
                      <span key={`${item}-pinin-view-${idx}`}>
                        <CharacterItem
                          character={item}
                          onClick={() => {
                            const selectedText = getSelectedText();

                            if (selectedText && selectedText?.length < 36) {
                              setSelected(selectedText);
                            } else {
                              setSelected(item);
                            }
                          }}
                        />
                      </span>
                    );
                  })}
                </span>
              </span>
            );
          })}
        </div>
      ) : (
        <div className="mt-16">
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
          />
        </div>
      )}
    </div>
  );
}

export function CurrentTranscriptionView({
  currentTranscription,
  containsChinglish,
  seekAndPlay,
}: CurrentTranscriptionProps) {
  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  return (
    <div className="text-center mt-8 sm:mt-24 max-w-7xl mx-auto">
      {showPinyin ? (
        <PinyinView
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
        />
      ) : (
        <NormalView
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
        />
      )}
    </div>
  );
}
