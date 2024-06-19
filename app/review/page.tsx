"use client";
import React from "react";
import { ReviewV2 } from "./v2";
import { ReviewV1 } from "./v1";
import { useSearchParams } from "next/navigation";

export default function NomadMethodPage(props: any) {
  const searchParams = useSearchParams();

  const view = searchParams?.get("view");

  if (view === "cal") {
    return <ReviewV2 />;
  }
  return <ReviewV1 />;
}
