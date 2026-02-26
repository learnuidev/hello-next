"use client";

import {
  ContentV2,
  ContentV2Type,
} from "@/domain/content-service/content-v2.types";
import { useAddContentV2Mutation } from "@/domain/content-service/use-add-content-v2.mutation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ContentFormByType({
  contentType,
}: {
  contentType: ContentV2Type;
}) {
  const router = useRouter();

  const addContentV2Mutation = useAddContentV2Mutation();

  return (
    <div>
      <div className="my-8">
        <p>Content Type: {contentType}</p>
      </div>

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
                router.push(`/contents/${resp.pk}`);
              });
          }}
        >
          {" "}
          Add Content{" "}
        </Button>
      </div>
    </div>
  );
}
