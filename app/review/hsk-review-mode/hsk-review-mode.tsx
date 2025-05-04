import { SelectHskReviewMode } from "@/app/review/hsk-review-mode/select-hsk-review-mode";
import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { HskExamMode } from "@/app/review/hsk-review-mode/hsk-exam-mode/hsk-exam-mode";
import { ReviewModeClassic } from "@/app/review/review-mode";

export const HskReviewMode = () => {
  const { studyMode } = useGetReviewParams();

  if (studyMode === "exam") {
    return <HskExamMode />;
  }

  if (studyMode === "srs") {
    return <ReviewModeClassic />;
  }

  return <SelectHskReviewMode />;
};
