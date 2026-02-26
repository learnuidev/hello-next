"use client";

import { Icons } from "@/components/ui/icons.v2";
import {
  ContentV2,
  ContentV2Type,
} from "@/domain/content-service/content-v2.types";
import { useAddContentV2Mutation } from "@/domain/content-service/use-add-content-v2.mutation";
import { useState } from "react";
import { ContentFormByType } from "./content-form-by-type";
import { ContentsV2List } from "./contents-list";
import { SelectContentType } from "./select-content-type";

function AddNewContentForm({
  handleCancelAddContent,
}: {
  handleCancelAddContent: () => void;
}) {
  const [contentType, setContentType] = useState<ContentV2Type | null>(null);

  const addContentV2Mutation = useAddContentV2Mutation();

  return (
    <div className="p-8">
      {contentType ? (
        <div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setContentType(null);
              }}
            >
              <Icons.back className="text-xl" />
            </button>
          </div>

          <ContentFormByType contentType={contentType} />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <button onClick={handleCancelAddContent}>
              <Icons.xMark className="text-xl" />
            </button>
          </div>
          <SelectContentType
            setContentType={(contentType: ContentV2Type) => {
              setContentType(contentType);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function ContentsPage() {
  const [addNewContent, setAddNewContent] = useState(false);

  if (addNewContent) {
    return (
      <AddNewContentForm
        handleCancelAddContent={() => {
          setAddNewContent(false);
        }}
      />
    );
  }

  return (
    <ContentsV2List
      handleAddNewContent={() => {
        setAddNewContent(true);
      }}
    />
  );
}
