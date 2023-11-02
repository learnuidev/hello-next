import { level13 } from "./level_13";
import { level14 } from "./level_14";
import { level15 } from "./level_15";
import { level16 } from "./level_16";
import { level17 } from "./level_17";
import { level18 } from "./level_18";
import { level19 } from "./level_19";
import { level20 } from "./level_20";

export const hmmSentences = [
  ...level13,
  ...level14,
  ...level15,
  ...level16,
  ...level17,
  ...level18,
  ...level19,
  ...level20,
]?.filter(
  (item) =>
    item.type === "sentence" &&
    !item?.hanzi
      ?.split("")
      .some((x: string) =>
        [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "j",
          "k",
          "l",
          "m",
          "n",
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
        ]?.includes(x)
      )
);
