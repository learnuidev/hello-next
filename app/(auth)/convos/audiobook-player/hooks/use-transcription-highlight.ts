import { usePreviewMode } from "@/components/settings-dialog/use-preview-mode";
import { cn } from "@/lib/utils";

/**
 * Class names used to highlight the transcription that is currently playing.
 *
 * In `focus` mode every character is painted with its tone colour inside
 * `<CharacterItem />`. Those colours are passed as `className` last to `cn()`,
 * which is backed by tailwind-merge, so a monochrome text colour applied here
 * would replace them and the current transcription would render plain
 * white/black while the rest of the transcript keeps its colours.
 *
 * That is why the monochrome colour is only forced outside of `focus` mode:
 * the highlight stays (background + full opacity) while the tone colours of the
 * current transcription survive.
 */
export const useTranscriptionHighlight = ({
  background,
}: {
  background: string;
}) => {
  const { currentMode } = usePreviewMode();

  const isFocusMode = currentMode?.current === "focus";

  return {
    isFocusMode,
    activeClassName: cn(
      background,
      !isFocusMode && "dark:text-white text-black",
    ),
    /**
     * What every other transcription wears.
     *
     * A tone rather than a fade: the text keeps its edge and simply takes the
     * colour of the page — light on white, dark on black — so the page reads as
     * one sheet with the line being read standing out of it, instead of a page
     * of ghosts. The stage blurs those lines as well; the tone is what stops
     * the blur alone from having to carry the whole contrast.
     *
     * `focus` mode is the exception, and deliberately so: there the tone
     * colours *are* the reading, so nothing is muted and the blur is left to
     * set the current transcription apart on its own.
     */
    inactiveClassName: isFocusMode ? "" : "text-gray-400 dark:text-gray-600",
  };
};
