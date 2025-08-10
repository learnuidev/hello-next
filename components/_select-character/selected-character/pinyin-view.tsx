"use client";

import { useListComponents } from "@/domain/lesson/component.queries";

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

import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { getHumanPinyin } from "@/app/nmm/nmm-utils/get-human-pinyin";
import { PreviewComponent } from "@/app/nmm/preview-component";
import { PinyinCodes, useSelectedLevel } from "@/app/pinyin/pinyn-codes";
import { SelectedCharacterProps } from "../select-character.types";
import { SelectedCharacterTitle } from "./selected-character-title";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";

export const PinyinView = (props: { characterId: string }) => {
  const { characterId } = props;

  const { data: components } = useListComponents();
  const selectedLevel = useSelectedLevel((state) => state.selectedLevel) as any;

  const { data: _selectedComp } = useListMeaningsQuery({
    content: characterId,
    lang: "zh",
  });
  const selectedComp: any = _selectedComp?.details;

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
      <main>
        <div className="mt-[32px] mb-32 sm:mb-44">
          <SelectedCharacterTitle characterId={characterId} />
        </div>

        <section>
          <div className="mx-4 my-4 md:mx-12 text-black dark:text-white flex flex-wrap items-center justify-center">
            {displayData?.map((prop: any, idx: number) => {
              const selectedComp = components?.find(
                (component: any) => component?.hanzi === prop?.hanzi
              );

              const color = calculateColor({
                ...selectedComp,
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
