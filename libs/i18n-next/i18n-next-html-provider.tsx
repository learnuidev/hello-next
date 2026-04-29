import React, { ReactNode } from "react";
import { I18NextProvider } from "./i18n-next-provider";
import { getLangAndDirection } from "./get-lang-and-direction";

export async function I18NextHtmlProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { lang, direction } = await getLangAndDirection();

  return (
    <I18NextProvider>
      <html suppressHydrationWarning lang={lang} dir={direction}>
        {children}
      </html>
    </I18NextProvider>
  );
}
