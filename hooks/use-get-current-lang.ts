import { useCurrentLangStore } from "@/components/language-selector/use-current-lang-store";
import { useSearchParams } from "next/navigation";

export const useGetCurrentLang = () => {
  const searchParams = useSearchParams();

  const setCurrentLang = useCurrentLangStore((state) => state.currentLang);
  const lang = setCurrentLang || searchParams.get("lang") || "zh";

  return lang;
};
