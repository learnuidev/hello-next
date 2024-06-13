import { cn } from "@/lib/utils";
import { useGetReviewState } from "./use-get-review-state";

export const TotalItems = ({
  className,
  date,
}: {
  className?: string;
  date: string;
}) => {
  const { totalLangs, groupItems, totalItems } = useGetReviewState({ date });

  return (
    <p className={cn("text-sm text-gray-700", className)}>
      {totalItems} items{" "}
    </p>
  );
};
