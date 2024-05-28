export const getPagesUrl = (query: string) => {
  // const [objective, lang, ...rest] = query?.split(" ");

  const homePageUrl = "/";
  const timelineUrl = "/timeline";
  const insightsUrl = "/insights";
  const chatUrl = "/chat";
  const pinyinUrl = "/pinyin";

  const pages = {
    timeline: timelineUrl,
    t: timelineUrl,
    tl: timelineUrl,
    stats: timelineUrl,
    i: insightsUrl,
    h: homePageUrl,
    hm: homePageUrl,
    home: homePageUrl,
    chat: chatUrl,
    pinyin: pinyinUrl,
    ht: pinyinUrl,
    hc: pinyinUrl,
  } as any;

  const page = pages[query?.toLowerCase()];

  return page;
};
