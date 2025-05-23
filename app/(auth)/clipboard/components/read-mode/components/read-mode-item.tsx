import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { ReadModeItemHanzi } from "./read-mode-item-hanzi";
import { ReadModeItemNonHanzi } from "./read-mode-item-nonhanzi";

export function ReadModeItem({ text }: any) {
  const lang = useGetCurrentLang();

  if (lang === "zh") {
    return <ReadModeItemHanzi text={text} />;
  }

  return <ReadModeItemNonHanzi text={text} />;
}
