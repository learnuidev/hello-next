"use client";

import Link from "next/link";
import { useGetTopTenRecentlyLearned } from "./use-get-top-ten-recently-learned";

export const TopTenRecentlyLearnedComponents = () => {
  const topTenRecentlyLearned = useGetTopTenRecentlyLearned();

  if (topTenRecentlyLearned?.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto w-80">
      <p className="text-center font-normal text-[13px] text-[#808080] my-8 font-['Gill Sans']">
        Recently Learned Components
      </p>
      <div className="space-y-2">
        {topTenRecentlyLearned?.map((component: any) => {
          return (
            <Link
              key={"lang"}
              href={`/nmm/${component?.hanzi}?lang=${component?.lang || "zh"}`}
              target="_blank"
              className="block"
            >
              <div className="flex justify-between">
                <p className="text-left text-gray-300 font-extralight text-sm">
                  {component?.hanzi}{" "}
                  <span className="text-gray-400">({component?.pinyin})</span>
                </p>

                <div className="text-left text-gray-400">
                  {component?.totalAttempts ||
                    component?.en
                      ?.split("/")?.[0]
                      ?.split(",")?.[0]
                      ?.split(";")?.[0]}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
