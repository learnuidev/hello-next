"use client";

import React, { useState } from "react";
import { useListComponents } from "@/domain/lesson/component.queries";

import { HanziLink } from "@/components/hanzi-link";

import { chineseCharacters } from "@/langs/chinese /characters";

import { NmmListContainer } from "@/components/nmm-list-container";
import { useGetHskCharacters } from "./use-get-hsk-characters";
import { Nothing } from "../nothing";
import { useGetNmmParams } from "../use-get-nmm-params";

export const HskCharacterView = ({ variant }: { variant?: "all" }) => {
  const { data: components } = useListComponents({ includeAll: true });

  const { level } = useGetNmmParams();
  const [slicedByLevels, setSliced] = useState<any>({});

  const comps = components ? components : chineseCharacters;

  const { data: filteredComponents, isLoading } = useGetHskCharacters({
    variant,
  });

  if (filteredComponents?.length === 0 && !isLoading) {
    return <Nothing message={"You have learned everything in this belt"} />;
  }

  const sliced = slicedByLevels?.[level] || 100;

  return (
    <div>
      <NmmListContainer className="mb-24">
        {filteredComponents?.slice(0, sliced).map((prop: any, idx: number) => {
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

      {filteredComponents?.length < sliced ? null : (
        <div className="flex justify-center items-center mb-24 mt-12">
          <button
            onClick={() => {
              setSliced((prev: any) => {
                return {
                  ...prev,
                  [level]: (prev?.[level] || 100) + 100,
                };
              });
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
