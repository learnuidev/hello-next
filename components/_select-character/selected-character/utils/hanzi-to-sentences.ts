export const hanziToSentences = (hanzi: string) =>
  hanzi
    .split("。")
    .filter(Boolean)
    .map((x) => `${x}。`)
    .map((item) => {
      const hasQuestion = item?.split("？");
      if (hasQuestion) {
        return item?.split("？").map((item) => {
          return item?.includes("。") ? item : `${item}？`;
        });
      }
    })
    .flat()
    .map((item) => {
      return {
        input: item,
        hanzi: item,
        lang: "zh",
      };
    });
