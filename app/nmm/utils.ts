export const calculateColor = (dict: any) => {
  switch (parseInt(dict?.tone)) {
    case 1:
      return "hover:text-rose-400";
    case 2:
      return "hover:text-teal-400";
    case 3:
      return "hover:text-purple-400";
    case 4:
      return "hover:text-pink-400";
    case 5:
      return "hover:text-gray-600 hover:dark:text-white";
    default:
      return "";
  }
};

export const calculateBorderColor = (dict: any) => {
  switch (parseInt(dict?.tone)) {
    case 1:
      return "border-red-400";
    case 2:
      return "border-teal-500";
    case 3:
      return "border-purple-400";
    case 4:
      return "border-pink-300";
    // default:
    //   return "dark:text-white";
  }
};

export const belts = [
  {
    fill: "bg-white",
    color: "text-white",
    unselected: "bg-gray-800",
    maxCharacterLevel: 105,
    minCharacterLevel: 0,
    level: "white",
    hskLevel: 1,
  },

  {
    fill: "bg-yellow-600",
    unselected: "bg-gray-800",
    color: "text-yellow-500",
    maxCharacterLevel: 300,
    minCharacterLevel: 105,
    level: "yellow",
    hskLevel: 2,
  },
  {
    fill: "bg-green-600",
    unselected: "bg-gray-800",
    color: "text-green-500",
    maxCharacterLevel: 600,
    minCharacterLevel: 300,
    level: "green",
    hskLevel: 3,
  },
  {
    fill: "bg-blue-600",
    unselected: "bg-gray-800",
    color: "text-blue-500",
    maxCharacterLevel: 1000,
    minCharacterLevel: 600,
    level: "blue",
    hskLevel: 4,
  },
  {
    fill: "bg-rose-500",
    unselected: "bg-gray-800",
    color: "text-red-500",
    maxCharacterLevel: 1500,
    minCharacterLevel: 1000,
    level: "red",
    hskLevel: 5,
  },
  {
    fill: "bg-pink-500",
    unselected: "bg-gray-800",
    color: "text-pink-500",
    maxCharacterLevel: 2200,
    minCharacterLevel: 1500,
    level: "pink",
    hskLevel: 6,
  },
  {
    fill: "bg-gray-500",
    unselected: "bg-slate-800",
    color: "text-gray-500",
    maxCharacterLevel: 3050,
    minCharacterLevel: 2200,
    level: "black",
    hskLevel: 9,
  },

  // {
  //   fill: "bg-violet-500",
  //   color: "text-white",
  //   unselected: "bg-gray-800",
  //   maxCharacterLevel: 3500,
  //   minCharacterLevel: 0,
  //   level: "all",
  // },
];

const characterMap = {
  ā: "a",
  á: "a",
  ǎ: "a",
  à: "a",
  ē: "e",
  é: "e",
  ě: "e",
  è: "e",
  ī: "i",
  í: "i",
  ǐ: "i",
  ì: "i",
  ō: "o",
  ó: "o",
  ǒ: "o",
  ò: "o",
  ū: "u",
  ú: "u",
  ǔ: "u",
  ù: "u",
  ü: "u",
  ǚ: "u",
} as any;

export const getHumanPinyin = (comp: { pinyin: string }) => {
  return comp?.pinyin
    ?.split("")
    ?.map((item) => {
      const char = characterMap[item];

      if (char) {
        return char;
      }

      return item;
    })
    ?.join("")
    ?.toLowerCase();
};

export const filterComponent = (
  query: string,
  comp: any,
  meta?: any,
  isQuerySameAsVal = false
) => {
  if (query) {
    const metaComp = meta?.find((item: any) => item?.hanzi === comp?.hanzi);

    const storyJSON = JSON.stringify(metaComp?.story)?.toLowerCase() || "";

    const component = comp?.en ? comp : metaComp || comp;

    const englishPinyin = getHumanPinyin({ ...comp, ...metaComp });

    const en = `${comp?.en} ${metaComp?.en}`;

    // First Filter
    if (
      query?.toLowerCase() === englishPinyin ||
      query?.toLowerCase() === (comp?.hanzi || metaComp?.hanzi)
    ) {
      return {
        ...comp,
        ...metaComp,
        score: 1,
      };
    }

    // Second Filter
    if (!isQuerySameAsVal && storyJSON.includes(query?.toLowerCase())) {
      return {
        ...comp,
        ...metaComp,
        score: 1,
      };
    }

    if (englishPinyin?.includes(query?.toLowerCase())) {
      return {
        ...comp,
        ...metaComp,
        score: 0.5,
      };
    }

    if (query?.toLowerCase() === component?.en?.toLowerCase()) {
      return {
        ...comp,
        ...metaComp,
        score: 0.4,
      };
    }
    if (query?.toLowerCase() === component?.query?.toLowerCase()) {
      return {
        ...comp,
        ...metaComp,
        score: 0.3,
      };
    }
    if (component?.query?.toLowerCase()?.includes(query?.toLowerCase())) {
      return {
        ...comp,
        ...metaComp,
        score: 0.2,
      };
    }

    const queryLength = query?.length;

    if (
      en?.slice(0, queryLength)?.toLowerCase()?.includes(query?.toLowerCase())
    ) {
      return {
        ...comp,
        ...metaComp,
        score: 0.3,
      };
    }

    if (en?.toLowerCase()?.includes(query?.toLowerCase())) {
      return {
        ...comp,
        ...metaComp,
        score: 0.2,
      };
    }

    if (
      (comp?.es || metaComp?.es)?.toLowerCase()?.includes(query?.toLowerCase())
    ) {
      return {
        ...comp,
        ...metaComp,
        score: 0.2,
      };
    }
    if (
      (comp?.lang || metaComp?.lang)
        ?.toLowerCase()
        ?.includes(query?.toLowerCase())
    ) {
      return {
        ...comp,
        ...metaComp,
        score: 0.2,
      };
    }

    return null;
  } else {
    return { ...comp, score: 1 };
  }
};

export const filterComponents = (
  components: any,
  query: string,
  characters?: any,
  isQuerySameAsVal = false
) => {
  const filteredComponents = components?.length
    ? components
        // .filter((component: any) => component?.hanzi?.length <= 3)
        .map((component: any) => {
          return filterComponent(
            query,
            component,
            characters,
            isQuerySameAsVal
          );
        })
        .filter(Boolean)
        .sort((a: any, b: any) => b.score - a.score)
    : //
      [];

  return filteredComponents;
};

export const filterNonHanYu = (hanzi: string): boolean =>
  ![
    "？",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "”",
    "“ ",
    "，",
    "：",
    "；",
    "、",
    "！",
    "（",
    "）",
    "“",
    "。",
    "‘",
    "’",
    "《",
    "》",
    "/",
    "!",
    "(",
    ")",
    ".",
    "?",
    "",
    " ",
    ",",
    " ！",
    " ,",
    "｜",
    " ",
  ]?.includes(hanzi?.toLowerCase());
