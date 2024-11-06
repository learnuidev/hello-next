"use client";

import { WordItem } from "../../word-item";

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
    <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap">
      {superComponents
        // ?.sort((a: any, b: any) => (a?.en?.length || 0) - (b?.en?.length || 0))
        ?.sort((a: any, b: any) => (a?.level || 20000) - (b?.level || 20000))
        ?.map((prop: any) => {
          return (
            <WordItem
              lang={prop?.lang}
              component={prop}
              key={JSON.stringify(prop)}
            />
          );
        })}
    </div>
  );
};
