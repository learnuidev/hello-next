/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

export const LanguageButton = ({
  lang,
  onClick,
  className,
}: {
  className?: string;
  onClick: () => void;
  lang: {
    id: string;
    src: string;
    title: string;
  };
}) => {
  return (
    <button key={lang.id} onClick={onClick} className={cn("text-white")}>
      <img src={lang.src} alt={lang.title} className="h-8" />
    </button>
  );
};
