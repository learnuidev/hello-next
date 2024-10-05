"use client";
import React, { useState } from "react";
import { CloseIcon } from "@/components/ui/icons";

import { usePinyinChartState } from "./state";

import { groupBy } from "ramda";

import { useFilteredComponents } from "@/hooks/use-filter-components";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import Link from "next/link";
import { useListComponents } from "@/domain/lesson/component.queries";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PreviewComponent } from "../nmm/preview-component";
import { useSearchQueryStore } from "@/components/search/state";
import { PinyinCodes, useSelectedLevel } from "./pinyn-codes";
import { calculateColor } from "../nmm/nmm-utils/calculate-color";

export const PinyinDetail = () => {
  const [selectedPinyin, setSelectedPinyin] = usePinyinChartState();
  const selectedLevel = useSelectedLevel((state) => state.selectedLevel) as any;

  const querySync = useSearchQueryStore((state) => state.query)?.toLowerCase();

  const { data: learnedCharacters2 } = useListCharactersQuery();

  const { data } = useFilteredComponents(
    {
      query: selectedPinyin?.value || "",
    },
    {
      exact: true,
      isQuerySameAsVal: true,
    }
  );

  const { data: components } = useListComponents({ includeAll: true });

  const filteredData = data?.filter((prop: any, idx: number) => {
    if (querySync) {
      return prop?.en === querySync || prop?.en?.includes(querySync);
    }

    return true;
  });

  const displayData = filteredData?.length ? filteredData : data;

  const grouped = groupBy((item: any) => item)(
    displayData.map((x: any) => x.tone_level)
  );
  const pinyinCodes = Object.entries(grouped).map(([key, val]) => {
    const level = parseInt(key);
    return {
      level: Number.isNaN(level) ? 5 : level,
      total: val?.length || 0,
    };
  });

  return (
    <div className="">
      <div className="my-8 md:mx-12 mx-4 text-black dark:text-white flex justify-between items-center">
        <div></div>
        <h1 className="flex flex-col items-center">
          <span className={`text-3xl font-bold dark:text-gray-200`}>
            {selectedPinyin?.value || selectedPinyin}
          </span>
        </h1>
        <button
          onClick={() => {
            setSelectedPinyin(null);
          }}
          className={`flex flex-col items-center dark:text-gray-600 hover:dark:text-white transition`}
        >
          <CloseIcon className="text-4xl" />
        </button>
      </div>

      <div className="mx-4 my-4 md:mx-12 text-black dark:text-white flex flex-wrap items-center justify-center">
        {displayData?.map((prop: any, idx: number) => {
          const selectedComp = components?.find(
            (component: any) => component?.hanzi === prop?.hanzi
          );

          const color = calculateColor({
            tone: selectedComp?.tone_level,
          });

          return (
            <TooltipProvider key={`${prop.hanzi}-chars-${idx}`}>
              <Tooltip>
                <TooltipTrigger className="p-3 hover:scale-125 transition">
                  <Link
                    href={`/nmm/${prop.hanzi}?lang=zh`}
                    className={`${(() => {
                      if (selectedLevel) {
                        if (selectedLevel?.level === 5 && !prop?.tone_level) {
                          return "text-white";
                        }
                        if (selectedLevel?.level === prop?.tone_level) {
                          return "text-white";
                        } else {
                          return "text-gray-800";
                        }
                      }

                      const isLearnedCharacter = learnedCharacters2?.find(
                        (char: any) => char?.hanzi === prop?.hanzi
                      );

                      if (isLearnedCharacter) {
                        return `${color}`;
                      }

                      if (selectedComp?.group) {
                        return "text-slate-400";
                      }

                      return "dark:text-gray-500 text-gray-200";
                    })()} dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
                  >
                    {prop?.hanzi}
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-black border-gray-800">
                  <PreviewComponent component={prop} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {pinyinCodes && <PinyinCodes pinyinCodes={pinyinCodes} />}
    </div>
  );
};
