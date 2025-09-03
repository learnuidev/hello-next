// 1. Declare a var
let res = [];

// 2. Function to Update the res
const updateRes = () => {
  try {
    const hanzi = [...document.querySelectorAll(".caption_bar")?.[2]?.children]
      .map((x) => x?.getAttribute("data-lookup"))
      .join(" ");
    const pinyin = [...document.querySelectorAll(".caption_bar")?.[2]?.children]
      .map((x) => x?.children[2])
      .map((x) => x?.innerText)
      .join(" ");
    const en = document.querySelectorAll(".caption_bar")?.[3]?.innerText;

    const time = document.querySelector("video").currentTime;

    res.push({
      hanzi: hanzi,
      pinyin,
      en,
      time,
    });
  } catch (err) {}
};
setInterval(updateRes, 5);

// 3. Function to Format Res
const formatRes = (res) => {
  const subtitles_map = Object.groupBy(res, (item) => item.hanzi);
  return Object.entries(subtitles_map).map((item) => {
    const [k, v] = item;
    const times = v.map((item) => item.time);
    const start = Math.min(...times);
    const end = Math.max(...times);
    const pinyin = v?.[0]?.pinyin;
    const en = v?.[0]?.en;

    return {
      hanzi: k,
      start,
      pinyin,
      en,
      end,
    };
  });
};
