"use client";
import React from "react";
import { Devanagari } from "@/components/devanagari/devanagari";
import { NomadMethodMandarin } from "./nomad-method-mandarin";
import { Japanese } from "@/components/japanese/japanese";
import { Korean } from "@/components/korean/korean";
import { Arabic } from "@/components/arabic/arabic";

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
  if (["ar"]?.includes(lang)) {
    return <Arabic />;
  }

  return <NomadMethodMandarin />;
}
