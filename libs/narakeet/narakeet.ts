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

export interface IStartGeneratingAudioParams {
  text: string;
  voice: string;
  speed: number;
  volume: "x-loud" | "loud" | "standard" | "soft" | "x-soft" | "normalized";
}

export interface IStartGeneratingAudioResponse {
  requestId: string;
  taskId: string;
  statusUrl: string;
}

export const listVoices = (): Promise<INarakeetVoice[]> => {
  return narakeet.listVoices().then((voices: INarakeetVoice[]) => {
    return voices;
  });
};

export const startGeneratingAudio = (
  params: IStartGeneratingAudioParams
): Promise<IStartGeneratingAudioResponse> => {
  return narakeet
    .startGeneratingAudio(params)
    .then((resp: IStartGeneratingAudioResponse) => {
      return resp;
    });
};

export interface IGetAudioResourceParams {
  statusUrl: string;
}
export interface IGetAudioResourceResponse {
  percent: number;
  finished: boolean;
  succeeded: boolean;
  message: string;
  result: string;
  durationInSeconds: number;
}

export const getAudioResource = (params: IGetAudioResourceParams) => {
  return narakeet
    .getAudioResource(params)
    .then((resp: IGetAudioResourceResponse) => {
      return resp;
    });
};
