import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { useUnreviwedCharacters } from "@/app/review/use-unreviewed-characters";

import { useLearningModeStore } from "./learning-mode.store";

export const getReviewSearchParams = ({
  mode,
  character,
  level,
  studyMode,
  date,
}: any) => {
  const urlSearchParams = new URLSearchParams();

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
