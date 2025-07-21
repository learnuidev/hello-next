/* eslint-disable @next/next/no-img-element */
"use client";

import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useBookParams } from "../hooks/use-book-params";

export default function ChapterItem() {
  const { bookId, chapterId } = useBookParams();

  //   const { data: book, isLoading } = useGetBookQuery(bookId);

  //   const updateBookMutation = useUpdateBookMutation();

  //   if (isLoading) {
  //     return null;
  //   }

  //   if (!book) {
  //     return (
  //       <div>
  //         <h1>Book doesnt exist</h1>
  //       </div>
  //     );
  //   }

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <div className="mb-12">
        <Link
          href={`/listen/books/${bookId}`}
          className="flex gap-4 items-center text-xl"
        >
          <Icons.back />

          <span>Back</span>
        </Link>
      </div>
      <h1 className="text-2xl lg:text-4xl font-bold">Chapter title</h1>

      <div className="mt-12">
        <button>Add section</button>
      </div>
    </div>
  );
}
