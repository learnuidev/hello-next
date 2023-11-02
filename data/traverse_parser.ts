// const word = `https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/LEVEL13-%E6%88%91%E5%8F%AB%E9%9D%A2%E5%8C%85-%E5%A5%B3.mp3`

// import { cleanString } from "@/data/convos/bm1/utils";

const url = `https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint`;

// @ts-ignore-all
const cleanString = (str) => {
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
    ?.replaceAll("、", "")
    ?.replaceAll("（", "")
    ?.replaceAll("）", "")
    ?.replaceAll("，", "")
    ?.replaceAll("：", "");
};

// @ts-ignore-all
const parser = (document, level) => {
  return [...document.querySelectorAll(".react-flow__node")]
    .map((x) => x?.children[0]?.children[4]?.children[0].children[0].innerText)
    .filter(Boolean)
    .map((x) => {
      // prop | word | sentence
      const type = x?.toLocaleLowerCase()?.includes("prop")
        ? "prop"
        : x.length <= 2
        ? "word"
        : "sentence";

      const id = cleanString(x);
      const female = `${url}/${level}-${encodeURI(`${id}-女`)}.mp3`;
      const male = `${url}/${level}-${encodeURI(`${id}-男`)}.mp3`;
      return {
        hanzi: x,
        type,
        audio: {
          female,
          male,
        },
        id,
      };
    });
};

parser(document, "LEVEL13");
