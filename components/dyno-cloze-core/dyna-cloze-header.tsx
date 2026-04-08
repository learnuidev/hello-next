import Link from "next/link";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { ReviewItemHanzi } from "@/app/review/review-cloze-content/review-item-hanzi";

export const DynaClozeHeader = ({
  sentence,
  response,
}: {
  response: any;
  sentence: {
    hanziHidden: string;
    hanzi: string;
    pinyin: string;
    lang: string;
    en: string;
  };
}) => {
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const showEnPreview = useBrightModeStore((state) => state.showEn);

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
        <p className="mt-2 lg:text-xl text-md">{sentence.en}</p>
      )}
    </div>
  );
};
