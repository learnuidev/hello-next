import { LanguageButton } from "@/app/next/features/phrase/language-button";
import { useCurrentLangStore } from "./use-current-lang-store";
import { languages } from "@/app/next/features/phrase/languages";
import { useRouter } from "next/navigation";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

export const LanguageSelector = () => {
  const currentLang = useGetCurrentLang();

  const language =
    languages?.find((lang) => lang?.shortId === currentLang) || languages?.[0];

  const router = useRouter();

  return (
    <div className="fixed bottom-2 right-4 dark:text-white z-50">
      <LanguageButton
        lang={language}
        onClick={() => {
          router.push(`/language-selector`);
        }}
      />
    </div>
  );
};
