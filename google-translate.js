const { pinyin } = require("pinyin-pro");

const translateTo = async ({ text, targetLang = "en" }) => {
  const url = `https://translate-pa.googleapis.com/v1/translateHtml`;

  const xApiKey = `AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520`;

  const payload = [[[text], "auto", targetLang], "te_lib"];

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
  return data?.[0]?.[0];
};

const translate = async ({ text, targetLang = "en" }) => {
  const pinyinVal = pinyin(text);
  const data = await translateTo({ text, targetLang });

  return {
    input: text,
    pinyin: pinyinVal,
    output: data?.[0]?.[0],
  };
};
