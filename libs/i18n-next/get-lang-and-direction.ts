import { i18nConfig } from "./i18n-config";
import { dir } from "i18next";

import { cookies } from "next/headers";

export const getLangAndDirection = async () => {
  const lang = (await cookies()).get(i18nConfig.cookieName)?.value;
  const direction = dir(lang);

  return {
    lang,
    direction,
  };
};
