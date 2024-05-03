"use client";

import React from "react";

import { SelectedCharacterProps } from "./select-character.types";

import { TitleView } from "./title-view";
import { NavItems } from "./nav-items";

export const HeaderView = (props: SelectedCharacterProps) => {
  const {
    uniqueAnswerIds,
    answerMap,
    allContents,
    allSteps,
    components,
    selectedComp,
    selectedChar,
    routeName,
    lang,
    sentences,
  } = props;
  return (
    <div className="flex my-4 justify-between items-center">
      <NavItems {...props} />
      {selectedChar?.length < 4 && <TitleView {...props} />}
    </div>
  );
};
