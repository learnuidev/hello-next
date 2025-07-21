"use client";

import { useParams } from "next/navigation";

export const useBookParams = () => {
  const params = useParams<{ "book-id": string; "chapter-id": string }>();

  return {
    bookId: params["book-id"],
    chapterId: params["chapter-id"],
  };
};
