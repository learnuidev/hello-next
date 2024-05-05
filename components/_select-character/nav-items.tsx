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
    setView,
    firstLesson,
    characterId,
    discoverMutation,
    deleteComponentMutation,
  } = props;
  const router = useRouter();

  const { toast } = useToast();
  return (
    <div className="space-x-8 flex items-center">
      <button
        className="text-xl"
        onClick={() => {
          console.log("yoo 4");

          router.push(`/nmm${lang ? `?lang=${lang}` : ""}`);
        }}
      >
        <FontAwesomeIcon className="text-2xl" icon={faXmark} />
      </button>
      {/* {meaning ? (
      <button
        className="text-xl"
        onClick={() => {
          setView("home");
        }}
      >
        <FontAwesomeIcon className="text-2xl" icon={faHome} />
      </button>
    ) : null} */}

      <button
        className="text-xl"
        onClick={() => {
          setReadMode(!readMode);
        }}
      >
        <FontAwesomeIcon icon={faGlassesRound} />
      </button>
      {/* <button
      className="text-xl"
      onClick={() => {
        setView("sentences");
      }}
    >
      <FontAwesomeIcon className="text-2xl" icon={faSpaceStationMoon} />
    </button> */}
      {/* <button
      className="text-xl"
      onClick={() => {
        setView("review");
      }}
    >
      <FontAwesomeIcon className="text-2xl" icon={faMale} />
    </button> */}
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
            <FontAwesomeIcon className="transition" icon={faCheckCircle} />
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
            disabled={discoverMutation.isLoading || discoverMutation.isSuccess}
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
              <FontAwesomeIcon className="transition" icon={faCheckCircle} />
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
            <FontAwesomeIcon className="transition" icon={faCheckCircle} />
          ) : (
            <Icons.powerOff />
          )}
        </button>
      )}
    </div>
  );
};
