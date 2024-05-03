"use client";

import React from "react";

import Link from "next/link";

import { formatComponentName } from "@/app/nmm/format-component-name";
import { SelectedCharacterProps } from "./select-character.types";

export const TitleView = ({
  selectedComp,
  selectedChar,
  color,
  selectedComp2,
}: SelectedCharacterProps) => {
  return (
    <div
      className={`flex md:flex-row flex-col space-x-0 md:space-x-2 font-extralight`}
    >
      <Link
        target="_blank"
        href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
          selectedChar
        )}`}
        className={`${color} flex items-end space-x-2 text-xl md:text-4xl`}
      >
        {" "}
        <span>{selectedChar}</span>{" "}
      </Link>
      <Link
        target="_blank"
        href={`https://hanzicraft.com/character/${encodeURIComponent(
          selectedChar
        )}`}
        className="flex items-end space-x-2"
      >
        {" "}
        <span className="text-xs">
          {selectedComp?.pinyin ||
            selectedComp?.en ||
            selectedComp?.roman ||
            selectedComp2?.pinyin}
        </span>
      </Link>
      {/* {selectedComp?.pinyin && selectedComp?.en?.length < 20 && ( */}
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
      {/* )} */}
    </div>
  );
};
