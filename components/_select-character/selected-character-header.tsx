"use client";

import React from "react";

import { SelectedCharacterProps } from "./select-character.types";

import { TitleView } from "./title-view";
import { NavItems } from "./selected-character-nav-items";

import { useToast } from "@/components/ui/use-toast";

// import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheckCircle,
  faGlassesRound,
  faLanguage,
  faLightbulb,
  faXmark,
} from "@fortawesome/pro-thin-svg-icons";

import { useRouter } from "next/navigation";

import { PlayIcon } from "../ui/icons";

import { Icons } from "../ui/icons.v2";

import { faSpinner } from "@fortawesome/sharp-solid-svg-icons";

// import { SelectedCharacterProps } from "./select-character.types";
import { cn } from "@/lib/utils";

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
      <NavItems {...props} />

      {/* <div className="space-x-8 flex items-center">
        <button
          className={cn(
            "text-xl transition",
            view === "home" ? "text-white" : "text-gray-400"
          )}
          onClick={() => {
            setView("home");
          }}
        >
          <Icons.mandarin />
        </button>
        <button
          className={cn(
            "text-xl transition",
            view === "words" ? "text-white" : "text-gray-400"
          )}
          onClick={() => {
            setView("words");
          }}
        >
          <Icons.seedling />
        </button>
      </div> */}
    </div>
  );
};
