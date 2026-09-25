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
  /**
   * Where the playhead is, for the views that work it out themselves. The
   * reader sheet already knows which line is being read and passes `isActive`
   * instead — it cannot pass a live time, or every line of the book would
   * re-render as the playhead moves.
   */
  currentTime?: number;
  /**
   * True while this transcription is the one being read. Supplied by the reader
   * sheet; the start/end test is the fallback for every other caller.
   */
  isActive?: boolean;
  /**
   * The ~60fps playhead from `useSmoothPlayhead`. The reader passes it so the
   * line being read can fill character by character exactly the way the karaoke
   * view does; without it these views keep their static highlight.
   */
  timeRef?: React.MutableRefObject<number> | null;
}
