import { ContentTranscription } from "@/domain/content/content.api";

export interface CurrentTranscriptionProps {
  currentTranscription: ContentTranscription;
  seekAndPlay: (time: number) => void;
  containsChinglish: boolean;
}
