"use client";
import React from "react";
import { Devanagari } from "@/components/devanagari/devanagari";
import { NomadMethodMandarin } from "./nomad-method-mandarin";
import { Japanese } from "@/components/japanese/japanese";
import { Korean } from "@/components/korean/korean";

import { Persian } from "@/components/persian/persian";
import { Spanish } from "@/components/spanish/spanish";
import { French } from "@/components/french/french";
import { Vietnamese } from "@/components/vietnamese/vietnamese";
import { Urdu } from "@/components/urdu/urdu";
import { Russian } from "@/components/russian/russian";
import { LangItem } from "@/components/lang-item/lang-item";

export function NomadMethodBody({ lang }: { lang: string }) {
  if (["ne", "nep", "nepali"]?.includes(lang)) {
    return <Devanagari />;
  }

  if (!lang || ["zh", "zh-CN"]?.includes(lang)) {
    return <NomadMethodMandarin />;
  }

  return <LangItem />;
}
