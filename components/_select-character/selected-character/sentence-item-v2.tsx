import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { cn } from "@/lib/utils";
import { useReadModeStore } from "@/stores/use-readmode-store";
import Link from "next/link";

export const SentenceItemV2 = ({
  href,
  pinyin,
  hanzi,
  en,
  className,
}: {
  href: string;
  pinyin: string;
  hanzi: string;
  en: string;
  className?: string;
}) => {
  const brightMode = useBrightModeStore((state) => state.mode);
  const readMode = useReadModeStore((state) => state.readMode);
  return (
    <Link href={href} className={cn("font-extralight text-xl", className)}>
      {brightMode || readMode ? (
        <p className="text-gray-400 text-sm fade-in-100 transition">{pinyin}</p>
      ) : (
        <p className="text-black text-sm">{pinyin}</p>
      )}
      <p>{hanzi}</p>
      {brightMode || readMode ? (
        <p className="text-gray-500 text-sm transition fade-in-100">{en}</p>
      ) : (
        <p className="text-black text-sm">{en}</p>
      )}
    </Link>
  );
};
