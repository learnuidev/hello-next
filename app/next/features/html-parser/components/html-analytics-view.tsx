/* eslint-disable @next/next/no-img-element */
"use client";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { useRouter } from "next/navigation";
import { useGetNextParams } from "../../../hooks/use-get-next-params";
import { useParseHtmlQuery } from "../hooks/use-parse-html";
import { CharacterAnalytics } from "@/components/_select-character/character-analytics";

export const HtmlAnalyticsView = () => {
  const { url } = useGetNextParams();

  const router = useRouter();

  const { data, isError, isLoading } = useParseHtmlQuery(url);

  const characterId = JSON.stringify(data);
  // data?.data?.sections?.map((section) => section.hanzi).join("") || "";

  return <CharacterAnalytics lang="zh" characterId={characterId} />;
};
