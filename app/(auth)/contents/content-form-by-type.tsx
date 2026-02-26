"use client";

"use client";

import { Icons } from "@/components/ui/icons.v2";
import {
  ContentV2,
  ContentV2Type,
} from "@/domain/content-service/content-v2.types";
import { useAddContentV2Mutation } from "@/domain/content-service/use-add-content-v2.mutation";
import { useState } from "react";

import { ContentsV2List } from "./contents-list";
import { SelectContentType } from "./select-content-type";
import { Button } from "@/components/ui/button";

export function ContentFormByType({
  contentType,
}: {
  contentType: ContentV2Type;
}) {
  const [content, setNewContent] = useState<ContentV2 | null>(null);

  const addContentV2Mutation = useAddContentV2Mutation();

  return (
    <div>
      <div className="my-8">
        <Button
          onClick={() => {
            addContentV2Mutation
              .mutateAsync({
                audioId: "todo",
                transcriptId: "todo",
                title: "New Content",
                type: contentType,
                text: "你好兄弟",
              })
              .then((resp) => {
                setNewContent(resp);
              });
          }}
        >
          {" "}
          Add Content{" "}
        </Button>
      </div>

      <div className="mt-4">
        <code>
          <pre>{JSON.stringify(content, null, 4)}</pre>
        </code>
      </div>
    </div>
  );
}
