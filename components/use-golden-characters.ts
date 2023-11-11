"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { faChartColumn } from "@fortawesome/sharp-solid-svg-icons/faChartColumn";
import { faGraduationCap } from "@fortawesome/sharp-solid-svg-icons/faGraduationCap";
import { faMapLocation } from "@fortawesome/sharp-solid-svg-icons/faMapLocation";
import { faTableTree } from "@fortawesome/sharp-solid-svg-icons/faTableTree";
import { NomadIcon } from "./ui/icons";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import { useSearchQueryStore } from "./search/state";
import React from "react";

import { useEffect } from "react";

import { faComment } from "@fortawesome/pro-light-svg-icons/faComment";
import { useSelectedCharacter } from "@/app/(auth)/convos/use-selected-character";
import { faX, faXmark } from "@fortawesome/pro-thin-svg-icons";
import { belts } from "@/app/nmm/utils";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "./use-belt-store";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";

const indexOfAll = (str: any, w: any, res = [] as any): any => {
  const idx = str.indexOf(w);

  const wordLen = w.length;

  if (idx === -1) {
    return res;
  }
  const prevIndex = res[res.length - 1] ? wordLen : 0;
  const updatedRes = res.concat({
    index: idx + 1 + (prevIndex || 0) - wordLen,
  }) as any;
  return indexOfAll(str.slice(idx + 1), w, updatedRes);
};

function useGoldenCharacters(belt: any) {
  const { data: components, isLoading } = useListComponentsQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: answers } = useListAnswersQuery();
  // {},
  // {
  //   refetchOnWindowFocus: false,
  //   refetchOnFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // }

  console.log("ANSWERS", answers);

  const lastAnswer = answers?.[answers?.length - 1];

  return components?.filter((component: any) => {
    return (
      lastAnswer?.totalCharacters?.includes(component?.hanzi) &&
      component?.level <= belt?.maxCharacterLevel
    );
  });
}
