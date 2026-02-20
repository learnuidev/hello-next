import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { useUnreviwedCharacters } from "@/app/review/use-unreviewed-characters";

import { useRecentlyWatchedContent } from "@/app/(auth)/convos/use-recently-watched-content-store";
import { useDiaryParams } from "@/app/(auth)/diary/hooks/use-diary-params";
import { useParams } from "next/navigation";
import { useLearningMode } from "./learning-mode.store";

export const getReviewSearchParams = ({
  mode,
  character,
  entryId,
  level,
  studyMode,
  date,
  input,
  reviewSpeed,
  reviewMode,
}: any) => {
  return getReviewUrl({
    mode,
    character,
    entryId,
    level,
    studyMode,
    date,
    input,
    reviewSpeed,
    reviewMode,
  });
};

export const useGetReviewUrl = ({ reviewMode } = {} as any) => {
  const { mode } = useLearningMode();

  const params = useParams();
  const contentId = params["content-id"];

  const { entryId } = useDiaryParams();

  const { level, reviewSpeed } = useGetReviewParams();

  const { data: unReviewedCharacters } = useUnreviwedCharacters();

  const { recentlyWatched } = useRecentlyWatchedContent();

  const inputParams = {
    mode: recentlyWatched?.[0]?.id || contentId || mode,
    entryId,
    level,
    character: unReviewedCharacters?.[0]?.hanzi,
    reviewSpeed,
    reviewMode,
  };

  return `/review?${getReviewSearchParams(inputParams)}`;
};
export const useGetReviewUrlFn = () => {
  const { mode } = useLearningMode();

  const {
    level,
    reviewSpeed,
    input: inputParams,
    entryId,
  } = useGetReviewParams();

  const { data: unReviewedCharacters } = useUnreviwedCharacters();

  return ({ reviewMode, character, input } = {} as any) =>
    `/review?${getReviewSearchParams({
      mode,
      level,
      entryId,
      input: input || inputParams,
      character: character || unReviewedCharacters?.[0]?.hanzi,
      reviewSpeed,
      reviewMode,
    })}`;
};

export const getReviewUrl = ({
  mode,
  character,
  entryId,
  level,
  studyMode,
  date,
  input,
  reviewSpeed,
  reviewMode,
}: any) => {
  const urlSearchParams = new URLSearchParams();

  if (reviewSpeed) {
    urlSearchParams.set("review-speed", reviewSpeed);
  }
  if (reviewMode) {
    urlSearchParams.set("review-mode", reviewMode);
  }

  if (input) {
    urlSearchParams.set("input", input);
    return urlSearchParams.toString();
  }

  if (date) {
    urlSearchParams.set("date", date);
    return urlSearchParams.toString();
  }

  if (entryId) {
    urlSearchParams.set("entry-id", entryId);
  } else {
    if (mode) {
      urlSearchParams.set("mode", mode);
    }
  }

  if (studyMode) {
    urlSearchParams.set("study-mode", studyMode);
  }
  if (level) {
    urlSearchParams.set("level", level);
  }

  return urlSearchParams.toString();
};
