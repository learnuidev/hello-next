import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useConvosStore } from "@/stores/convos-store";
import { ConvoInsights } from "./convo-insights";
import { Play } from "./_play";

export const ConvoDetails = ({ lessonId }: { lessonId: string }) => {
  const viewType = useConvosStore((state: any) => state?.viewType);

  if (viewType === "listen") {
    return (
      <div className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2">
        <Play lessonId={lessonId} />
      </div>
    );
  }

  if (viewType === "write") {
    return (
      <div className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2">
        Write
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
    return (
      //   <div className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2">
      //     Insights
      //   </div>
      <ConvoInsights lessonId={lessonId} />
    );
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
