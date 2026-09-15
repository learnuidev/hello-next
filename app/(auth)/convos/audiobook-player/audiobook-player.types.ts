import { ContentTranscription } from "@/domain/content/content.api";

/** A cue as it is being edited, before it is saved back to the content. */
export type LocalTranscription = ContentTranscription & { _isNew?: boolean };

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
