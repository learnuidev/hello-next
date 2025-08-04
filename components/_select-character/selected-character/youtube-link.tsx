import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const YoutubeLink = ({
  characterId,
  className,
}: {
  characterId: string;
  className?: string;
}) => {
  return (
    <Link
      target="_blank"
      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(characterId)}`}
      className={cn(className)}
    >
      <Icons.youtube />
    </Link>
  );
};
