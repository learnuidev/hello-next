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
  /**
   * The ~60fps playhead from `useSmoothPlayhead`. The reader passes it so the
   * line being read can fill character by character exactly the way the karaoke
   * view does; without it these views keep their static highlight.
   */
  timeRef?: React.MutableRefObject<number> | null;
}
