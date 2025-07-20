"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useAddBookMutation } from "../[media-id]/hooks/use-add-book-mutation";
import { useListenState } from "../hooks/use-listen-state";
import { useNewBookState } from "../hooks/use-new-book-state";

export function AddNewBook() {
  const {
    title,
    setTitle,
    author,
    setAuthor,
    chapters,
    addNewChapter,
    updateChapter,
    removeChapter,
    resetState,
    lang,
    setLang,
  } = useNewBookState();

  const { setAddNew } = useListenState();

  const addBookMutation = useAddBookMutation();
  return (
    <div className="mx-4 md:mx-32">
      <code>
        <pre>{JSON.stringify({ title, author, chapters }, null, 4)}</pre>
      </code>
      <h4 className="text-center mt-32"> Add new book </h4>

      <input
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        placeholder="title"
        className={cn(
          "mt-4 border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300  dark:text-gray-300 placeholder:text-gray-600 border-2 focus:border-none px-2 focus:outline-none active:outline-none py-2",
          "w-full text-xl px-4 bg-gray-100 dark:bg-[rgb(31,32,33)]"
        )}
      />

      <input
        value={author}
        onChange={(event) => {
          setAuthor(event.target.value);
        }}
        placeholder="author"
        className={cn(
          "mt-4 border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300  dark:text-gray-300 placeholder:text-gray-600 border-2 focus:border-none px-2 focus:outline-none active:outline-none py-2",
          "w-full text-xl px-4 bg-gray-100 dark:bg-[rgb(31,32,33)]"
        )}
      />
      <input
        value={lang}
        onChange={(event) => {
          setLang(event.target.value);
        }}
        placeholder="language"
        className={cn(
          "mt-4 border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300  dark:text-gray-300 placeholder:text-gray-600 border-2 focus:border-none px-2 focus:outline-none active:outline-none py-2",
          "w-full text-xl px-4 bg-gray-100 dark:bg-[rgb(31,32,33)]"
        )}
      />

      {chapters?.length > 0 && (
        <h4 className="mt-12 mb-4 text-center">Chapters</h4>
      )}

      <div className="flex flex-col space-y-4">
        {chapters?.map(
          (chapter: { id: string; title: string; chapterNumber: number }) => {
            return (
              <div key={chapter?.id} className="flex flex-row gap-8">
                <input
                  value={chapter?.title}
                  onChange={(event) => {
                    updateChapter({ ...chapter, title: event.target.value });
                  }}
                  placeholder="Chapter"
                  className={cn(
                    "border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300  dark:text-gray-300 placeholder:text-gray-600 border-2 focus:border-none px-2 focus:outline-none active:outline-none py-2",
                    "w-full text-xl px-4 bg-gray-100 dark:bg-[rgb(31,32,33)]"
                  )}
                />

                <button
                  onClick={() => {
                    removeChapter(chapter.id);
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
        className="mt-12 w-full"
        onClick={() => {
          addNewChapter();
        }}
      >
        <Icons.plusIcon /> <span> Add a chapter </span>
      </button>

      <button
        className="w-full mt-12"
        onClick={() => {
          addBookMutation
            .mutateAsync({
              title,
              author,
              chapters,
              lang,
            })
            .then((resp) => {
              resetState();
              setAddNew(false);
            });
        }}
      >
        {addBookMutation.isPending ? "Adding..." : "Add"}
      </button>
    </div>
  );
}
