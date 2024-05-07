"use client";

import React from "react";
import { useListSubComponentsQuery } from "@/domain/component/component.queries";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

import { persianAlphabets } from "@/langs/persian/persian-alphabets";

interface SelectedCharacterProps {
  characterId: string;
  lang: string;
}

const HanziSubComponentsView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const { data: sub_components, isLoading } = useListSubComponentsQuery({
    componentId: characterId,
  });

  if (isLoading) {
    return <Skeleton className="w-60 h-12" />;
  }

  if (characterId?.length === 1) {
    return (
      <div className="text-gray-500 flex space-x-4">
        {/* {JSON.stringify(sub_components, null, 2)} */}
        {sub_components?.map((comp: { hanzi: string; en: string }) => {
          return (
            <Link
              key={comp?.hanzi}
              className="space-x-2 flex"
              href={`/nmm/${comp?.hanzi}?lang=zh`}
            >
              <p>{comp?.hanzi}</p>
              <p className="text-gray-400">{comp?.en}</p>
            </Link>
          );
        })}
      </div>
    );
  }
};

const FarsiSubComponentView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const subComponents = characterId.split("")?.map((comp: any) => {
    const alphabet = persianAlphabets?.find((item) => item?.input === comp);
    return {
      ...alphabet,
    };
  });
  return (
    <div className="text-gray-500 flex space-x-4 my-8">
      {/* {JSON.stringify(sub_components, null, 2)} */}
      {subComponents?.map((item: any) => {
        return (
          <Link
            key={item?.input}
            className="space-x-2 flex"
            href={`/nmm/${item?.input}?lang=${lang}`}
          >
            <p>{item?.input}</p>
            <p className="text-gray-400">{item?.roman}</p>
          </Link>
        );
      })}
    </div>
  );
};

export const SubComponentsView = (props: SelectedCharacterProps) => {
  if (props.lang === "zh") {
    return <HanziSubComponentsView {...props} />;
  }

  if (props.lang === "fa") {
    return <FarsiSubComponentView {...props} />;
  }

  return null;
};
