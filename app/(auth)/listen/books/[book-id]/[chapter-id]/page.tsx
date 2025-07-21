/* eslint-disable @next/next/no-img-element */
"use client";

import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useBookParams } from "../hooks/use-book-params";
import { useListChapterSectionsQuery } from "./hooks/use-list-chapter-sections-query";
import { useNewChapterSectionsState } from "../../../hooks/use-new-chapter-sections-state";
import { useListMediaQuery } from "../../../hooks/use-list-media-query";
import { useAddChapterSectionsMutation } from "./hooks/use-add-chapter-sections-mutation";
import { useGetBookQuery } from "../../../[media-id]/hooks/use-get-book-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useGetChapter = ({
  bookId,
  chapterId,
}: {
  bookId: string;
  chapterId: string;
}) => {
  const { data, isLoading, isError } = useGetBookQuery(bookId);

  return {
    isLoading,
    isError,
    data: data?.chapters?.find((chapter) => chapter?.id === chapterId),
  };
};

export default function ChapterItem() {
  const { bookId, chapterId } = useBookParams();

  const searchParams = useSearchParams();

  const autoPlay = searchParams?.get("autoPlay");

  const { data, isLoading } = useListChapterSectionsQuery(chapterId);

  const { data: chapter } = useGetChapter({ bookId, chapterId });

  const {
    editSection,
    setEditSection,
    addNewSection,
    removeSection,
    sections,
    resetState,
  } = useNewChapterSectionsState();

  const { data: mediaList } = useListMediaQuery();

  const addChapterSectionMutation = useAddChapterSectionsMutation();

  const firstSectionId = data?.[0]?.id;

  const router = useRouter();

  useEffect(() => {
    if (autoPlay && firstSectionId) {
      router.push(`/listen/books/${bookId}/${chapterId}/${firstSectionId}`);
    }
  }, [autoPlay, bookId, chapterId, firstSectionId, router]);

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

  if (isLoading) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <div className="mb-12 flex justify-between items-center">
        <Link
          href={`/listen/books/${bookId}`}
          className="flex gap-4 items-center text-xl"
        >
          <Icons.back />

          <span>Back</span>
        </Link>

        <button
          onClick={() => {
            setEditSection(!editSection);
          }}
          className="transition-all"
        >
          {editSection ? (
            <Icons.xMark className={"text-2xl lg:text-4xl"} />
          ) : (
            <Icons.plusIcon className={"text-2xl lg:text-4xl"} />
          )}
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl lg:text-4xl font-bold">{chapter?.title}</h1>

        {data?.[0]?.id && (
          <Link href={`/listen/books/${bookId}/${chapterId}/${data?.[0]?.id}`}>
            <Icons.play className={"text-2xl lg:text-4xl"} />
          </Link>
        )}
      </div>

      {editSection && (
        <div className="mt-8">
          <h4 className="text-xl mb-8">{}</h4>

          <div>
            <code>
              <pre>{JSON.stringify(sections, null, 4)}</pre>
            </code>
          </div>

          <button
            className="my-8"
            onClick={() => {
              addChapterSectionMutation
                .mutateAsync({
                  chapterId,
                  sections,
                })
                .then((resp) => {
                  resetState();
                });
              alert("save");
            }}
          >
            Save
          </button>

          <div className="flex gap-4 flex-col justify-start mt-4">
            {mediaList?.map((item) => {
              return (
                <button
                  onClick={() => {
                    const hasSection: any = sections?.find(
                      (section: any) => section?.mediaId === item?.id
                    );

                    console.log("HAS SECTION", hasSection);

                    if (hasSection) {
                      removeSection(hasSection?.id);
                    } else {
                      addNewSection({
                        mediaId: item?.id,
                        title: item?.text?.slice(0, 48),
                      });
                    }
                  }}
                  className="text-left"
                  key={item?.id}
                >
                  {" "}
                  {item?.text?.slice(0, 32)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-12 space-y-8">
        {data && data?.length > 0 ? (
          data?.map((section) => {
            return (
              <div key={section?.id}>
                <Link
                  href={`/listen/books/${bookId}/${chapterId}/${section?.id}`}
                  className="text-2xl dark:text-gray-400 dark:hover:text-white transitiona-all"
                >
                  {section?.title?.slice(0, 32)}...
                </Link>
              </div>
            );
          })
        ) : (
          <div className="text-center mt-24 lg:mt-44">
            <Icons.spaceStation className="text-4xl mb-4" />
            <p className="text-center text-2xl text-gray-500">
              Nothing here. Please add some sections
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
