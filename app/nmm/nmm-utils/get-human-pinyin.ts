import { IComponent } from "@/domain/lesson/component.queries";
import { characterMap } from "../character-map";

export const getHumanPinyin = (comp: IComponent) => {
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
