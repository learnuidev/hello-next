const { narakeetApi } = require("narakeet");

const narakeet = narakeetApi({
  apiKey: process.env.NARAKEET_API_KEY,
});

interface INarakeetVoice {
  name: string;
  language: string;
  languageCode: string;
  styles: string[];
}

export const listVoices = (): Promise<INarakeetVoice[]> => {
  return narakeet.listVoices().then((voices: INarakeetVoice[]) => {
    return voices;
  });
};
