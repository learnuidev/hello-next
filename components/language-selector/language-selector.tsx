"use client";

import { LanguageButton } from "@/app/next/features/phrase/language-button";
import { usePathname, useRouter } from "next/navigation";
import { useGetCurrentLangFlag } from "./use-get-current-lang-flag";

export const LanguageSelector = () => {
  const pathName = usePathname();

  const language = useGetCurrentLangFlag();

  const router = useRouter();

  if (pathName?.includes("/convos/")) {
    return null;
  }

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
