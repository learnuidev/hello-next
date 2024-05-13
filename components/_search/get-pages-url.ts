export const getPagesUrl = (query: string) => {
  const [objective, lang, ...rest] = query?.split(" ");

  const homePageUrl = "/";
  const timelineUrl = "/timeline";
  const insightsUrl = "/insights";

  const pages = {
    timeline: timelineUrl,
    t: timelineUrl,
    tl: timelineUrl,
    stats: timelineUrl,
    i: insightsUrl,
    h: homePageUrl,
    hm: homePageUrl,
    home: homePageUrl,
  } as any;

  const page = pages[objective?.toLowerCase()];

  return page;
};
