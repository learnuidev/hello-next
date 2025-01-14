"use client";
import React, { useEffect } from "react";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useParams, usePathname } from "next/navigation";
import { NMMV2 } from "../v2";
import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";
import { useGetComponentId } from "./use-get-component-id";
import { WithDetectLanguage } from "@/components/with-detect-language/with-detect-language";

export default function NomadMethodPage(props: any) {
  const params = useParams() as {
    "component-id": string;
  };

  const routeName = usePathname();

  const componentId = useGetComponentId();

  const { data } = useListComponentVariantsQuery({ hanzi: componentId });
  // return <NMMV2 characterId={componentId} />;

  // return (
  //   <div>
  //     <code>
  //       <pre>{JSON.stringify(data, null, 2)}</pre>
  //     </code>
  //   </div>
  // );

  return (
    <WithDetectLanguage content={componentId}>
      <SelectedCharacterContainer characterId={componentId} />;
    </WithDetectLanguage>
  );
}
