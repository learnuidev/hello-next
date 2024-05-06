// import Image from 'next/image'
"use client";

import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

import { NomadMethod } from "@/app/nmm/nomad-method";

import { HeaderView } from "./_select-character/header-view";
import { ViewType } from "./_select-character/character-view-type";
import { useSelectedCharacterData } from "./use-selected-character";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlayIcon } from "./ui/icons";
import { faGlassesRound } from "@fortawesome/pro-thin-svg-icons";
import { faSpinner } from "@fortawesome/sharp-solid-svg-icons";

import {
  faCheckCircle,
  faLanguage,
  faLightbulb,
  faXmark,
} from "@fortawesome/pro-thin-svg-icons";
import { Icons } from "./ui/icons.v2";
import { cn } from "@/lib/utils";

export function SelectedCharacter({ characterId }: { characterId: string }) {
  const { data } = useSelectedCharacterData({ characterId });

  const searchParams = useSearchParams();
  const { toast } = useToast();

  const lang = searchParams.get("lang") || "";

  const { selectedChar, setView, view } = data;

  const router = useRouter();

  if (view === "play") {
    return (
      <NomadMethod
        selectedId={selectedChar}
        onClose={() => {
          setView("");
        }}
      />
    );
  }

  const props = {
    ...data,
    characterId,
  };

  const {
    selectedComp,
    // selectedChar,
    // lang,
    setReadMode,
    readMode,
    isAlreadyLearned,
    addCharacterMutation,
    selectedComp2,
    // setView,
    firstLesson,
    // characterId,
    discoverMutation,
    deleteComponentMutation,
  } = props;

  return (
    <div
      className="relative w-full"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          router.push(`/nmm${lang ? `?lang=${lang}` : ""}`);
        }
      }}
    >
      <div className="px-4 md:px-12">
        <HeaderView {...props} />

        <ViewType {...props} />
      </div>

      <div className="flex w-full fixed z-50 bottom-4">
        <div className="flex items-center w-full justify-center">
          <div className="px-8  py-2 bg-slate-900 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            {/* <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span> */}

            <div className="space-x-8 flex justify-center items-center w-full">
              <button
                className={cn("text-xl")}
                onClick={() => {
                  setReadMode(!readMode);
                }}
              >
                <FontAwesomeIcon icon={faGlassesRound} />
              </button>

              <button
                className="text-xl"
                onClick={() => {
                  setView("play");
                }}
              >
                <PlayIcon className="text-2xl" />
              </button>
              {isAlreadyLearned ? null : (
                <button
                  className="text-xl"
                  onClick={() => {
                    addCharacterMutation?.mutateAsync({
                      lang: lang,
                      status: "DISCOVERED",
                      hanzi: firstLesson?.hanzi || selectedChar,
                      journeyId: firstLesson?.id || "default",
                    });
                  }}
                >
                  {addCharacterMutation.isLoading ? (
                    <FontAwesomeIcon spinPulse icon={faSpinner} />
                  ) : addCharacterMutation.isSuccess ? (
                    <FontAwesomeIcon
                      className="transition"
                      icon={faCheckCircle}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
                  )}
                </button>
              )}
              {selectedComp2?.updated_at ? null : !selectedComp2?.updated_at ||
                !selectedComp2?.discoveredAt ? (
                (selectedComp?.hanzi || characterId)?.length > 1 ? null : (
                  <button
                    className="text-xl"
                    disabled={
                      discoverMutation.isLoading || discoverMutation.isSuccess
                    }
                    onClick={() => {
                      discoverMutation
                        .mutateAsync({
                          hanzi: selectedComp?.hanzi || characterId,
                        })
                        .then((resp: any) => {
                          toast({
                            title: "Success!",
                            description: `Component Successfully discovered ${JSON.stringify(resp)}`,
                          });
                          console.log("Discovered!!", resp);
                        });
                    }}
                  >
                    {discoverMutation.isLoading ? (
                      <FontAwesomeIcon spinPulse icon={faSpinner} />
                    ) : discoverMutation.isSuccess ? (
                      <FontAwesomeIcon
                        className="transition"
                        icon={faCheckCircle}
                      />
                    ) : (
                      <FontAwesomeIcon icon={faLanguage} />
                    )}

                    {/* <span>{(selectedComp?.hanzi || characterId)?.length}</span> */}
                  </button>
                )
              ) : null}
              {true ? null : (
                <button
                  className="text-xl"
                  disabled={
                    deleteComponentMutation.isLoading ||
                    deleteComponentMutation.isSuccess
                  }
                  onClick={() => {
                    deleteComponentMutation
                      .mutateAsync({
                        hanzi: selectedComp?.hanzi || characterId,
                      } as any)
                      .then((resp: any) => {
                        toast({
                          title: "Success!",
                          description: `Component: ${selectedComp?.hanzi || characterId} Successfully deleted  
                  \n 
                  ${JSON.stringify(resp)}`,
                        });
                        console.log("Discovered!!", resp);
                      });
                  }}
                >
                  {deleteComponentMutation.isLoading ? (
                    <FontAwesomeIcon spinPulse icon={faSpinner} />
                  ) : discoverMutation.isSuccess ? (
                    <FontAwesomeIcon
                      className="transition"
                      icon={faCheckCircle}
                    />
                  ) : (
                    <Icons.powerOff />
                  )}
                </button>
              )}
            </div>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
