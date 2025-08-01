"use client";

import {
  GreenLightbulbDuoTone,
  RedFireDuoTone,
} from "@/components/ui/icons.v2";

export const ConvoInsightsHeader = ({
  totalCharacters,
  newCharacters,
  masteryRate,
  understandingRate,
}: {
  newCharacters: number;
  totalCharacters: number;
  masteryRate: number;
  understandingRate: number;
}) => {
  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="flex justify-start space-x-4 sm:space-x-16">
          <h2 className="text-xl sm:text-4xl my-4 font-extralight text-gray-800 dark:text-gray-300">
            {/* {uniqueCharacters?.length}{" "} */}
            {totalCharacters}{" "}
            <span className="text-sm md:text-xl">total chars </span>
          </h2>
          <h2 className="text-xl sm:text-4xl my-4 font-extralight text-gray-800 dark:text-gray-300 space-x-2">
            <span className="text-yellow-500">
              {newCharacters}{" "}
              {/* {uniqueCharacters?.length - totalNewCharaters} */}
            </span>
            <span className="text-sm md:text-xl">new chars </span>
          </h2>
        </div>

        <div className="flex gap-8 my-4 text-2xl">
          <h2 className="font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            <RedFireDuoTone />
            <span className="dark:text-gray-300 text-gray-900">
              {masteryRate}
            </span>
          </h2>

          <h2 className="font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            <GreenLightbulbDuoTone />
            <span className="dark:text-gray-300 text-gray-900">
              {understandingRate}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};
