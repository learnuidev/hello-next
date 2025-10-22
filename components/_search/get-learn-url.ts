export const getLearnUrl = (query: string) => {
  const [objective, lang, ...rest] = query?.split(" ");

  if (["fa", "persian", "farsi"]?.includes(lang?.toLowerCase())) {
    return `/nmm?lang=fa`;
  }
  if (
    [
      "zh",
      "chinese",
      "xi's",
      "xis",
      "zhang",
      "zhang's",
      "zhangs",
      "jackie",
      "maos",
      "mao",
      "mao's",
    ]?.includes(lang?.toLowerCase())
  ) {
    return `/`;
  }
  if (["ar", "arabic"]?.includes(lang?.toLowerCase())) {
    return `/nmm?lang=ar`;
  }
  // if (["mallu", "malayalam"]?.includes(lang?.toLowerCase())) {
  //   return `/nmm?lang=ml`;
  // }
  if (["nepali"]?.includes(lang?.toLowerCase())) {
    return `/nmm?lang=ne`;
  }
  if (["korean", "ko", "kim's", "kims"]?.includes(lang?.toLowerCase())) {
    return `/nmm?lang=ko`;
  }
  if (
    ["japanese", "ja", "luffys", "luffy's", "goku's", "gokus"]?.includes(
      lang?.toLowerCase()
    )
  ) {
    return `/nmm?lang=ja`;
  }

  // Spanish Support
  if (["es", "spanish"]?.includes(lang?.toLowerCase())) {
    return `/nmm?lang=es`;
  }
};
