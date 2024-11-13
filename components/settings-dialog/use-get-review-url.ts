import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { useUnreviwedCharacters } from "@/app/review/use-unreviewed-characters";

import { useLearningModeStore } from "./learning-mode.store";

export const getReviewSearchParams = ({
  mode,
  character,
  level,
  studyMode,
  date,
  input,
}: any) => {
  const urlSearchParams = new URLSearchParams();

  if (input) {
    urlSearchParams.set("input", input);
    return urlSearchParams.toString();
  }

  if (date) {
    urlSearchParams.set("date", date);
    return urlSearchParams.toString();
  }

  if (mode) {
    urlSearchParams.set("mode", mode);
  }

  if (studyMode) {
    urlSearchParams.set("study-mode", studyMode);
  }
  if (level) {
    urlSearchParams.set("level", level);
  }

  return urlSearchParams.toString();
};

export const useGetReviewUrl = () => {
  const mode = useLearningModeStore((state) => state.mode);

  const { level } = useGetReviewParams();

  const { data: unReviewedCharacters } = useUnreviwedCharacters();

  return `/review?${getReviewSearchParams({ mode, level, character: unReviewedCharacters?.[0]?.hanzi })}`;
};
