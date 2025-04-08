// 1. Declare a var
let res = [];

// 2. Function to Update the res
const updateRes = () => {
  const item = [...document.querySelectorAll(".ytp-caption-segment")]
    .map((x) => x.innerText)
    .join(" ");

  res.push({
    text: item,
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
        input: x,
        roman: "",
        lang,
        en: "",
        start,
        end,
      };
    })
    .sort((a, b) => a.end - b.end);
};
