import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useConvosStore } from "@/stores/convos-store";
import { ConvoInsights } from "./convo-insights";
import { Play } from "./_play";

import { Wordle } from "@/components/wordle/game";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { useSearchParams as _useSearchParams } from "next/navigation";
import { YouTubePage } from "@/components/youtube-page/v1";

function useSearchParams() {
  const searchParams = _useSearchParams();
  return {
    lessonId: searchParams?.get("lessonId") as string,
  };
}

export const ConvoDetails = ({ lessonId }: { lessonId: string }) => {
  const viewType = useConvosStore((state: any) => state?.viewType);

  // const { lessonId } = useSearchParams();

  const { data: contentsArr } = useListContentsQuery();

  const lesson2 = contentsArr?.find((content: any) => content?.id === lessonId);

  // If the link contains yotube - then show youtube page
  if (
    viewType === "listen" &&
    lesson2?.audio?.includes("https://www.youtube.com")
  ) {
    return (
      <div>
        <YouTubePage lessonId={lessonId} />
      </div>
    );
  }

  if (viewType === "listen") {
    return (
      <div className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2">
        <Play lessonId={lessonId} />
      </div>
    );
  }

  if (viewType === "write") {
    return (
      <div>
        {/* Write */}
        <Wordle lessonId={lessonId} />
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
