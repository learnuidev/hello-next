const littleFoxParser = () => {
  const extractElements = (child) => {
    const pinyins = child.children[0].children[0].innerText.split("\n");
    const hanzis = child.children[1].children[0].innerText.split("\n");
    const english = child.children[2].children[0].innerText.split("\n");
    return pinyins.map((pinyin, x) => {
      return {
        id: crypto.randomUUID(),
        input: hanzis[x],
        hanzi: hanzis[x],
        pinyin: pinyin,
        en: english[x],
        lang: "zh",
      };
    });
  };

  return [...document.querySelector(".desc").children]
    ?.map(extractElements)
    ?.flat();
};
