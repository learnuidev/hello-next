"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

export const readerPageCount = (totalItems: number, pageSize: number) =>
  Math.max(1, Math.ceil(totalItems / pageSize));

/**
 * "1 – 10 of 23" label for the current slice.
 */
export const getReaderRangeLabel = ({
  page,
  pageSize,
  totalItems,
}: {
  page: number;
  pageSize: number;
  totalItems: number;
}) => {
  if (totalItems === 0) {
    return "0 of 0";
  }

  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, totalItems);

  return `${first} – ${last} of ${totalItems}`;
};

export const ReaderPagination = ({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const buttonClassName = cn(
    "flex items-center space-x-2 uppercase text-xs tracking-wider transition",
  );

  return (
    <div className="flex items-center justify-center space-x-8 mt-16">
      <button
        disabled={page <= 1}
        onClick={() => {
          onPageChange(page - 1);
        }}
        className={cn(
          buttonClassName,
          page <= 1
            ? "text-gray-700 cursor-not-allowed"
            : "text-gray-400 hover:text-rose-400 dark:hover:text-white",
        )}
      >
        <Icons.back className="text-sm" />
        <span>Prev</span>
      </button>

      <p className="text-xs uppercase tracking-wider text-gray-500">
        <span>Page </span>
        <span>{page}</span>
        <span> / </span>
        <span>{totalPages}</span>
      </p>

      <button
        disabled={page >= totalPages}
        onClick={() => {
          onPageChange(page + 1);
        }}
        className={cn(
          buttonClassName,
          page >= totalPages
            ? "text-gray-700 cursor-not-allowed"
            : "text-gray-400 hover:text-rose-400 dark:hover:text-white",
        )}
      >
        <span>Next</span>
        <Icons.front className="text-sm" />
      </button>
    </div>
  );
};
