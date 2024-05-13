"use client";
import React, { useEffect } from "react";

import { SelectedCharacter } from "@/components/selected-character";
import { useParams } from "next/navigation";
import { NMMV2 } from "../v2";

export default function NomadMethodPage(props: any) {
  const params = useParams() as {
    "component-id": string;
  };

  const componentId = params["component-id"];
  // return <NMMV2 characterId={decodeURIComponent(params["component-id"])} />;

  return (
    <SelectedCharacter
      characterId={decodeURIComponent(params["component-id"])}
    />
  );
}
