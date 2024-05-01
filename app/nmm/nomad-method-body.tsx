"use client";
import React from "react";
import { Devanagari } from "@/components/devanagari/devanagari";
import { NomadMethodMandarin } from "./nomad-method-mandarin";

export function NomadMethodBody({ lang }: { lang: string }) {
  if (["ne", "nep", "nepali"]?.includes(lang)) {
    return <Devanagari />;
  }

  return <NomadMethodMandarin />;
}
