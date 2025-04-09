import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useDeleteContentMutation } from "@/domain/content/use-delete-content-mutation";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetContentId } from "./[content-id]/hooks/use-get-content-id";
import { useListPublishedContentsQuery } from "./[content-id]/hooks/use-list-published-contents-query";
import { useTogglePublishContentMutation } from "./[content-id]/hooks/use-toggle-publish-content-mutation";

export const ContentSettings = () => {
  const [contentType, setContentType] = useState("not-selected");

  const updateContentMutation = useUpdateContentMutation();
  const deleteContentMutation = useDeleteContentMutation();
  const contentId = useGetContentId();

  const { data: content } = useGetContentQuery({ contentId });

  const { data } = useListPublishedContentsQuery({});

  const containsPublished = data?.items?.find(
    (item: any) => item?.id === contentId
  );

  const togglePublishContentMutation = useTogglePublishContentMutation();

  useEffect(() => {
    if (content?.contentType) {
      setContentType(content?.contentType);
    }
  }, [content?.contentType]);

  const router = useRouter();

  console.log("CONTENT", content);

  return (
    <div className="px-4 md:px-32 md:mt-2">
      <div className="flex my-12 mb-24 items-center justify-between">
        <h3 className="text-3xl font-extralight">Settings</h3>
        <Button
          disabled={togglePublishContentMutation.isLoading}
          className={cn(
            togglePublishContentMutation.isLoading ? "text-gray-500" : "",
            "rounded-none uppercase"
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
      <div className="my-4">
        <Label className="text-xl text-gray-500 mb-4 block">
          {" "}
          Content Type{" "}
        </Label>
        <Select
          defaultValue="characters-learned"
          value={contentType}
          onValueChange={(value) => {
            setContentType(value);
          }}
        >
          <SelectTrigger className="sm:w-1/2 w-full h-12 text-2xl bg-transparent dark:text-white dark:border-gray-800 px-2">
            <SelectValue placeholder="Select content type" className="" />
          </SelectTrigger>
          <SelectContent className="mx-0">
            <SelectItem value="not-selected">Not Selected</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="podcast">Podcast</SelectItem>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="essay">Essay</SelectItem>
            <SelectItem value="story">Story</SelectItem>
            <SelectItem value="tweet">Tweet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant={"outline"}
        disabled={updateContentMutation?.isLoading}
        className={cn(
          updateContentMutation?.isLoading ? "text-gray-500" : "",
          "mt-8 sm:w-24 uppercase w-full rounded-full"
        )}
        onClick={() => {
          return updateContentMutation.mutateAsync({
            id: content?.id || "",
            contentType,

            updatedAt: Date.now(),
          });
        }}
      >
        Save
      </Button>

      <Button
        variant={"outline"}
        disabled={deleteContentMutation.isLoading || containsPublished}
        className={cn(
          updateContentMutation?.isLoading ? "text-gray-500" : "",
          "mt-8 sm:w-24 uppercase w-full rounded-full text-red-500"
        )}
        onDoubleClick={() => {
          return deleteContentMutation
            .mutateAsync({
              id: content?.id || "",
            })
            .then((res) => {
              router.push("/convos");
            });
        }}
      >
        Delete
      </Button>
    </div>
  );
};
