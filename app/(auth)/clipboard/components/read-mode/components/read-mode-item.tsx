import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { ReadModeItemHanzi } from "./read-mode-item-hanzi";
import { ReadModeItemNonHanzi } from "./read-mode-item-nonhanzi";

export function ReadModeItem({ text, lang }: { text: string; lang: string }) {
  if (lang === "zh") {
    return <ReadModeItemHanzi text={text} lang={lang} />;
  }

  return <ReadModeItemNonHanzi text={text} lang={lang} />;
}
