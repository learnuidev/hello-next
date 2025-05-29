import { Tabs, TabsContent } from "@/components/ui/tabs";

import { useConvosStore } from "@/stores/convos-store";
import { ConvoInsights } from "./convo-insights";
import { groupBy } from "ramda";

import { Wordle } from "@/components/wordle/wordle";
import { useGetContentQuery } from "@/domain/content/content.queries";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { YouTubePlayer } from "@/components/youtube-page/youtube-player";
import { AI } from "./ai";
import { PlayV3 } from "./play-v3/play-v3";
import { isYoutube } from "./utils/is-youtube";
import { ContentSettings } from "./content-settings";
import { useIsContentAuthor } from "./[content-id]/hooks/use-is-content-author";
import { Nothing } from "@/app/nmm/nothing";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { isVideoUrl } from "./utils/is-video-url";
import { DynaCloze } from "./[content-id]/dyna-cloze/dyna-cloze";
import { useSearchParams } from "next/navigation";
import { FloatingNavbar } from "@/components/floating-navbar";
import { Speak } from "./[content-id]/speak/speak";
import { Clipboard } from "../clipboard/clipboard";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";

export const ConvoDetails = ({ lessonId }: { lessonId: string }) => {
  const searchParams = useSearchParams();

  const viewType = searchParams.get("view") || "listen";

  const isAuthor = useIsContentAuthor(lessonId);

  const isSuperAdmin = useIsSuperAdmin();
  const groupBySectionId = groupBy((item: any) => item.sectionId);

  const { data: lesson2, isLoading } = useGetContentQuery({
    contentId: lessonId,
  });

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(lessonId);

  const currentTranscription =
    lesson2?.transcriptions?.find(
      (trans: any) => trans?.start < currentTime && trans?.end > currentTime
    ) || lesson2?.transcriptions?.[0];

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

  if (viewType === "clipboard" && lesson2.lang !== "zh") {
    if (lesson2 && lesson2?.transcriptions?.length > 0) {
      const transcriptionStr = Object.entries(
        groupBySectionId(lesson2?.transcriptions || [])
      )
        .map((item: any) =>
          item?.[1].map((v: any) => v?.input || v?.hanzi)?.join(".")
        )
        .join("\n\n");

      return <Clipboard lang={lesson2.lang} content={transcriptionStr} />;
    } else {
      return (
        <Nothing message="Please add some content before viewing this page" />
      );
    }
  }

  // If the link contains yotube - then show youtube page
  if (
    viewType === "listen" &&
    (isYoutube(lesson2?.audio) || isVideoUrl(lesson2?.audio))
  ) {
    return (
      <div>
        <YouTubePlayer lessonId={lessonId} />

        <FloatingNavbar />
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
        <AI lessonId={lessonId} />
      </div>
    );
  }

  if (viewType === "listen") {
    return (
      <div className="px-4 md:px-32">
        <PlayV3 contentId={lessonId} />
      </div>
    );
  }

  if (viewType === "write") {
    if (lesson2?.lang !== "zh") {
      return <Nothing message="Wordle is enabled only for Chinese" />;
    }
    return (
      <div>
        {/* Write */}
        <Wordle contentId={lessonId} />
      </div>
    );
  }

  if (viewType === "dynacloze") {
    return <DynaCloze contentId={lessonId} />;
  }

  if (viewType === "speak") {
    return <Speak contentId={lessonId} />;
  }
  if (viewType === "learn") {
    return (
      <div className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2">
        Learn
      </div>
    );
  }

  if (viewType === "insights") {
    if (lesson2?.lang !== "zh") {
      return <Nothing message="Insights is enabled only for Chinese" />;
    }

    return (
      <>
        <ConvoInsights lessonId={lessonId} />
        <FloatingNavbar />
      </>
    );
  }

  return (
    <div className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2">
      <div></div>
    </div>
  );
};
