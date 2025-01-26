import { useCurrentLangStore } from "@/components/language-selector/use-current-lang-store";

import { useGetLangParams } from "./use-get-lang-params";

export const useGetCurrentLang = () => {
  const langParams = useGetLangParams();

  const setCurrentLang = useCurrentLangStore((state) => state.currentLang);
  const lang = setCurrentLang || langParams || "zh";

  return lang;
};
