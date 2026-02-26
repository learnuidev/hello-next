"use client";
import { Button } from "@/components/ui/button";
import { useListContentsV2Query } from "@/domain/content-service/use-list-contents-v2.query";

export function ContentsV2List({
  handleAddNewContent,
}: {
  handleAddNewContent: () => void;
}) {
  const { data } = useListContentsV2Query({
    limit: 50,
    status: "QUEUED",
    direction: "desc",
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center">Content Pipeline Demo</h1>

      <div className="my-8">
        <Button
          onClick={() => {
            handleAddNewContent();
            // addContentV2Mutation
            //   .mutateAsync({
            //     audioId: "todo",
            //     transcriptId: "todo",
            //     title: "New Content",
            //     type: "text",
            //     text: "你好兄弟",
            //   })
            //   .then((resp) => {
            //     setNewContent(resp);
            //   });
          }}
        >
          {" "}
          Add Content{" "}
        </Button>
      </div>

      <div className="mt-4">
        <code>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </code>
      </div>
    </div>
  );
}
