/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { ILanguage } from "./languages";

export const LanguageButton = ({
  lang,
  onClick,
  className,
}: {
  className?: string;
  onClick: () => void;
  lang: ILanguage;
}) => {
  return (
    <button key={lang.id} onClick={onClick} className={cn("text-white")}>
      <img src={lang.src} alt={lang.title} className="h-8" />
    </button>
  );
};
