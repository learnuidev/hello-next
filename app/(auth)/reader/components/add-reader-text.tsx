"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons.v2";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useReaderStore } from "../hooks/use-reader-store";
import { countReaderCharacters } from "../utils/count-reader-characters";

/**
 * The "+" flow: a title, a pasted body and a save button. Saving writes to the
 * local reader library and opens the text straight away at `/reader/:id`.
 */
export const AddReaderText = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const addItem = useReaderStore((state) => state.addItem);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const canSave = title.trim().length > 0 && text.trim().length > 0;

  const handleSave = () => {
    if (!canSave) {
      return;
    }

    const item = addItem({ title, text });

    // Its plain url is the reading view, so a text just saved opens to be read,
    // whatever tab the last text was left on.
    onClose();
    router.push(`/reader/${item.id}`);
  };

  return (
    <div className="max-w-3xl m-auto px-4 md:px-12">
      <div className="flex justify-between items-center mt-12 mb-8">
        <p className="uppercase text-xs tracking-wider text-gray-400">
          New text
        </p>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-rose-400 dark:hover:text-white transition"
        >
          <Icons.xMark className="text-2xl" />
        </button>
      </div>

      <Input
        autoFocus
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
        </p>

        <div className="flex items-center space-x-6">
          <button
            onClick={onClose}
            className="text-xs uppercase text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
          >
            Cancel
          </button>

          <Button
            disabled={!canSave}
            onClick={handleSave}
            className="uppercase text-xs tracking-wider"
          >
            <Icons.check className="mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
