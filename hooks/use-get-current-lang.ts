import { useCurrentLangStore } from "@/components/language-selector/use-current-lang-store";

import { useGetLangParams } from "./use-get-lang-params";

export const useGetCurrentLang = ({ useParams } = { useParams: false }) => {
  const langParams = useGetLangParams();

  const currentLang = useCurrentLangStore((state) => state.currentLang);
  const lang = langParams || currentLang || "zh";

  if (useParams) {
    return langParams;
  }

  return lang;
};
