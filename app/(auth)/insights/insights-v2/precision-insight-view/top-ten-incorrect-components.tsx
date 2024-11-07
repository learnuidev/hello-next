"use client";

import Link from "next/link";
import { useGetTopTenIncorrect } from "./use-get-top-ten-incorrect";

export const TopTenIncorrectComponents = () => {
  const topTenIncorrect = useGetTopTenIncorrect();

  if (!topTenIncorrect) {
    return null;
  }

  return (
    <div className="mx-auto w-80">
      <p className="text-center font-normal text-[13px] text-[#808080] my-8 font-['Gill Sans']">
        Top Ten Incorrect Components
      </p>
      <div className="space-y-2">
        {topTenIncorrect?.map((component: any) => {
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
