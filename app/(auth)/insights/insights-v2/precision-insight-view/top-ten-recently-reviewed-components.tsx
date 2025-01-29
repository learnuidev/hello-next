"use client";

import Link from "next/link";
import { useGetTopTenRecentlyReviewed } from "./use-get-top-ten-recently-reviewed";

export const TopTenRecentlyReviewedComponents = () => {
  const topTenRecentlyReviewed = useGetTopTenRecentlyReviewed();

  if (topTenRecentlyReviewed?.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gray-50 dark:bg-black p-4">
      <p className="text-lg mb-4 dark:text-gray-400">
        {" "}
        Recently Reviewed Components
      </p>
      <div className="space-y-2">
        {topTenRecentlyReviewed?.map((component: any) => {
          return (
            <Link
              key={"lang"}
              href={`/nmm/${encodeURIComponent(component?.hanzi)}?lang=${component?.lang || "zh"}`}
              target="_blank"
              className="block"
            >
              <div className="flex justify-between">
                <p className="text-left dark:text-gray-300 font-extralight">
                  {component?.hanzi}{" "}
                  <span className="dark:text-gray-400">
                    ({component?.pinyin})
                  </span>
                </p>

                <div className="text-left dark:text-gray-400 font-extralight">
                  {component?.totalAttempts}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
