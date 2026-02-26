"use client";

import { Icons } from "@/components/ui/icons.v2";
import { ContentV2Type } from "@/domain/content-service/content-v2.types";
import { useAddContentV2Mutation } from "@/domain/content-service/use-add-content-v2.mutation";
import { useState } from "react";
import { ContentFormByType } from "./content-form-by-type";
import { SelectContentType } from "./select-content-type";
import { Youtube, FileText, Globe, Mic } from "lucide-react";

export function AddNewContentForm({
  handleCancelAddContent,
}: {
  handleCancelAddContent: () => void;
}) {
  const [contentType, setContentType] = useState<ContentV2Type | null>(null);

  const addContentV2Mutation = useAddContentV2Mutation();

  const getContentTypeInfo = (type: ContentV2Type) => {
    switch (type) {
      case "youtube":
        return { icon: Youtube, title: "YouTube", color: "text-red-500" };
      case "text":
        return { icon: FileText, title: "Text", color: "text-blue-500" };
      case "website":
        return { icon: Globe, title: "Website", color: "text-purple-500" };
      case "audio":
        return { icon: Mic, title: "Audio", color: "text-green-500" };
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-4 flex items-center justify-between">
          <button onClick={handleCancelAddContent}>
            <Icons.xMark className="text-xl" />
          </button>
          <h1 className="text-lg font-semibold">New Content</h1>
          <div className="w-6" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-16">
        <div className="p-6 space-y-6">
          {!contentType && (
            <div className="mt-32">
              <SelectContentType setContentType={setContentType} />
            </div>
          )}

          {contentType && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/50 dark:to-slate-950/50 border border-gray-200/50 dark:border-gray-800/50 mb-4">
                {(() => {
                  const {
                    icon: Icon,
                    title,
                    color,
                  } = getContentTypeInfo(contentType);
                  return (
                    <>
                      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Selected content type
                        </p>
                        <p className="text-sm text-muted-foreground">{title}</p>
                      </div>
                      <button
                        onClick={() => setContentType(null)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icons.xMark className="text-lg" />
                      </button>
                    </>
                  );
                })()}
              </div>

              <ContentFormByType contentType={contentType} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
