"use client";

import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";
import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useGetComponentId } from "./use-get-component-id";

export default function NomadMethodPage(props: any) {
  const componentId = useGetComponentId();
  const lang = useGetCurrentLang();

  return (
    <MandoContextMenu lang={lang}>
      <SelectedCharacterContainer characterId={componentId} />
    </MandoContextMenu>
  );
}
