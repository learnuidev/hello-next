export const calculateColor = (dict: any) => {
  switch (parseInt(dict?.tone)) {
    case 1:
      return "text-red-400";
    case 2:
      return "text-teal-500";
    case 3:
      return "text-purple-400";
    case 4:
      return "text-pink-400";
    default:
      return "text-gray-600 dark:text-white";
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
    default:
      return "dark:text-white";
  }
};

export const belts = [
  {
    fill: "bg-slate-100",
    color: "text-white",
    unselected: "bg-slate-800",
    maxCharacterLevel: 105,
    minCharacterLevel: 0,
    level: "white",
  },
  {
    fill: "bg-yellow-500",
    unselected: "bg-yellow-800",
    color: "text-yellow-500",
    maxCharacterLevel: 300,
    minCharacterLevel: 105,
    level: "yellow",
  },
  {
    fill: "bg-green-500",
    unselected: "bg-green-800",
    color: "text-green-500",
    maxCharacterLevel: 600,
    minCharacterLevel: 300,
    level: "green",
  },
  {
    fill: "bg-blue-500",
    unselected: "bg-blue-800",
    color: "text-blue-500",
    maxCharacterLevel: 1200,
    minCharacterLevel: 600,
    level: "blue",
  },
  {
    fill: "bg-red-500",
    unselected: "bg-red-800",
    color: "text-red-500",
    maxCharacterLevel: 2000,
    minCharacterLevel: 1200,
    level: "red",
  },
  {
    fill: "bg-black",
    unselected: "bg-slate-800",
    color: "text-black",
    maxCharacterLevel: 3050,
    minCharacterLevel: 2000,
    level: "black",
  },
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
