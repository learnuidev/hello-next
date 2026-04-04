import { groupBy } from "ramda";
import { ConvoInsights } from "./convo-insights/convo-insights";

import { Wordle } from "@/components/wordle/wordle";
import { useGetContentQuery } from "@/domain/content/content.queries";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { TweetPage } from "@/components/_select-character/selected-character/tweet-page/tweet-page";
import { FloatingNavbar } from "@/components/floating-navbar";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { YouTubePlayer } from "@/components/youtube-page/youtube-player";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useSearchParams } from "next/navigation";
import { DynaSelector } from "./[content-id]/dyna-cloze/dyna-selector";
import { useIsContentAuthor } from "./[content-id]/hooks/use-is-content-author";
import { Speak } from "./[content-id]/speak/speak";
import { AI } from "./ai";
import { AudiobookPlayer } from "./audiobook-player/audiobook-player";
import { ContentSettings } from "./content-settings";
import { WithContentLoading } from "./[content-id]/with-content-loading";

// import { isVideoUrl } from "./utils/is-video-url";
// import { isYoutube } from "./utils/is-youtube";

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

  if (viewType === "listen" && content?.type === "tweet") {
    return (
      <WithContentLoading>
        <div>
          <TweetPage contentId={contentId} />

          <FloatingNavbar />
        </div>
      </WithContentLoading>
    );
  }

  if (viewType === "ai") {
    return (
      <WithContentLoading>
        <AI contentId={contentId} />
      </WithContentLoading>
    );
  }

  if (viewType === "listen") {
    return (
      <WithContentLoading>
        <AudiobookPlayer contentId={contentId} />
      </WithContentLoading>
    );
  }

  if (viewType === "write") {
    if (content?.lang !== "zh") {
      return (
        <WithContentLoading>
          <Nothing message="Wordle is enabled only for Chinese" />
        </WithContentLoading>
      );
    }
    return (
      <WithContentLoading>
        {/* Write */}
        <Wordle contentId={contentId} />
      </WithContentLoading>
    );
  }

  if (viewType === "dynacloze") {
    return (
      <WithContentLoading>
        <DynaSelector contentId={contentId} />
      </WithContentLoading>
    );
  }

  if (viewType === "speak") {
    return (
      <WithContentLoading>
        <Speak contentId={contentId} />
      </WithContentLoading>
    );
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
        <WithContentLoading>
          <ConvoInsights contentId={contentId} />
          <FloatingNavbar />
        </WithContentLoading>
      </>
    );
  }

  return (
    <WithContentLoading>
      <YouTubePlayer contentId={contentId} />

      {/* <FloatingNavbar /> */}
    </WithContentLoading>
  );
};
