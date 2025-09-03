import { isChinesePunctuation } from "./is-chinese-punctuation";

export const formatRoman = (item: {
  input: string;
  pinyin?: string;
  roman?: string;
  hanzi?: string;
}) => {
  if ([item?.pinyin, item?.roman].includes("none")) {
    return item.input;
  }

  // if (isChinesePunctuation(item?.input || item?.hanzi || "")) {
  //   return item?.input || item?.hanzi;
  // }

  return item?.pinyin || item?.roman;
};
