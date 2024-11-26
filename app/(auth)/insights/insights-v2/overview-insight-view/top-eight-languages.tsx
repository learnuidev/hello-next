"use client";

import { groupBy } from "ramda";

import { belts } from "@/app/nmm/utils";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

const humanLangs = {
  ne: "Nepali",
  ur: "Urdu",
  fa: "Farsi",
  ar: "Arabic",
  ko: "Korean",
  ja: "Japanese",
  th: "Thai",
  it: "Italian",
  af: "Afrikaans",
  hi: "Hindi",
  nl: "Dutch",
  ro: "Romanian",
  en: "English",
  pt: "Portuguese",
  nepali: "Nepali",
  hindi: "Hindi",
  hi_IN: "Hindi",
  zh: "Mandarin",
  ml: "Malayalam",
  fr: "French",
  es: "Spanish",
  mo: "Romanian (Moldova)",
  vi: "Vietnamese",
} as any;

export const TopEightLanguages = () => {
  const { data: learnedCharacters } = useListCharactersQuery();

  const grouped = groupBy((item: any) => item?.lang)(
    learnedCharacters?.map((char: any) => {
      if (!char.lang) {
        return {
          ...char,
          lang: "zh",
        };
      } else {
        return char;
      }
    }) || []
  );

  return (
    <div className="mt-8 mx-auto sm:w-96 w-full px-8 sm:p-0">
      <p className="text-center font-normal text-[13px] text-[#808080] my-8 font-['Gill Sans']">
        Top words learned by language{" "}
      </p>
      <div className="space-y-2">
        {Object.entries(grouped)

          .sort((a: any, b: any) => b?.[1]?.length - a?.[1]?.length)
          .slice(0, 8)
          .map((group) => {
            const [lang, items] = group;

            const itemLen = items?.length || 0;

            const x = humanLangs[lang] || lang;

            const belt = belts?.filter(
              (belt) =>
                belt.minCharacterLevel < itemLen &&
                itemLen < belt.maxCharacterLevel
            )[0];

            const barHeight = "h-6";

            const itemsLength = (items || [])?.length * 1;

            const percentage = (itemsLength / belt?.maxCharacterLevel) * 100;

            return (
              <div key={"lang"}>
                <div className="flex justify-between">
                  <p className="text-left text-gray-300 font-extralight text-sm">
                    {x}
                  </p>

                  <div className="text-left">{itemsLength}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
