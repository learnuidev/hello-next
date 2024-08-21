"use client";

import React from "react";
import { useListComponents } from "@/domain/lesson/component.queries";

import { calculateColor, getHumanPinyin } from "@/app/nmm/utils";
import { useFilteredComponents } from "@/hooks/use-filter-components";
import { groupBy } from "ramda";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { PreviewComponent } from "@/app/nmm/preview-component";
import { create } from "zustand";
import { PinyinCodes, useSelectedLevel } from "@/app/pinyin/pinyn-codes";

export const PinyinView = ({ characterId }: { characterId: string }) => {
  const { data: components } = useListComponents();
  const selectedLevel = useSelectedLevel((state) => state.selectedLevel) as any;

  const selectedComp = components?.find(
    (component: any) => component?.hanzi === characterId
  );

  const { data: learnedCharacters2 } = useListCharactersQuery();

  const humanPinyin = getHumanPinyin(selectedComp);

  const { data } = useFilteredComponents(
    {
      query: humanPinyin,
    },
    {
      exact: true,
      isQuerySameAsVal: true,
    }
  );

  const displayData = data?.filter((x: any) => x.hanzi?.length === 1);

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
    <div>
      <aside></aside>

      <main>
        <div className="my-8">
          <h2 className="text-gray-400">{selectedComp?.pinyin}</h2>
          <h1 className="text-4xl font-extralight my-2">{characterId}</h1>
          <h3 className="text-gray-500">{selectedComp?.en}</h3>
        </div>

        <section>
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
                            if (
                              selectedLevel?.level === 5 &&
                              !prop?.tone_level
                            ) {
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
        </section>

        {pinyinCodes && <PinyinCodes pinyinCodes={pinyinCodes} />}
      </main>
    </div>
  );
};
