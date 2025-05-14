import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";

export const GoogleLink = ({
  hanzi,
  className,
}: {
  hanzi: string;
  className?: string;
}) => {
  return (
    <Link
      target="_blank"
      href={`https://translate.google.com/?tl=en&text=${encodeURIComponent(
        hanzi
      )}&op=translate`}
      className={cn(
        `text-sm bg-white dark:bg-black p-2 w-[36px] h-[36px] ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`,
        className
      )}
    >
      <Icons.google />
    </Link>
  );
};
