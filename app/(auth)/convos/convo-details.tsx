import { groupBy } from "ramda";
import { ConvoInsights } from "./convo-insights/convo-insights";

import { Wordle } from "@/components/wordle/wordle";
import { useGetContentQuery } from "@/domain/content/content.queries";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { FloatingNavbar } from "@/components/floating-navbar";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { YouTubePlayer } from "@/components/youtube-page/youtube-player";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useSearchParams } from "next/navigation";
import { DynaCloze } from "./[content-id]/dyna-cloze/dyna-cloze";
import { useIsContentAuthor } from "./[content-id]/hooks/use-is-content-author";
import { Speak } from "./[content-id]/speak/speak";
import { AI } from "./ai";
import { AudiobookPlayer } from "./audiobook-player/audiobook-player";
import { ContentSettings } from "./content-settings";
import { PlayV3 } from "./play-v3/play-v3";
import { isVideoUrl } from "./utils/is-video-url";
import { isYoutube } from "./utils/is-youtube";
import { DynaSelector } from "./[content-id]/dyna-cloze/dyna-selector";

export const ConvoDetails = ({ contentId }: { contentId: string }) => {
  const searchParams = useSearchParams();

  const viewType = searchParams.get("view") || "listen";

  const isAuthor = useIsContentAuthor(contentId);

  const isSuperAdmin = useIsSuperAdmin();
  const groupBySectionId = groupBy((item: any) => item.sectionId);

  const { data: content, isLoading } = useGetContentQuery({
    contentId: contentId,
  });

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(contentId);

  const currentTranscription =
    content?.transcriptions?.find(
      (trans: any) => trans?.start <= currentTime && trans?.end >= currentTime
    ) || content?.transcriptions?.[0];

  if (isLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  if (viewType === "settings") {
    if (!isAuthor) {
      return (
        <Nothing message="You dont have the permission to view this page" />
      );
    }
    return <ContentSettings />;
  }

  // if (viewType === "clipboard" && content.lang !== "zh") {
  // if (viewType === "clipboard") {
  //   if (content && content?.transcriptions?.length > 0) {
  //     const transcriptionStr = Object.entries(
  //       groupBySectionId(content?.transcriptions || [])
  //     )
  //       .map((item: any) =>
  //         item?.[1].map((v: any) => v?.input || v?.hanzi)?.join(".")
  //       )
  //       .join("\n\n");

  //     return <Clipboard lang={content.lang} content={transcriptionStr} />;
  //   } else {
  //     return (
  //       <Nothing message="Please add some content before viewing this page" />
  //     );
  //   }
  // }

  // If the link contains yotube - then show youtube page
  if (
    viewType === "listen" &&
    (isYoutube(content?.audio) || isVideoUrl(content?.audio))
  ) {
    return (
      <div>
        <YouTubePlayer contentId={contentId} />

        {/* <FloatingNavbar /> */}
      </div>
    );
  }
  if (viewType === "ai") {
    if (!isSuperAdmin) {
      if (!isAuthor) {
        return (
          <Nothing message="You dont have the permission to view this page" />
        );
      }
    }
    return (
      <div className="px-4 md:px-32">
        <AI contentId={contentId} />
      </div>
    );
  }

  if (viewType === "listen") {
    // if (content?.lang === "zh") {
    return <AudiobookPlayer contentId={contentId} />;
    // }

    return (
      <div className="px-4 md:px-12">
        <PlayV3 contentId={contentId} />
      </div>
    );
  }

  if (viewType === "write") {
    if (content?.lang !== "zh") {
      return <Nothing message="Wordle is enabled only for Chinese" />;
    }
    return (
      <div>
        {/* Write */}
        <Wordle contentId={contentId} />
      </div>
    );
  }

  if (viewType === "dynacloze") {
    return <DynaSelector contentId={contentId} />;
  }

  if (viewType === "speak") {
    return <Speak contentId={contentId} />;
  }
  if (viewType === "learn") {
    return (
      <div className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2">
        Learn
      </div>
    );
  }

  if (viewType === "insights") {
    // if (content?.lang !== "zh") {
    //   return <Nothing message="Insights is enabled only for Chinese" />;
    // }

    return (
      <>
        <ConvoInsights contentId={contentId} />
        <FloatingNavbar />
      </>
    );
  }

  return (
    <div>
      <YouTubePlayer contentId={contentId} />

      {/* <FloatingNavbar /> */}
    </div>
  );
};
