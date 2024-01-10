// Website: https://lyricspinyin.com/2023/11/30/zhe-shi-ni-qi-pan-de-zhang-da-ma-lyrics-pinyin-%E8%BF%99%E6%98%AF%E4%BD%A0%E6%9C%9F%E7%9B%BC%E7%9A%84%E9%95%BF%E5%A4%A7%E5%90%97%E6%AD%8C%E8%AF%8D%E6%8B%BC%E9%9F%B3-and-english-translation-by/

export const parseLyricsPinyin = () => {
  const node = document.querySelector(".entry-content");

  // TODO: Fix type of this
  // @ts-ignore
  return [...node.children]
    .slice(7, -11)
    .filter((elem) => {
      return elem.nodeName !== "SPAN";
    })
    .map((item) => item.innerText.trim())
    .filter(Boolean)
    .map((current, idx, ctx) => {
      if (idx === 0 || idx % 3 === 0) {
        const item = {
          hanzi: current,
          pinyin: ctx[idx + 1],
          en: ctx[idx + 2],
          start: 0,
          end: 0,
        };
        return item;
      }
    })
    .filter(Boolean);
};
