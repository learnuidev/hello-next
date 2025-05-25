"use client";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { WithDetectLanguage } from "@/components/with-detect-language/with-detect-language";
import { useGetComponentId } from "./use-get-component-id";

export default function NomadMethodPage(props: any) {
  const componentId = useGetComponentId();

  return (
    // <WithDetectLanguage content={componentId}>
    <SelectedCharacterContainer characterId={componentId} />
    // </WithDetectLanguage>
  );
}
