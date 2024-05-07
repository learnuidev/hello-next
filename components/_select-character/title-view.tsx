"use client";

import React from "react";

import Link from "next/link";

import { formatComponentName } from "@/app/nmm/format-component-name";
import { SelectedCharacterProps } from "./select-character.types";
import {
  ListGrammarsResponse,
  useListGrammarsQuery,
} from "@/domain/sentence/grammar.queries";
import { useSearchParams } from "next/navigation";

export const TitleView = ({
  selectedComp,
  selectedChar,
  color,
  selectedComp2,
}: SelectedCharacterProps) => {
  const { data: grammarAnalysis, isLoading: isGrammarAnalysisLoading } =
    useListGrammarsQuery(
      {
        sentenceId: selectedChar,
        content: selectedChar,
      },
      {
        enabled: Boolean(selectedChar),
        refetchOnWindowFocus: false,
        refetchOnFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const _grammarAnalysis = (grammarAnalysis as ListGrammarsResponse)
    ?.grammarAnalysis;

  const searchParams = useSearchParams();
  const learnedLang = searchParams.get("lang") || "";

  const resolveedEn = ["zh"]?.includes(learnedLang)
    ? selectedComp?.pinyin ||
      selectedComp?.roman ||
      selectedComp?.en ||
      selectedComp2?.pinyin
    : _grammarAnalysis?.[0]?.roman;

  return (
    <div>
      <div
        className={`flex md:flex-row flex-col space-x-0 md:space-x-2 font-extralight items-end`}
      >
        <Link
          target="_blank"
          href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
            selectedChar
          )}`}
          className={`${color} space-x-2 text-xl md:text-4xl`}
        >
          {" "}
          <span>{selectedChar}</span>{" "}
        </Link>
        <Link
          target="_blank"
          href={`https://hanzicraft.com/character/${encodeURIComponent(
            selectedChar
          )}`}
        >
          {" "}
          <span className="text-sm">{resolveedEn}</span>
        </Link>
        {/* {selectedComp?.pinyin && selectedComp?.en?.length < 20 && ( */}

        {/* )} */}
      </div>

      <div>
        <Link
          target="_blank"
          href={`https://hanzicraft.com/character/${encodeURIComponent(
            selectedChar
          )}`}
          className="flex items-end text-gray-400"
        >
          <span className="hidden md:block text-xs truncate">
            {formatComponentName(selectedComp, 5) ||
              formatComponentName(selectedComp2, 5)}
          </span>
          <span className="block md:hidden text-xs truncate">
            {formatComponentName(selectedComp, 2) ||
              formatComponentName(selectedComp2, 2)}
          </span>
        </Link>
      </div>
    </div>
  );
};
