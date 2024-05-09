import { getLearnUrl } from "./get-learn-url";
import { getPagesUrl } from "./get-pages-url";
import { getShortCutUrl } from "./get-shortcut-url";

export const getNavigationUrl = (query: string) => {
  const [objective, lang, ...rest] = query?.split(" ");

  // ======== Stage 1: Pages ========
  const pagesUrl = getPagesUrl(query);
  if (pagesUrl) {
    return pagesUrl;
  }

  // ======== Stage 2: ShortCut ========
  const shortCutUrl = getShortCutUrl(query);
  if (shortCutUrl) {
    return shortCutUrl;
  }

  // ======== Stage 3: Learn ========
  if (objective === "learn") {
    return getLearnUrl(query);
  }

  // ======== Stage 4: Search ========
  return null;
};
