// 1. Declare a var
let res = [];

// 2. Function to Update the res
const updateRes = () => {
  const item = document.querySelector(".ytp-caption-segment")?.innerText;

  res.push({
    text: item,
    time: document.getElementById("movie_player").getCurrentTime(),
  });
};
setInterval(updateRes, 50);

// 3. Function to Format Res
const formatRes = (res) => {
  return [...new Set(res.filter((x) => x.text).map((x) => x.text))].map((x) => {
    const items = res.filter((item) => item.text === x);
    const times = items.map((item) => item.time);
    const start = Math.min(...times);
    const end = Math.max(...times);
    return {
      hanzi: x,
      start,
      end,
    };
  });
};
