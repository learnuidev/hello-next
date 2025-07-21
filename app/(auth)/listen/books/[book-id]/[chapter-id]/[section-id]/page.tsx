"use client";

import { Reader } from "@/app/(auth)/listen/[media-id]/components/reader";
import { useBookParams } from "../../hooks/use-book-params";
import { useRouter } from "next/navigation";
import { useListChapterSectionsQuery } from "../hooks/use-list-chapter-sections-query";
import { useBookState } from "../hooks/use-book-state";
import Link from "next/link";
import { useGetBookQuery } from "@/app/(auth)/listen/[media-id]/hooks/use-get-book-query";

export default function SectionReader() {
  const { sectionId, bookId, chapterId } = useBookParams();

  const { setShowEndPage, showEndPage } = useBookState();

  const { data: book } = useGetBookQuery(bookId);

  const currentChapter = book?.chapters?.find((ch) => ch?.id === chapterId);

  const nextChapter = currentChapter
    ? book?.chapters?.find(
        (ch) => ch?.chapterNumber === currentChapter?.chapterNumber + 1
      )
    : null;

  const { data: chapterSections } = useListChapterSectionsQuery(chapterId);

  const currentSection = chapterSections?.find(
    (section) => section?.id === sectionId
  );
  const nextSection = currentSection
    ? chapterSections?.find(
        (section) =>
          section?.sectionNumber === currentSection?.sectionNumber + 1
      )
    : null;

  const router = useRouter();

  if (showEndPage) {
    return (
      <main className="flex justify-center items-center flex-col">
        <h4 className="mt-32">You have finished reading this chapter </h4>

        <div className="flex gap-4 mt-8">
          {nextChapter && (
            <Link
              onClick={() => {
                setShowEndPage(false);
              }}
              href={`/listen/books/${bookId}/${nextChapter?.id}?autoPlay=true`}
            >
              Go to next Chapter{" "}
            </Link>
          )}

          <Link
            onClick={() => {
              setShowEndPage(false);
            }}
            href="/listen"
          >
            {" "}
            Back to bookshelf{" "}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div>
      <Reader
        autoPlay
        mediaId={sectionId}
        playNext={() => {
          if (nextSection) {
            router.push(
              `/listen/books/${bookId}/${chapterId}/${nextSection.id}`
            );
          } else {
            setShowEndPage(true);
          }
        }}
      />{" "}
    </div>
  );
}
