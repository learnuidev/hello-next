"use client";
import React from "react";
import { Devanagari } from "@/components/devanagari/devanagari";
import { NomadMethodMandarin } from "./nomad-method-mandarin";
import { Japanese } from "@/components/japanese/japanese";
import { Korean } from "@/components/korean/korean";

export function NomadMethodBody({ lang }: { lang: string }) {
  if (["ne", "nep", "nepali"]?.includes(lang)) {
    return <Devanagari />;
  }
  if (["ja", "japanese"]?.includes(lang)) {
    return <Japanese />;
  }
  if (["ko", "korean"]?.includes(lang)) {
    return <Korean />;
  }

  return <NomadMethodMandarin />;
}
