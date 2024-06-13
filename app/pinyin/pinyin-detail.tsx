"use client";
import React, { useMemo } from "react";
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
                    className={`${
                      // learnedCharacters.includes(prop?.hanzi)
                      learnedCharacters2?.find(
                        (char: any) => char?.hanzi === prop?.hanzi
                      )
                        ? `${color}`
                        : selectedComp?.group
                          ? "text-slate-400"
                          : "dark:text-gray-500 text-gray-200"
                    } dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
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
    </div>
  );
};
