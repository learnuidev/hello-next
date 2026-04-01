import { CoreStats } from "@/domain/content-v2/series.types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export interface Props {
  totalCharacters: number;
  totalWords: number;
  totalSentences: number;
  className?: string;
}

export function StatsList(props: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 mt-2 text-sm text-gray-600",
        props?.className
      )}
    >
      <span className="hidden sm:flex items-center gap-1">
        {formatNumber(props.totalCharacters)} 字
      </span>
      <span className="hidden sm:flex items-center gap-1">
        {formatNumber(props.totalWords)} 词
      </span>
      <span className="hidden sm:flex items-center gap-1">
        {formatNumber(props.totalSentences)} 句
      </span>
    </div>
  );
}
