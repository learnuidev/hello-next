"use client";

import { ContentV2Type } from "@/domain/content-service/content-v2.types";
import { Youtube, FileText, Globe, Mic } from "lucide-react";

export const CONTENT_TYPES = [
  {
    id: "youtube",
    title: "Youtube",
    icon: Youtube,
    description: "Import from YouTube videos",
  },
  {
    id: "text",
    title: "Text",
    icon: FileText,
    description: "Write or paste content",
  },
  {
    id: "website",
    title: "Website",
    icon: Globe,
    description: "Import from web URLs",
  },
  {
    id: "audio",
    title: "Audio",
    icon: Mic,
    description: "Record or upload audio",
  },
];

export function SelectContentType({
  setContentType,
}: {
  setContentType: (contentType: ContentV2Type) => void;
}) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-8">
        Select a Content Type
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CONTENT_TYPES.map((contentType) => {
          const Icon = contentType.icon;
          return (
            <button
              key={contentType.id}
              onClick={() => setContentType(contentType.id as ContentV2Type)}
              className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-white dark:bg-[rgb(21,22,23)] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-[rgb(26,27,28)] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800/50 group-hover:bg-gray-200 dark:group-hover:bg-gray-800 transition-colors duration-200">
                <Icon className="w-8 h-8 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                  {contentType.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200 mt-1">
                  {contentType.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
