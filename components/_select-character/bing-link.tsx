import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const BingLink = ({
  query,
  className,
}: {
  query: string;
  className?: string;
}) => {
  return (
    <Link
      target="_blank"
      href={`https://www.bing.com/translator?text=${encodeURIComponent(query)}`}
      className={cn(className)}
    >
      <Icons.bing className="text-xl" />
    </Link>
  );
};
