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
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

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

  const { data } = useListCharactersQuery();

  const learnedChar = data?.filter(
    (item: any) => (item?.input || item?.hanzi) === characterId
  )?.[0];

  const { toast } = useToast();
  return (
    <div className="flex jusify-between items-center space-x-32">
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
        <button
          className={cn(
            "text-xl transition",
            view === "sentences" ? "text-white" : "text-gray-400"
          )}
          onClick={() => {
            setView("sentences");
          }}
        >
          <Icons.tree />
        </button>

        <button
          className={cn(
            "text-xl transition",
            view === "super-components" ? "text-white" : "text-gray-400"
          )}
          onClick={() => {
            setView("super-components");
          }}
        >
          {view === "super-components" ? (
            <Icons.lightningSolid />
          ) : (
            <Icons.lightning />
          )}
        </button>

        {learnedChar && (
          <button
            className={cn(
              "text-xl transition",
              view === "story" ? "text-white" : "text-gray-400"
            )}
            onClick={() => {
              setView("story");
            }}
          >
            <Icons.compass />
          </button>
        )}

        <button
          className={cn(
            "text-xl transition",
            view === "pinyin" ? "text-white" : "text-gray-400"
          )}
          onClick={() => {
            setView("pinyin");
          }}
        >
          <Icons.pinyinChart />
        </button>
      </div>
    </div>
  );
};
