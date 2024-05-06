"use client";

import { useToast } from "@/components/ui/use-toast";

import React from "react";

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

import { SelectedCharacterProps } from "./select-character.types";
import { cn } from "@/lib/utils";

export const NavItems = (props: SelectedCharacterProps) => {
  const {
    selectedComp,
    selectedChar,
    lang,
    setReadMode,
    readMode,
    isAlreadyLearned,
    addCharacterMutation,
    selectedComp2,
    view,
    setView,
    firstLesson,
    characterId,
    discoverMutation,
    deleteComponentMutation,
  } = props;
  const router = useRouter();

  const { toast } = useToast();
  return (
    <div className="flex jusify-between items-center w-full space-x-32">
      <div className="space-x-8 flex items-center">
        <button
          className={"text-xl"}
          onClick={() => {
            console.log("yoo 4");

            router.push(`/nmm${lang ? `?lang=${lang}` : ""}`);
          }}
        >
          <FontAwesomeIcon className="text-2xl" icon={faXmark} />
        </button>

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
      </div>
    </div>
  );
};
