"use client";

import Link from "next/link";
import { useGetTopTenIncorrect } from "./use-get-top-ten-incorrect";

export const TopTenIncorrectComponents = () => {
  const topTenIncorrect = useGetTopTenIncorrect();

  if (!topTenIncorrect) {
    return null;
  }

  return (
    <div className="w-full bg-gray-50 dark:bg-black p-4">
      <p className="text-lg mb-4 dark:text-gray-400">
        Top Incorrect Components
      </p>
      <div className="space-y-2">
        {topTenIncorrect?.map((component: any) => {
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

                <div className="text-left dark:text-gray-400">
                  {component?.totalIncorrect}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
