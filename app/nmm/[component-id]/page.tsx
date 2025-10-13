"use client";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { WithDetectLanguage } from "@/components/with-detect-language/with-detect-language";
import { useGetComponentId } from "./use-get-component-id";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";

export default function NomadMethodPage(props: any) {
  const componentId = useGetComponentId();
  const lang = useGetCurrentLang();

  return (
    <MandoContextMenu lang={lang}>
      <SelectedCharacterContainer characterId={componentId} />
    </MandoContextMenu>
  );
}
