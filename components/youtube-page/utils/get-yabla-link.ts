export const getYablaLink = (hanzi: string) => {
  return `https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
    hanzi
  )}`;
};
