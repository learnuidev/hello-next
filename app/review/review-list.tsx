import { useReviewStore } from "./review-store";
import { MonthlyReview } from "./monthly-view";
import { YearlyReview } from "./yearly-view";

export const ReviewList = () => {
  const viewType = useReviewStore((state: any) => state.viewType);

  if (viewType === "month") {
    return <MonthlyReview />;
  }
  if (viewType === "year") {
    return <YearlyReview />;
  }

  return <MonthlyReview />;
};
