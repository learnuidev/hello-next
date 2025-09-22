"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useNewBookState } from "../../listen/hooks/use-new-book-state";
import { useAddBookMutation } from "../../listen/[media-id]/hooks/use-add-book-mutation";
import { LanguageSelector } from "../new-content-v2/components/language-selector";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { imageFormats } from "@/components/_select-character/selected-character/character-content/image-formats";
import { ImagePreview } from "../new-content-v2/audio-flow/components/image-preview";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useAddBookMutation } from "../[media-id]/hooks/use-add-book-mutation";
// import { useListenState } from "../hooks/use-listen-state";
// import { useNewBookState } from "../hooks/use-new-book-state";

export function NewBook() {
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
    setCoverPhotoId,
    coverPhotoId,
  } = useNewBookState();

  const router = useRouter();

  const addBookMutation = useAddBookMutation();

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <div className="mb-12 flex justify-between items-center">
        <Link href={`/convos`} className="flex gap-4 items-center text-xl">
          <Icons.back />

          <span>Back</span>
        </Link>

        {/* <button
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
        </button> */}
      </div>

      <section className="mt-12 grid grid-cols-2 gap-8">
        <div>
          {coverPhotoId ? (
            <ImagePreview userAssetId={coverPhotoId} />
          ) : (
            <UploadFileButton
              className="dark:text-white text-center dark:bg-[rgb(21,22,23)] flex justify-center items-center rounded aspect-square"
              types={imageFormats}
              onSuccess={(newAsset) => {
                // setConvo("title", newAudio.name || "");
                setCoverPhotoId(newAsset.id);
              }}
            >
              Add a cover photo
            </UploadFileButton>
          )}
        </div>

        <div>
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

          <LanguageSelector
            value={lang}
            setValue={(lang) => {
              setLang(lang);
            }}
          />
        </div>
      </section>

      <button
        className="w-full mt-12"
        onClick={() => {
          addBookMutation
            .mutateAsync({
              title,
              author,
              lang,
              coverPhotoId,
            })
            .then((resp) => {
              router.push("/convos");
              resetState();
            });
        }}
      >
        {addBookMutation.isPending ? "Adding..." : "Add"}
      </button>

      <code>
        <pre>
          {JSON.stringify({ title, coverPhotoId, author, lang }, null, 4)}
        </pre>
      </code>
    </div>
  );

  return (
    <div className="mx-4 md:mx-32">
      <code>
        <pre>{JSON.stringify({ title, author, lang }, null, 4)}</pre>
      </code>

      {!coverPhotoId && (
        <UploadFileButton
          className="mt-12 dark:text-white text-center dark:bg-[rgb(21,22,23)] h-32 flex justify-center items-center rounded"
          types={imageFormats}
          onSuccess={(newAsset) => {
            // setConvo("title", newAudio.name || "");
            setCoverPhotoId(newAsset.id);
          }}
        >
          Add a cover photo
        </UploadFileButton>
      )}

      {coverPhotoId && <ImagePreview userAssetId={coverPhotoId} />}

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

      <LanguageSelector
        value={lang}
        setValue={(lang) => {
          setLang(lang);
        }}
      />

      {/* <input
        value={lang}
        onChange={(event) => {
          setLang(event.target.value);
        }}
        placeholder="language"
        className={cn(
          "mt-4 border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300  dark:text-gray-300 placeholder:text-gray-600 border-2 focus:border-none px-2 focus:outline-none active:outline-none py-2",
          "w-full text-xl px-4 bg-gray-100 dark:bg-[rgb(31,32,33)]"
        )}
      /> */}

      {/* {chapters?.length > 0 && (
        <h4 className="mt-12 mb-4 text-center">Chapters</h4>
      )} */}

      {/* <div className="flex flex-col space-y-4">
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
      </div> */}
      {/* 
      <button
        className="mt-12 w-full"
        onClick={() => {
          addNewChapter();
        }}
      >
        <Icons.plusIcon /> <span> Add a chapter </span>
      </button> */}

      <button
        className="w-full mt-12"
        onClick={() => {
          addBookMutation
            .mutateAsync({
              title,
              author,

              lang,
              coverPhotoId,
            })
            .then((resp) => {
              resetState();
            });
        }}
      >
        {addBookMutation.isPending ? "Adding..." : "Add"}
      </button>
    </div>
  );
}
