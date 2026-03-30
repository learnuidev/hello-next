import { ContentTranscription } from "@/domain/content/content.api";

export interface CurrentTranscriptionProps {
  currentTranscription: ContentTranscription;
  seekAndPlay?: (time: number) => void;
  containsChinglish: boolean;
  className?: string;
  contentId?: string;
  lang: string;
  hideEnglish?: boolean;
  currentTime: number;
}
