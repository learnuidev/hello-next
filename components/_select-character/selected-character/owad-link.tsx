import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";

export const OwadLink = ({
  hanzi,
  className,
}: {
  hanzi: string;
  className?: string;
}) => {
  return (
    <Link
      target="_blank"
      href={`
        https://www.youtube.com/@owadcn/search?query=${encodeURIComponent(hanzi)}`}
      className={cn(
        `text-sm bg-white dark:bg-black p-2 w-[36px] h-[36px] ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`,
        className
      )}
    >
      owad
    </Link>
  );
};
