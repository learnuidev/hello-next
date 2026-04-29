"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTranslation } from "./use-translation";
import { getCookie, setCookie } from "./cookie-utils";
import { i18nConfig, Language, languagesList } from "./i18n-config";

export function LanguageSwitcher() {
  const locale = getCookie(i18nConfig.cookieName) as Language;
  const [selectedItem, setSelectedItem] = useState<Language>(
    locale || i18nConfig.fallbackLanguage
  );
  const router = useRouter();
  const { i18n } = useTranslation();
  const handleChange = async (value: Language) => {
    const newLocale = value;
    setSelectedItem(newLocale);
    // set cookie for next-i18n-router
    await i18n.changeLanguage(newLocale, () => {
      setCookie(i18nConfig.cookieName, newLocale);
    });

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          <div className="">{languagesList[selectedItem]}</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        {i18nConfig.languages.map((item) => {
          return (
            <DropdownMenuItem
              key={item}
              className="flex items-center gap-2"
              onClick={() => handleChange(item)}
            >
              <p>{languagesList[item]}</p>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
