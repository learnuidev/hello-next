import { characterMap } from "@/app/nmm/character-map";

export const getGroup = (comp: { pinyin: string }) => {
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
