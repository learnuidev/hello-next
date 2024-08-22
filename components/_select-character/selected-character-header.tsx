"use client";

import React from "react";

import { SelectedCharacterProps } from "./select-character.types";

import { SelectedCharacterNavItems } from "./selected-character-nav-items";

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
    setView,
    view,
    lang,
    sentences,
  } = props;
  return (
    <div className="flex my-4 justify-start items-center w-full">
      <SelectedCharacterNavItems {...props} />
    </div>
  );
};
