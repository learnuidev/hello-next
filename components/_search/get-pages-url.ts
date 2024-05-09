export const getPagesUrl = (query: string) => {
  const [objective, lang, ...rest] = query?.split(" ");

  const homePageUrl = "/";
  const timelineUrl = "/timeline";

  const pages = {
    timeline: timelineUrl,
    t: timelineUrl,
    tl: timelineUrl,
    home: homePageUrl,
  } as any;

  const page = pages[objective?.toLowerCase()];

  return page;
};
