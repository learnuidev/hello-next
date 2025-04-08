// 1. Declare a var
let res = [];

// 2. Function to Update the res
const updateRes = () => {
  const hanzi = document.getElementById("subtitle").children?.[0]?.innerText;
  const en = document.getElementById("subtitle").children?.[1]?.innerText;

  res.push({
    en,
    text: hanzi,
    time: document.getElementById("movie_player").getCurrentTime(),
  });
};
setInterval(updateRes, 5);

// 3. Function to Format Res
const formatRes = (res, lang = "zh") => {
  return [...new Set(res.filter((x) => x.text).map((x) => x.text))]
    .map((x) => {
      const items = res.filter((item) => item.text === x);
      const times = items.map((item) => item.time);
      const start = Math.min(...times);
      const end = Math.max(...times);
      return {
        en: items?.[0]?.en,
        input: x,
        lang,
        start,
        end,
      };
    })
    .sort((a, b) => a.end - b.end);
};
