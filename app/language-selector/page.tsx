"use client";

import { useCurrentLangStore } from "@/components/language-selector/use-current-lang-store";
import { LanguageButton } from "../next/features/phrase/language-button";
import { languages } from "../next/features/phrase/languages";
import { useRouter } from "next/navigation";

export default function LanguageSelector() {
  const setCurrentLang = useCurrentLangStore((state) => state.setCurrentLang);
  const router = useRouter();
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
                    router.push(`/nmm?lang=${langId}`);
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
