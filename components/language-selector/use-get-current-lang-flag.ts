import { languages } from "@/app/next/features/phrase/languages";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

export const useGetCurrentLangFlag = () => {
  const currentLang = useGetCurrentLang();

  const language =
    languages?.find((lang) => lang?.shortId === currentLang) || languages?.[0];

  return language;
};
