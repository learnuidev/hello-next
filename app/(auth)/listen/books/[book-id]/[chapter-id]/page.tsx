/* eslint-disable @next/next/no-img-element */
"use client";

import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useBookParams } from "../hooks/use-book-params";
import { useListChapterSectionsQuery } from "./hooks/use-list-chapter-sections-query";
import { useNewChapterSectionsState } from "../../../hooks/use-new-chapter-sections-state";
import { useListMediaQuery } from "../../../hooks/use-list-media-query";

export default function ChapterItem() {
  const { bookId, chapterId } = useBookParams();

  const { data } = useListChapterSectionsQuery(chapterId);

  const {
    editSection,
    setEditSection,
    addNewSection,
    removeSection,
    sections,
  } = useNewChapterSectionsState();

  const { data: mediaList } = useListMediaQuery();

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
        <button
          onClick={() => {
            setEditSection(!editSection);
          }}
        >
          Add section
        </button>
      </div>

      {editSection && (
        <div className="mt-8">
          <h4 className="text-xl mb-8">Add Sections</h4>

          <div>
            <code>
              <pre>{JSON.stringify(sections, null, 4)}</pre>
            </code>
          </div>

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

      <div className="mt-12">
        <code>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </code>
      </div>
    </div>
  );
}
