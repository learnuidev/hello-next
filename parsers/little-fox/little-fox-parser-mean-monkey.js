const littleFoxParser = () => {
  const extractElements = (child) => {
    const hanzi = child.children[0];
    const en = child.children[1];

    return {
      id: crypto.randomUUID(),
      input: hanzi.innerText,
      lang: "zh",

      hanzi: hanzi.innerText,
      en: en.innerText,
    };
  };

  return [...document.querySelector(".desc").children]
    ?.map(extractElements)
    ?.flat();
};
JSON.stringify(littleFoxParser());
