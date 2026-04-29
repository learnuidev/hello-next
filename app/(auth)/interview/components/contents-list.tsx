"use client";

import { useState } from "react";
import { GridBankMediaContent } from "../modules/media/media.types";
import { ContentItemPreview } from "./content-item-preview";
import Link from "next/link";

export const ContentsList = ({
  gridBankContents,
}: {
  gridBankContents: GridBankMediaContent[];
}) => {
  const [contents, setContents] = useState(gridBankContents);

  const toggleBookMark = async (videoId: string) => {
    const newBookmarkedState = !contents.find((c) => c.video_id === videoId)
      ?.bookmarked;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const endpoint = newBookmarkedState
      ? "/api/add-bookmark"
      : "/api/delete-bookmark";

    try {
      await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_id: videoId }),
      });

      setContents((prevContents) =>
        prevContents.map((contentItem) => {
          if (contentItem.video_id === videoId) {
            return {
              ...contentItem,
              bookmarked: newBookmarkedState,
            };
          }
          return contentItem;
        }),
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <section className="grid grid-cols-1 gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 p-4">
      {contents.map((content) => {
        return (
          <Link href={`/interview/${content.video_id}`} key={content.video_id}>
            <ContentItemPreview
              key={content.video_id}
              asset={content}
              onToggleBookmark={toggleBookMark}
            />
          </Link>
        );
      })}
    </section>
  );
};
