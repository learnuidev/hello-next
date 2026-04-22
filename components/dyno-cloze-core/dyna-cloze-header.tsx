import Link from "next/link";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { ReviewItemHanzi } from "@/app/review/review-cloze-content/review-item-hanzi";
import { useChinglishState } from "../settings-dialog/use-chinglish-state";

export const DynaClozeHeader = ({
  sentence,
  response,
}: {
  hideDynaClozeR?: boolean;
  response: any;
  sentence: {
    hanziHidden: string;
    hanzi: string;
    pinyin: string;
    lang: string;
    en: string;
    chinglish?: string;
  };
}) => {
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const showEnPreview = useBrightModeStore((state) => state.showEn);
  const { showChinglish } = useChinglishState();

  return (
    <div className="text-center mt-12 lg:mt-24 max-w-3xl m-auto">
      {showPinyin && (
        <Link
          target="_blank"
          href={`/nmm/${sentence.hanzi}?lang=${sentence?.lang}`}
          className={"block lg:text-xl text-md mb-2"}
        >
          {sentence?.pinyin}
        </Link>
      )}

      <ReviewItemHanzi
        input={response ? sentence.hanzi : sentence.hanziHidden}
        lang={sentence?.lang}
      />

      {showEnPreview && (
        <p className="mt-2 lg:text-xl text-md">
          {showChinglish ? sentence?.chinglish || sentence?.en : sentence.en}
        </p>
      )}
    </div>
  );
};
