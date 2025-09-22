/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Icons } from "@/components/ui/icons.v2";
import { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useBookParams } from "../../listen/books/[book-id]/hooks/use-book-params";
import { useGetBookQuery } from "../../listen/[media-id]/hooks/use-get-book-query";
import { useNewBookState } from "../../listen/hooks/use-new-book-state";
import { useUpdateBookMutation } from "../../listen/[media-id]/hooks/use-update-book-mutation";
import { UploadMediaButton } from "../../listen/[media-id]/components/upload-media-button";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { SearchInput } from "@/components/search-input";
import { useSearchQueryStore } from "@/components/search/state";
import { useAddBookSectionsMutation } from "../../listen/[media-id]/hooks/use-add-book-sections-mutation";

export default function MediaDetails() {
  const { bookId } = useBookParams();

  const { data: book, isLoading } = useGetBookQuery(bookId);

  const { data: contents } = useListContentsQuery();

  const isSuperAdmin = useIsSuperAdmin();

  const queryStr = useSearchQueryStore((state) => state.querySync);

  const {
    editChapter,
    setEditChapter,
    setChapters,
    addNewChapter,
    chapters,
    updateChapter,
    removeChapter,
    resetState,
    // sections
    sections,
    addNewSection,
    setSections,
    removeSection,
    // removeSection
  } = useNewBookState();

  const updateBookMutation = useUpdateBookMutation();

  const addBookSectionsMutation = useAddBookSectionsMutation();

  useEffect(() => {
    if (editChapter && book?.sections) {
      setSections(
        book?.sections.map((chapter) => {
          return {
            ...chapter,
            isNew: false,
          };
        })
      );
    }
  }, [book?.sections, editChapter, setSections]);

  const filteredContents = useMemo(() => {
    return contents?.items?.filter((item) => {
      if (!queryStr) {
        return true;
      }

      return JSON.stringify(item)
        ?.toLowerCase()
        ?.includes(queryStr?.toLowerCase());
    });
  }, [queryStr]);

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

  const buttonStyle = {
    backgroundColor: `${book.dominantColor}`,
    padding: "8px 4px",
    borderRadius: "8px",
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <div className="mb-12 flex justify-between items-center">
        <Link href={`/books`} className="flex gap-4 items-center text-xl">
          <Icons.back />

          <span>Back</span>
        </Link>

        <button
          onClick={() => {
            setEditChapter(!editChapter);
          }}
          className="transition-all"
        >
          {editChapter ? (
            <Icons.xMark className={"text-2xl lg:text-4xl"} />
          ) : (
            <Icons.plusIcon className={"text-2xl lg:text-4xl"} />
          )}
        </button>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <img
              className="aspect-square"
              src={book?.coverPhotoUrl}
              alt="book photo"
            />

            <div>
              <h4 className="text-2xl">Sections</h4>

              <div className="my-4">
                <SearchInput />
              </div>

              {/* <div>
                <code>
                  <pre>{JSON.stringify(sections, null, 4)}</pre>
                </code>
              </div> */}

              <div className="mt-8 space-y-4">
                {editChapter ? (
                  <div>
                    <div className="flex flex-col space-y-4">
                      {sections?.map(
                        (chapter: {
                          id: string;
                          title: string;
                          chapterNumber: number;
                        }) => {
                          return (
                            <div
                              key={chapter?.id}
                              className="flex flex-row gap-8"
                            >
                              <p
                                // value={chapter?.title}
                                // onChange={(event) => {
                                //   updateChapter({
                                //     ...chapter,
                                //     title: event.target.value,
                                //   });
                                // }}
                                // placeholder="Chapter title"
                                className={cn(
                                  "border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300  dark:text-gray-300 placeholder:text-gray-600 border-2 focus:border-none px-2 focus:outline-none active:outline-none py-2",
                                  "w-full text-xl px-4 bg-gray-100 dark:bg-[rgb(31,32,33)]"
                                )}
                              >
                                {chapter?.title}
                              </p>

                              <button
                                onClick={() => {
                                  removeSection(chapter.id);
                                }}
                              >
                                <Icons.xMark />
                              </button>
                            </div>
                          );
                        }
                      )}
                    </div>

                    <button
                      className="w-full mt-12"
                      onClick={() => {
                        if (sections?.length > 0) {
                          addBookSectionsMutation
                            .mutateAsync({
                              bookId: book.id,
                              sectionIds: sections?.map((item: any, idx) => {
                                return {
                                  id: item?.id,
                                  sectionNumber: idx + 1,
                                };
                              }),
                            })
                            .then((resp) => {
                              resetState();
                              setEditChapter(false);
                            });
                        }
                      }}
                    >
                      {addBookSectionsMutation.isPending
                        ? "Updating..."
                        : "Update"}
                    </button>

                    {/* {isSuperAdmin && (
                      <code>
                        <pre>{JSON.stringify(chapters, null, 4)}</pre>
                      </code>
                    )} */}
                  </div>
                ) : (
                  book?.sections?.map((chapter) => {
                    return (
                      <Link
                        className="block"
                        href={`/convos/${chapter?.id}`}
                        key={chapter?.id}
                      >
                        <p>{chapter?.title}</p>
                      </Link>
                    );
                  })
                )}

                <button style={buttonStyle}> Start Reading</button>
              </div>

              {editChapter && (
                <div className="mt-8">
                  {filteredContents?.map((content) => {
                    return (
                      <div
                        key={content?.id}
                        onClick={() => {
                          addNewSection(content);
                        }}
                      >
                        <p>{content?.title}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
