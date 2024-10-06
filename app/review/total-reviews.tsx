import Link from "next/link";
import { useGetReviewState } from "./use-get-review-state";

export const TotalReviews = ({
  date,
  year,
  month,
}: {
  date?: string;
  year?: number;
  month?: number;
}) => {
  const { totalLangs, groupItems, totalItems } = useGetReviewState({
    date,
    year,
    month,
  });

  return (
    <div className="">
      <div className="space-x-4 text-[16px] text-gray-500 truncate">
        {groupItems?.map((item) => {
          return (
            <Link
              className="transition hover:text-white"
              href={
                `/nmm/${item?.hanzi}` + item?.lang ? `?lang=${item?.lang}` : ""
              }
              target="_blank"
              key={item?.id}
            >
              {item?.hanzi}
            </Link>
          );
        })}

        {totalLangs?.length > 5 && (
          <span className="text-gray-500 text-[16px]">
            + {totalLangs?.length - 3}
          </span>
        )}
      </div>
      <div className="space-x-4 text-[16px] text-gray-500">
        {totalLangs?.slice(0, 3)?.map((lang) => {
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

        {totalLangs?.length > 5 && (
          <span className="text-gray-500 text-[16px]">
            + {totalLangs?.length - 3}
          </span>
        )}
      </div>

      <h4 className="text-sm text-gray-700">{totalItems} items </h4>
    </div>
  );
};
