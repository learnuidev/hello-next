"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons.v2";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAddReaderItemMutation } from "@/domain/reader/use-add-reader-item";
import { useParseUrlMutation } from "@/domain/reader/use-parse-url";
import { useUpdateReaderItemMutation } from "@/domain/reader/use-update-reader-item";
import { ReaderItem } from "../reader.types";
import { countReaderCharacters } from "../utils/count-reader-characters";

type InputMode = "text" | "url";

/**
 * The add/edit flow of the reader.
 *
 * A text can be pasted, or a url can be given and the app will fetch it and pull
 * the text out of the page. If the url cannot be read — a paywall, a bot check,
 * a page with no article — the error is shown and the reader is offered the
 * paste box to add the text by hand instead. The same editor edits an existing
 * text when handed an `initialItem`.
 */
export const AddReaderText = ({
  onClose,
  initialItem,
}: {
  onClose: () => void;
  initialItem?: ReaderItem;
}) => {
  const router = useRouter();
  const addItem = useAddReaderItemMutation();
  const updateItem = useUpdateReaderItemMutation();
  const parseUrl = useParseUrlMutation();

  const isEditing = !!initialItem;

  const [mode, setMode] = useState<InputMode>("text");
  const [title, setTitle] = useState(initialItem?.title || "");
  const [text, setText] = useState(initialItem?.text || "");
  const [sourceUrl, setSourceUrl] = useState(initialItem?.sourceUrl || "");
  const [urlInput, setUrlInput] = useState(initialItem?.sourceUrl || "");
  const [parseError, setParseError] = useState<string | null>(null);

  const saving = addItem.isPending || updateItem.isPending;
  const canSave = title.trim().length > 0 && text.trim().length > 0;

  const handleFetched = ({
    title: fetchedTitle,
    text: fetchedText,
  }: {
    title: string;
    text: string;
  }) => {
    // The fetched title only fills the field when there is nothing better; the
    // reader's own title wins once they have typed one.
    if (!title.trim() && fetchedTitle) {
      setTitle(fetchedTitle);
    }

    setText(fetchedText);
    setSourceUrl(urlInput);
    setParseError(null);
    // Show the extracted text to be read and edited before saving.
    setMode("text");
  };

  const handleFetch = () => {
    const trimmedUrl = urlInput.trim();

    if (!trimmedUrl) {
      setParseError("Enter a url first");
      return;
    }

    setParseError(null);
    parseUrl.mutate(trimmedUrl, {
      onSuccess: handleFetched,
      onError: (error) => {
        setParseError(
          error.message || "Could not read that url. Add the text manually.",
        );
        // The paste box is the fallback, so put the reader straight onto it.
        setMode("text");
      },
    });
  };

  const handleSave = () => {
    if (!canSave) {
      return;
    }

    if (isEditing && initialItem) {
      updateItem.mutate(
        {
          id: initialItem.id,
          title,
          text,
          sourceUrl: sourceUrl || undefined,
        },
        {
          onSuccess: () => {
            onClose();
            router.refresh();
          },
        },
      );
      return;
    }

    addItem.mutate(
      { title, text, sourceUrl: sourceUrl || undefined },
      {
        onSuccess: (item) => {
          // Its plain url is the reading view, so a text just saved opens to be
          // read, whatever tab the last text was left on.
          onClose();
          router.push(`/reader/${item.id}`);
        },
      },
    );
  };

  return (
    <div className="max-w-3xl m-auto px-4 md:px-12">
      <div className="flex justify-between items-center mt-12 mb-8">
        <p className="uppercase text-xs tracking-wider text-gray-400">
          {isEditing ? "Edit text" : "New text"}
        </p>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-rose-400 dark:hover:text-white transition"
        >
          <Icons.xMark className="text-2xl" />
        </button>
      </div>

      {/* Text or url: two ways in, one textarea out. */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => {
            setMode("text");
            setParseError(null);
          }}
          className={`flex items-center gap-2 uppercase text-xs tracking-wider px-4 py-2 border-[1px] transition ${
            mode === "text"
              ? "text-gray-800 dark:text-white border-gray-400 dark:border-gray-600"
              : "text-gray-400 border-gray-300 dark:border-gray-800 hover:text-rose-400"
          }`}
        >
          <Icons.bookOpen className="text-base" />
          <span>Paste text</span>
        </button>

        <button
          onClick={() => {
            setMode("url");
            setParseError(null);
          }}
          className={`flex items-center gap-2 uppercase text-xs tracking-wider px-4 py-2 border-[1px] transition ${
            mode === "url"
              ? "text-gray-800 dark:text-white border-gray-400 dark:border-gray-600"
              : "text-gray-400 border-gray-300 dark:border-gray-800 hover:text-rose-400"
          }`}
        >
          <Icons.link className="text-base" />
          <span>From a url</span>
        </button>
      </div>

      {mode === "url" && (
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              autoFocus
              value={urlInput}
              onChange={(event) => {
                setUrlInput(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleFetch();
                }
              }}
              placeholder="https://…"
              className="flex-1 rounded-full bg-transparent font-extralight"
            />

            <Button
              disabled={parseUrl.isPending || !urlInput.trim()}
              onClick={handleFetch}
              className="uppercase text-xs tracking-wider"
            >
              {parseUrl.isPending ? (
                <Icons.spinner className="mr-2 animate-spin" />
              ) : (
                <Icons.link className="mr-2" />
              )}
              Fetch text
            </Button>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            The page will be fetched and its text pulled out for you to read and
            edit.
          </p>
        </div>
      )}

      {parseError && (
        <div className="mb-6 rounded-xl border border-rose-300/40 dark:border-rose-500/30 bg-rose-50/60 dark:bg-rose-950/20 px-5 py-4">
          <p className="text-sm text-rose-500">{parseError}</p>
          <p className="text-xs text-gray-500 mt-1">
            Add the text manually below instead.
          </p>
        </div>
      )}

      <Input
        autoFocus={mode !== "url"}
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        placeholder="Title"
        className="border-none bg-transparent px-0 text-2xl font-bold h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
      />

      <textarea
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            handleSave();
          }
        }}
        placeholder="Paste your text here…"
        className="mt-6 w-full min-h-[45vh] resize-none bg-transparent text-lg font-extralight leading-8 outline-none placeholder:text-gray-500 text-gray-800 dark:text-gray-200"
      />

      <div className="flex items-center justify-between mt-8 mb-32 border-t border-gray-100 dark:border-gray-900 pt-6">
        <p className="text-xs uppercase text-gray-500">
          <span>{countReaderCharacters(text)}</span>
          <span> characters</span>
          {sourceUrl && <span className="ml-2 text-gray-400">· from url</span>}
        </p>

        <div className="flex items-center space-x-6">
          <button
            onClick={onClose}
            className="text-xs uppercase text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
          >
            Cancel
          </button>

          <Button
            disabled={!canSave || saving}
            onClick={handleSave}
            className="uppercase text-xs tracking-wider"
          >
            {saving ? (
              <Icons.spinner className="mr-2 animate-spin" />
            ) : (
              <Icons.check className="mr-2" />
            )}
            {isEditing ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};
