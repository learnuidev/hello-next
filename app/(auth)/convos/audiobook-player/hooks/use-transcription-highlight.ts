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
    inactiveClassName: "opacity-50",
  };
};
