"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { cn } from "@/lib/utils";
import { useGetContentId } from "./[content-id]/hooks/use-get-content-id";
import { useListPublishedContentsQuery } from "./[content-id]/hooks/use-list-published-contents-query";
import { useTogglePublishContentMutation } from "./[content-id]/hooks/use-toggle-publish-content-mutation";
import { GeneralContentSettings } from "./general-content-settings";
import { ContentTranscriptionSettings } from "./content-transcription-settings";

export const ContentSettings = () => {
  const contentId = useGetContentId();

  const togglePublishContentMutation = useTogglePublishContentMutation();

  const { data } = useListPublishedContentsQuery({});

  const containsPublished = data?.items?.find(
    (item: any) => item?.id === contentId,
  );

  return (
    <div className="px-4 md:px-32 md:mt-2">
      <div className="flex my-12 mb-12 items-center justify-between">
        <h3 className="text-3xl font-extralight">Settings</h3>
        <Button
          disabled={togglePublishContentMutation.isPending}
          className={cn(
            togglePublishContentMutation.isPending ? "text-gray-500" : "",
            "rounded-none uppercase",
          )}
          onClick={() => {
            if (!containsPublished) {
              togglePublishContentMutation.mutateAsync({
                contentId,
                type: "publish",
              });
            } else {
              togglePublishContentMutation.mutateAsync({
                contentId,
                type: "unpublish",
              });
            }
          }}
        >
          {containsPublished ? "Unpublish" : "Publish"}
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General Info</TabsTrigger>
          <TabsTrigger value="transcriptions">Transcriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralContentSettings />
        </TabsContent>

        <TabsContent value="transcriptions">
          <ContentTranscriptionSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
