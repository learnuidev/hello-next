/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { UploadMediaButton } from "../../[media-id]/components/upload-media-button";
import { useGetBookQuery } from "../../[media-id]/hooks/use-get-book-query";
import { useUpdateBookMutation } from "../../[media-id]/hooks/use-update-book-mutation";
import { useBookParams } from "./hooks/use-book-params";
import { Icons } from "@/components/ui/icons.v2";

export default function MediaDetails() {
  const { bookId } = useBookParams();

  const { data: book, isLoading } = useGetBookQuery(bookId);

  const updateBookMutation = useUpdateBookMutation();

  if (isLoading) {
    return null;
  }

  if (!book) {
    return (
      <div>
        <h1>Book doesnt exist</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <div className="mb-12">
        <Link href={`/listen`} className="flex gap-4 items-center text-xl">
          <Icons.back />

          <span>Back</span>
        </Link>
      </div>
      <h1 className="text-2xl lg:text-4xl font-bold">{book.title}</h1>

      <section className="mt-12">
        {!book?.coverPhotoId ? (
          <UploadMediaButton
            text="Add book cover photo"
            onUploadSuccess={({ id }) => {
              updateBookMutation.mutateAsync({
                bookId: book.id,
                coverPhotoId: id,
              });
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <img
              className="aspect-square"
              src={book?.coverPhotoUrl}
              alt="book photo"
            />

            <div>
              <h4 className="text-2xl">Chapters</h4>

              <div className="mt-8 space-y-4">
                {book?.chapters?.map((chapter) => {
                  return (
                    <Link
                      className="block"
                      href={`/listen/books/${book?.id}/${chapter?.id}`}
                      key={chapter?.id}
                    >
                      <p>{chapter?.title}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
