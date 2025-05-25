import { LanguageButton } from "@/app/next/features/phrase/language-button";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { usePathname, useRouter } from "next/navigation";
import { useGetCurrentLangFlag } from "./use-get-current-lang-flag";
import { usePreviousPathnameStore } from "./use-previous-path-name-store";

export const LanguageSelector = () => {
  const currentLang = useGetCurrentLang();

  const pathName = usePathname();

  const { setPreviousPath, previousPath } = usePreviousPathnameStore();

  const language = useGetCurrentLangFlag();

  const router = useRouter();

  if (pathName?.includes("/convos/") || pathName?.includes("/nmm/")) {
    return null;
  }

  return (
    <div className="fixed bottom-2 right-4 dark:text-white z-50">
      <LanguageButton
        lang={language}
        onClick={() => {
          if (previousPath) {
            router.push(previousPath);
            setPreviousPath(null);
            return;
          } else {
            setPreviousPath(pathName);
            router.push(`/language-selector`);
          }
        }}
      />
    </div>
  );
};
