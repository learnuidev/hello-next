const processDigMandarin = (level) => {
  let res = [];
  let currentTopic;
  let items = [...document.querySelectorAll("tr")]
    .slice(1)
    .map((x) => [...x.children].map((x) => x.innerText).filter(Boolean));

  for (let item of items) {
    if (item?.length === 1) {
      currentTopic = item[0];
    } else {
      res.push({
        input: item[0],
        hanzi: item[0],
        pinyin: item[1],
        en: item[2],
        type: currentTopic,
        level,
        lang: "zh",
      });
    }
  }

  return res;
};
