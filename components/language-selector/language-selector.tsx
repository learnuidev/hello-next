import { LanguageButton } from "@/app/next/features/phrase/language-button";
import { useCurrentLangStore } from "./use-current-lang-store";
import { languages } from "@/app/next/features/phrase/languages";
import { usePathname, useRouter } from "next/navigation";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { usePreviousPathnameStore } from "./use-previous-path-name-store";

export const LanguageSelector = () => {
  const currentLang = useGetCurrentLang();

  const pathName = usePathname();

  const { setPreviousPath } = usePreviousPathnameStore();

  const language =
    languages?.find((lang) => lang?.shortId === currentLang) || languages?.[0];

  const router = useRouter();

  if (pathName?.includes("/convos") || pathName?.includes("/nmm/")) {
    return null;
  }

  return (
    <div className="fixed bottom-2 right-4 dark:text-white z-50">
      <LanguageButton
        lang={language}
        onClick={() => {
          console.log("PATH NAME");
          setPreviousPath(pathName);
          router.push(`/language-selector`);
        }}
      />
    </div>
  );
};
