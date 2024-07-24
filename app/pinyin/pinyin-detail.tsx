"use client";
import React, { useMemo, useState } from "react";
import { CloseIcon } from "@/components/ui/icons";

import { usePinyinChartState } from "./state";

import { useFilteredComponents } from "@/hooks/use-filter-components";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import Link from "next/link";
import { useListComponents } from "@/domain/lesson/component.queries";
import { calculateColor } from "../nmm/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PreviewComponent } from "../nmm/preview-component";
import { useSearchQueryStore } from "@/components/search/state";

export const PinyinDetail = () => {
  const [selectedPinyin, setSelectedPinyin] = usePinyinChartState();
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const querySync = useSearchQueryStore((state) => state.query)?.toLowerCase();

  console.log("selectedLevel", selectedLevel);

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

  console.log("DATA", data);

  const { data: components } = useListComponents({ includeAll: true });

  const filteredData = data?.filter((prop: any, idx: number) => {
    if (querySync) {
      return prop?.en === querySync || prop?.en?.includes(querySync);
    }

    return true;
  });

  const displayData = filteredData?.length ? filteredData : data;

  console.log("DISPLAY DATA", displayData);

  // const pinyinCode = displayData.map(val => )

  // Todo: Get Pinyin Code
  const pinyinCodes = Object.entries(
    Object.groupBy(
      displayData.map((x: any) => x.tone_level),
      (identity: number) => identity
    )
  ).map(([key, val]) => {
    return {
      level: parseInt(key),
      total: val?.length,
    };
  });

  console.log("displayData", displayData);

  return (
    <div className="">
      <div className="md:mx-16 text-black dark:text-white grid grid-cols-3">
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
          className={`mr-[-400px] my-4 flex flex-col items-center dark:text-gray-600 hover:dark:text-white transition`}
        >
          <CloseIcon className="text-4xl" />
        </button>
      </div>

      {/* <div className="mx-4 my-4 md:mx-12 text-black dark:text-white flex flex-wrap items-center justify-center">
        {data?.map((prop: any, idx: any) => {
          return (
            <Link
              key={`${prop.hanzi}-chars-${idx}`}
              href={`/nmm/${prop.hanzi}?lang=zh`}
              // onClick={() => {
              //   addHistoryMutation.mutate({
              //     pathName: routeName,
              //     hanzi: prop.hanzi,
              //     lang: "zh",
              //     contentId: prop.id,
              //     eventType: "CONTENT_VIEWED",
              //   } as any);
              // }}
              className={`dark:text-gray-500 text-gray-200 dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
            >
              {prop?.hanzi}
            </Link>
          );
        })}
      </div> */}

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
                    // onClick={() => {
                    //   addHistoryMutation.mutate({
                    //     pathName: routeName,
                    //     hanzi: prop.hanzi,
                    //     lang: "zh",
                    //     contentId: prop.id,
                    //     eventType: "CONTENT_VIEWED",
                    //   } as any);
                    // }}
                    className={`${(() => {
                      if (selectedLevel) {
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

      <div className="my-32 text-gray-600 text-4xl">
        {pinyinCodes?.map((code: any) => {
          return (
            <span
              onMouseEnter={() => {
                setSelectedLevel(code);
              }}
              className="hover:text-white transition cursor-pointer"
              key={code?.level}
              onMouseLeave={() => {
                setSelectedLevel(null);
              }}
            >
              {code?.total}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
};
