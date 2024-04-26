"use client";
import React from "react";
import { NavBar } from "@/components/navbar";

import { useSearchParams } from "next/navigation";

import { NomadMethodBody } from "./nomad-method-body";

export default function NomadMethodPage(props: any) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  return (
    <div className="grow">
      <NavBar />

      <NomadMethodBody lang={lang} />
    </div>
  );
}
