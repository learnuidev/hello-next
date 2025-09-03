"use client";

import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { useListSuperComponentsQuery } from "@/domain/component/super-component.queries";

export const HskSuperComponentsWordView = ({
  componentId,
}: {
  componentId: string;
}) => {
  const { data: superComponents_ } = useListSuperComponentsQuery({
    componentId,
  });

  const superComponents = superComponents_ as any;

  return (
    <NmmListContainerAll>
      {superComponents

        ?.sort((a: any, b: any) => (a?.level || 20000) - (b?.level || 20000))
        ?.map((prop: any, idx: any) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
    </NmmListContainerAll>
  );
};
