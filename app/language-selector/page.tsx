"use client";

import { useCurrentLangStore } from "@/components/language-selector/use-current-lang-store";
import { LanguageButton } from "../next/features/phrase/language-button";
import { languages } from "../next/features/phrase/languages";
import { useRouter } from "next/navigation";
import { usePreviousPathnameStore } from "@/components/language-selector/use-previous-path-name-store";
import { useClipboardViewMode } from "../(auth)/clipboard/hooks/use-clipboard-view-mode";
import { useClipboardState } from "../(auth)/clipboard/hooks/use-clipboard-state";

export default function LanguageSelector() {
  const setCurrentLang = useCurrentLangStore((state) => state.setCurrentLang);
  const router = useRouter();
  const { setPreviousPath, previousPath } = usePreviousPathnameStore();

  const { mode, setMode } = useClipboardViewMode();
  const { state, setState } = useClipboardState();
  return (
    <main className="items-center flex justify-center">
      <div>
        <h1 className="text-center font-bold text-2xl mb-4 mt-32">
          I want to learn
        </h1>

        <div className="grid grid-cols-3 gap-8 mt-8">
          {languages.map((lang) => {
            return (
              <div
                onClick={() => {
                  new Promise((resolve, reject) => {
                    const langItem = lang.shortId;
                    setCurrentLang(langItem);
                    resolve(langItem);
                  }).then((langId: any) => {
                    if (previousPath === "/clipboard") {
                      setMode("edit");
                    }
                    router.push(previousPath);

                    setPreviousPath(null);
                  });
                }}
                key={JSON.stringify(lang)}
                className="flex flex-col items-center"
              >
                <LanguageButton
                  lang={lang}
                  onClick={() => {
                    setCurrentLang(lang.id);
                  }}
                />

                <p>{lang?.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
