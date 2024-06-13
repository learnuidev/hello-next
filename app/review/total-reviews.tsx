import Link from "next/link";
import { useGetReviewState } from "./use-get-review-state";

export const TotalReviews = ({ date }: { date: string }) => {
  const { totalLangs, groupItems, totalItems } = useGetReviewState({ date });

  return (
    <div className="">
      <div className="space-x-4 text-[16px] text-gray-500">
        {totalLangs?.slice(0, 5)?.map((lang) => {
          return (
            <Link
              className="transition hover:text-white"
              href={`/review?date=${date}&lang=${lang}`}
              key={lang}
            >
              {lang}
            </Link>
          );
        })}
      </div>

      {totalLangs?.length > 5 && (
        <p className="text-gray-500 mt-[-8px] text-[16px] mb-4">
          + {totalLangs?.length - 5}
        </p>
      )}

      <h4 className="text-sm text-gray-700">{totalItems} items </h4>
    </div>
  );
};
