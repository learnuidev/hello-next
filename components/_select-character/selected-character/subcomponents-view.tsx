"use client";

import { useListSubComponentsQuery } from "@/domain/component/component.queries";
import Link from "next/link";
import React from "react";

import { useListComponents } from "@/domain/lesson/component.queries";

interface SelectedCharacterProps {
  characterId: string;
  lang: string;
}

const SubComponentContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-gray-500 flex space-x-4 my-4 overflow-y-auto pb-4">
      {children}
    </div>
  );
};

const HanziSubComponentsView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const { data: components } = useListComponents();
  const { data: sub_components, isLoading } = useListSubComponentsQuery({
    componentId: characterId,
    lang,
  });

  if (characterId?.length === 1) {
    return (
      <SubComponentContainer>
        {sub_components?.map((comp: { hanzi: string; en: string }) => {
          const component = components?.find(
            (component) => component?.hanzi === comp?.hanzi,
          );
          return (
            <Link
              key={comp?.hanzi}
              className="space-x-2 flex"
              href={`/nmm/${comp?.hanzi}?lang=zh`}
            >
              <p>{comp?.hanzi}</p>
              <p className="text-gray-400 truncate">
                {component?.en || comp?.en}
              </p>
            </Link>
          );
        })}
      </SubComponentContainer>
    );
  }
};

export const SubComponentsView = (props: SelectedCharacterProps) => {
  return <HanziSubComponentsView {...props} />;
};
