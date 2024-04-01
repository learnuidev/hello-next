"use client";
import React from "react";

import { SelectedCharacter } from "@/components/selected-character";
import { useParams } from "next/navigation";

export default function NomadMethodPage(props: any) {
  const params = useParams() as {
    "component-id": string;
  };

  return (
    <SelectedCharacter
      characterId={decodeURIComponent(params["component-id"])}
    />
  );
}
