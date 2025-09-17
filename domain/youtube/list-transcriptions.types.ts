export interface TranscriptSegment {
  id: string;
  lang: string;
  input: string;
  start: number;
  end: number;
}

export interface TranscriptResponse {
  text: string;
  offset: number;
  duration: number;
}
