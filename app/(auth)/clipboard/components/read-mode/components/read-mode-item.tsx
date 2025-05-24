import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { ReadModeItemHanzi } from "./read-mode-item-hanzi";
import { ReadModeItemNonHanzi } from "./read-mode-item-nonhanzi";

export function ReadModeItem({
  text,
  lang,
  sentenceIndex,
}: {
  text: string;
  lang: string;
  sentenceIndex: number;
}) {
  if (lang === "zh") {
    return (
      <ReadModeItemHanzi
        text={text}
        lang={lang}
        sentenceIndex={sentenceIndex}
      />
    );
  }

  return (
    <ReadModeItemNonHanzi
      text={text}
      lang={lang}
      sentenceIndex={sentenceIndex}
    />
  );
}
