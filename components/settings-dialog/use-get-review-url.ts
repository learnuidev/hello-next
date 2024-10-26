import { useUnreviwedCharacters } from "@/app/review/use-unreviewed-characters";
import { useLearningModeStore } from "./learning-mode.store";
import { useBeltStore } from "../use-belt-store";

export const useGetReviewUrl = () => {
  const mode = useLearningModeStore((state) => state.mode);

  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const unReviewedCharacters = useUnreviwedCharacters();

  if (["hsk3", "hsk"]?.includes(mode)) {
    return `/review?mode=${mode}&character=${unReviewedCharacters?.[0]?.hanzi}&level=${selectedBelt.hskLevel}`;
  }

  if (unReviewedCharacters?.[0]?.hanzi) {
    return `/review?character=${unReviewedCharacters?.[0]?.hanzi}`;
  } else {
    return "/review";
  }
};
