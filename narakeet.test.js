const { narakeetApi } = require("narakeet");

const narakeet = narakeetApi({
  apiKey: "",
});

narakeet.listVoices().then((voices) => {
  console.log("VOICES", voices);
});
