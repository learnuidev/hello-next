"use client";

import React, { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18nInstance from "./init";
import { i18nConfig } from "./i18n-config";
import { getCookie } from "./cookie-utils";

export function I18NextProvider({ children }: { children: ReactNode }) {
  const locale = getCookie(i18nConfig.cookieName);

  useEffect(() => {
    if (i18nInstance.isInitialized) {
      i18nInstance.changeLanguage(locale);
    }
  }, [locale]);
  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
