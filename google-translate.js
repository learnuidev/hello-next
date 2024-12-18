const { pinyin } = require("pinyin-pro");

const translate = async ({ text, targetLang = "en" }) => {
  const url = `https://translate-pa.googleapis.com/v1/translateHtml`;

  const xApiKey = `AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520`;

  const payload = [[[text], "auto", targetLang], "te_lib"];

  const pinyinVal = pinyin(text);

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "x-goog-api-key": xApiKey,
      "content-type": "application/json+protobuf",
      // "x-client-data": `CIi2yQEIpbbJAQipncoBCN3bygEIlaHLAQiJo8sBCJz+zAEIhqDNAQjh0M4BGI/OzQE=`,
    },
  });

  const data = await resp.json();

  return {
    input: text,
    pinyin: pinyinVal,
    output: data?.[0]?.[0],
  };
};

translate({
  // text: "我是歆姐招的法务部的实习生",
  text: "你好！我的名字是",
  targetLang: "en",
}).then((data) => {
  console.log("DATA", data);
});
