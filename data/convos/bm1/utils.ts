"use client";

export const cleanString = (str: string) => {
  return str
    ?.split("")
    ?.filter(Boolean)
    .join("")
    ?.trim()
    ?.replaceAll("？", "")
    ?.replaceAll("！", "")
    ?.replaceAll("！ ", "")
    ?.replaceAll(" ", "")
    ?.replaceAll("，", "")
    ?.replaceAll("。", "")
    ?.replaceAll("!", "")
    ?.replaceAll(" ", "")
    ?.replaceAll(",", "")
    ?.replaceAll(".", "")
    ?.replaceAll("?", "")
    ?.replaceAll("…", "")
    ?.replaceAll("Cindy", "")
    ?.replaceAll("：", "")
    ?.replaceAll(":", "")
    ?.replaceAll("：", "")
    ?.replaceAll('、', "")
    ?.replaceAll("（", "")
    ?.replaceAll("）", "")
    ?.replaceAll("，", "")
    ?.replaceAll("：", "")
    ?.replaceAll("a", "")
    ?.replaceAll("b", "")
    ?.replaceAll("c", "")
    ?.replaceAll("d", "")
    ?.replaceAll("e", "")
    ?.replaceAll("f", "")
    ?.replaceAll("g", "")
    ?.replaceAll("h", "")
    ?.replaceAll("i", "")
    ?.replaceAll("j", "")
    ?.replaceAll("k", "")
    ?.replaceAll("l", "")
    ?.replaceAll("m", "")
    ?.replaceAll("n", "")
    ?.replaceAll("p", "")
    ?.replaceAll("q", "")
    ?.replaceAll("r", "")
    ?.replaceAll("s", "")
    ?.replaceAll("t", "")
    ?.replaceAll("u", "")
    ?.replaceAll("v", "")
    ?.replaceAll("w", "")
    ?.replaceAll("x", "")
    ?.replaceAll("y", "")
    ?.replaceAll("x", "")
    
};

export const lessonParser = () => {
  const list = [
    ...(document.querySelectorAll(".lecture-text-container")[1]
      .children as any),
  ];

  const [_, chapter, title, blank, ...rest] = list;

  const actualRest = rest?.slice(0, -2);

  const titles = title.innerText?.split("\n");

  const [slow, fast] = [...(document.querySelectorAll(".audioloader") as any)];

  const slowUrl = slow?.children[0]?.children[0]?.getAttribute("data-href")
  const fastUrl = fast?.children[0]?.children[0]?.getAttribute("data-href")

  return {
    id: "lesson17",
    level: 1,
    language: "zh",
    course: "Beginner Mandarin",
    author: "xiaoma",
    location: "home",
    title: `7. ${titles?.join(" ")}`,

    audio: {
      slow: slowUrl,
      fast: fastUrl,
    },

    lessonsV2: actualRest?.map((phrase) => {
      const phraseChildren = [...phrase?.children];

      if (phraseChildren?.length === 7) {
        const [_, hanzi, sp1, pinyin, sp2, lit, en] = [...phrase?.children];

        return {
          id: cleanString(hanzi?.innerText),
          hanzi: hanzi?.innerText,
          pinyin: pinyin?.innerText,
          lit: lit?.innerText,
          en: en?.innerText,
        };
      }
      const [hanzi, sp1, pinyin, sp2, lit, en] = [...phrase?.children];

      return {
        id: cleanString(hanzi?.innerText),
        hanzi: hanzi?.innerText,
        pinyin: pinyin?.innerText,
        lit: lit?.innerText,
        en: en?.innerText,
      };
    }),
  };
};

export const lessonAdapter = (lesson: any) => {
  const [
    [timeTitle, time],
    [mandarinName, hanzi],
    [pinyinName, pinyin],
    [litName, literal],
    [enName, en],
  ] = lesson;

  return {
    id: cleanString(hanzi as string),
    time,
    names: {
      hanzi: mandarinName,
      pinyin: pinyinName,
      en: enName,
    },
    pinyin: (pinyin as string)?.trim(),
    hanzi,
    en: (en as string)?.trim(),
  };
};
