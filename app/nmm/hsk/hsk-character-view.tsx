"use client";

import React from "react";
import { useListComponents } from "@/domain/lesson/component.queries";

import { HanziLink } from "@/components/hanzi-link";

import { chineseCharacters } from "@/langs/chinese /characters";

import { NmmListContainer } from "@/components/nmm-list-container";
import { useGetHskCharacters } from "./use-get-hsk-characters";
import { Nothing } from "../nothing";

export const HskCharacterView = ({ variant }: { variant?: "all" }) => {
  const { data: components } = useListComponents({ includeAll: true });

  const comps = components ? components : chineseCharacters;

  const { data: filteredComponents, isLoading } = useGetHskCharacters({
    variant,
  });

  if (filteredComponents?.length === 0 && !isLoading) {
    return <Nothing message={"You have learned everything in this belt"} />;
  }

  return (
    <div>
      <NmmListContainer>
        {filteredComponents?.map((prop: any, idx: number) => {
          const comp = comps?.find((c: any) => c?.hanzi === prop?.hanzi);

          if (!comp) {
            return null;
          }

          return (
            <div key={`${prop.hanzi}-chars-${idx}`}>
              <HanziLink character={comp || prop} />
            </div>
          );
        })}
      </NmmListContainer>
    </div>
  );
};
