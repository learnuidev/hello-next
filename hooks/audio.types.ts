type SpeechMarkChunk = {
  start: number;
  end: number;
  startTime: number;
  endTime: number;
  type: "word";
  value: string;
};

type SpeechMarks = {
  chunks: SpeechMarkChunk[];
  start: number;
  end: number;
  startTime: number;
  endTime: number;
  type: "sentence";
  value: string;
};

export type GetAudioResponse = {
  lastUpdated: number; // Unix timestamp in milliseconds
  speechMarks: SpeechMarks;
  id: string;
  s3Key: string;
  audioUrl: string;
};

export interface GetAudioRequest {
  text: string;
  lang: string;
}
