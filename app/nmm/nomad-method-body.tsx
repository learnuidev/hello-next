"use client";

import { NomadMethodMandarin } from "./nomad-method-mandarin";

import { LangItem } from "@/components/lang-item/lang-item";

export function NomadMethodBody({ lang }: { lang: string }) {
  if (!lang || ["zh", "zh-CN"]?.includes(lang)) {
    return <NomadMethodMandarin />;
  }

  return <LangItem />;
}
