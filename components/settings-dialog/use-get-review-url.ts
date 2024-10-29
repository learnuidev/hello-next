import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { useUnreviwedCharacters } from "@/app/review/use-unreviewed-characters";
import { useBeltStore } from "../use-belt-store";
import { useLearningModeStore } from "./learning-mode.store";

export const useGetReviewUrl = () => {
  const mode = useLearningModeStore((state) => state.mode);

  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const { level } = useGetReviewParams();

  const hskLevel = level;

  // console.log("selectedLevel", selectedLevel);

  const { data: unReviewedCharacters } = useUnreviwedCharacters();

  if (["hsk3", "hsk"]?.includes(mode)) {
    return `/review?mode=${mode}&character=${unReviewedCharacters?.[0]?.hanzi}&level=${hskLevel}`;
  }

  if (unReviewedCharacters?.[0]?.hanzi) {
    return `/review?character=${unReviewedCharacters?.[0]?.hanzi}`;
  } else {
    return "/review";
  }
};
