import { cn } from "@/lib/utils";
import Link from "next/link";

export const QstheoryLink = ({
  hanzi,
  className,
}: {
  hanzi: string;
  className?: string;
}) => {
  return (
    <Link
      target="_blank"
      href={`https://search.qstheory.cn/qiushi/?keyword=${encodeURIComponent(hanzi)}`}
      className={cn("text-sm", className)}
    >
      求是网
    </Link>
  );
};
