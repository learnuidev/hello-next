import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";

export const GoogleTranslateLink = ({
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
      className={cn(className)}
    >
      <Icons.language />
    </Link>
  );
};
