"use client";

import "@/libs/cognito/init";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useGetContentQuery } from "@/domain/content/content.queries";
import Link from "next/link";
import { useEffect } from "react";
import { ConvoDetails } from "../convo-details";
import { ConvosNavBar } from "../convos-nav-bar";
import { useRecentlyWatchedContent } from "../use-recently-watched-content-store";
import { useGetContentId } from "./hooks/use-get-content-id";
import { useGo } from "./hooks/use-go";
import { AnimatedLoadingText } from "@/components/animated-loading-text";
import { formatPercentage } from "@/app/insights-overview/utils/format-percentage";
import { Progress } from "@/components/ui/progress";

const statusMessages = {
  GENERATING_SENTENCES: "Generating Sentences",
  SENTENCES_GENERATED: "Sentences Generated",
  GENERATING_TRANSLATIONS: "Generating Translations",
  TRANSLATED: "Translated",
  GENERATING_AUDIO_AND_SENTENCES: "Generating Audio and Sentences",
  AUDIO_AND_SENTENCES_GENERATED: "Audio and Sentences Generated",
  UPLOADING_AUDIO_AND_SENTENCES: "UPLOADING_AUDIO_AND_SENTENCES",
} as any;

export function WithConvoStatusLoading({ contentId }: { contentId: string }) {
  const { data: content, isLoading } = useGetContentQuery(
    {
      contentId: contentId,
    },
    {
      refetchInterval: 3000,
    }
  );

  return (
    <div className="flex justify-center flex-col items-center my-32">
      <AnimatedLoadingText
        message={statusMessages?.[content.status] || "Saved Initial Data"}
      />

      {content?.progress && (
        <Progress
          value={(content?.progress || 0) * 100}
          className="max-w-xs h-[6px] mt-4"
        />
        // <p className="mt-8 text-light">
        //   Progress: {formatPercentage(content?.progress || 0)}
        // </p>
      )}
    </div>
  );
}
