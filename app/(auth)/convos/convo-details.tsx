import { Tabs, TabsContent } from "@/components/ui/tabs";

import { useConvosStore } from "@/stores/convos-store";
import { ConvoInsights } from "./convo-insights";

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

export const ConvoDetails = ({ lessonId }: { lessonId: string }) => {
  const viewType = useConvosStore((state: any) => state?.viewType);

  const isAuthor = useIsContentAuthor(lessonId);

  const isSuperAdmin = useIsSuperAdmin();

  const { data: lesson2, isLoading } = useGetContentQuery({
    contentId: lessonId,
  });

  if (isLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  // const lesson2 = contentsArr?.find((content: any) => content?.id === lessonId);

  if (viewType === "settings") {
    if (!isAuthor) {
      return (
        <Nothing message="You dont have the permission to view this page" />
      );
    }
    return <ContentSettings />;
  }

  // If the link contains yotube - then show youtube page
  if (viewType === "listen" && isYoutube(lesson2?.audio)) {
    return (
      <div>
        <YouTubePlayer lessonId={lessonId} />
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
    // return (
    //   <div className="font-light flex justify-between items-center w-full md:mt-12">
    //     {/* <Play key={lessonId} lessonId={lessonId} /> */}
    //     <PlayV2 contentId={lessonId} />
    //   </div>
    // );

    // return <AudioPlayer />;

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
        <Wordle />
      </div>
    );
  }

  if (viewType === "speak") {
    return (
      <div className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2">
        Speak
      </div>
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
    if (lesson2?.lang !== "zh") {
      return <Nothing message="Insights is enabled only for Chinese" />;
    }

    return <ConvoInsights lessonId={lessonId} />;
  }

  return (
    <div className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2">
      {" "}
      {/* TODO{" "} */}
      {/* <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent> */}
      <Tabs defaultValue={viewType}>
        {/* <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList> */}
        <TabsContent value="listen">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="listen"> Listen </TabsContent>
        <TabsContent value="write">Write</TabsContent>
        <TabsContent value="speak"> Speak </TabsContent>
        <TabsContent value="learn">Learn</TabsContent>
        <TabsContent value="insights">Insights</TabsContent>
      </Tabs>
    </div>
  );
};
