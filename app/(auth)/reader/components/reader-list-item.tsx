"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { ReaderItem } from "../reader.types";
import { countReaderCharacters } from "../utils/count-reader-characters";
import { formatReaderDateShort } from "../utils/format-reader-date";

export const ReaderListItem = ({
  item,
  onDelete,
  className,
}: {
  item: ReaderItem;
  onDelete: (id: string) => void;
  className?: string;
}) => {
  return (
    <div className={cn("group", className)}>
      <div className="mb-2">
        <Link
          href={`/reader/${item.id}`}
          className="text-lg font-medium hover:text-rose-400 transition"
        >
          {item.title || "Untitled"}
        </Link>

        <p className="text-xs text-gray-500 font-light mt-1">
          <span>{formatReaderDateShort(item.createdAt)}</span>
          <span> · </span>
          <span>{countReaderCharacters(item.text)} characters</span>
        </p>
      </div>

      <Link href={`/reader/${item.id}`} className="block">
        <p className="text-gray-800 dark:text-gray-300 font-extralight text-[16px] line-clamp-2">
          {item.text}
        </p>
      </Link>

      <div className="flex justify-end items-center mt-3">
        {/* Double click, matching how diary entries are removed. */}
        <button
          title="Double click to delete"
          onDoubleClick={() => {
            onDelete(item.id);
          }}
          className="text-gray-500 hover:text-rose-400 transition text-sm"
        >
          <Icons.trash />
        </button>
      </div>
    </div>
  );
};
