"use client";

import { cn } from "@/lib/utils";

export function RoundButton({
  className,
  children,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `text-xs bg-white dark:bg-black p-2 w-12 h-12 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`,
        className
      )}
    >
      {children}
    </button>
  );
}
