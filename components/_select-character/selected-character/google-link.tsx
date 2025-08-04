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
      href={`https://www.google.com/search?q=${encodeURIComponent(hanzi)}`}
      className={cn(className)}
    >
      <Icons.google className="text-xl" />
    </Link>
  );
};
