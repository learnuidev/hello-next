"use client";

import { NmmListContainer } from "@/components/nmm-list-container";
import { WordItem } from "../../word-item";

import { useListSuperComponentsQuery } from "@/domain/component/super-component.queries";
import { HanziLink } from "@/components/hanzi-link";

export const HskSuperComponentsWordView = ({
  componentId,
}: {
  componentId: string;
}) => {
  const { data: superComponents_ } = useListSuperComponentsQuery({
    componentId,
  });

  const superComponents = superComponents_ as any;

  console.log("SUPER COMPS", superComponents);

  return (
    <NmmListContainer>
      {superComponents

        ?.sort((a: any, b: any) => (a?.level || 20000) - (b?.level || 20000))
        ?.map((prop: any, idx: any) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
    </NmmListContainer>
  );
};
