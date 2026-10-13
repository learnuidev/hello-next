"use client";

import { useSyncReaderItemsMutation } from "@/domain/reader/use-sync-reader-items";
import { Icons } from "@/components/ui/icons.v2";
import { useEffect, useState } from "react";

import {
  LegacyReaderItem,
  clearLegacyReaderItems,
  getLegacyReaderItems,
} from "../hooks/reader-local-storage";

/**
 * The one-time bridge between the localStorage-era reader and the server.
 *
 * Texts saved before the reader had a backend are still in this browser under
 * the old key. This banner is how they get out: it offers to push them up to
 * the account, and only clears the local copy once the server has taken them.
 */
export const ReaderSyncBanner = () => {
  const [legacyItems, setLegacyItems] = useState<LegacyReaderItem[]>([]);
  const syncItems = useSyncReaderItemsMutation();

  useEffect(() => {
    setLegacyItems(getLegacyReaderItems());
  }, []);

  if (legacyItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 rounded-xl border border-rose-300/40 dark:border-rose-500/30 bg-rose-50/60 dark:bg-rose-950/20 px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icons.upload className="text-xl text-rose-400" />
          <p className="text-sm font-light text-gray-700 dark:text-gray-300">
            <span>{legacyItems.length}</span>
            <span>
              {legacyItems.length === 1
                ? " text is"
                : " texts are"}{" "}
              saved on this device but not on your account.
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={syncItems.isPending}
            onClick={() => {
              syncItems.mutate(
                legacyItems.map((item) => ({
                  title: item.title,
                  text: item.text,
                })),
                {
                  onSuccess: () => {
                    clearLegacyReaderItems();
                    setLegacyItems([]);
                  },
                },
              );
            }}
            className="uppercase text-xs tracking-wider text-rose-500 hover:text-rose-400 border-[1px] border-rose-300 dark:border-rose-500/40 px-4 py-2 transition disabled:opacity-50"
          >
            {syncItems.isPending ? "Syncing…" : "Sync to account"}
          </button>

          <button
            onClick={() => {
              setLegacyItems([]);
            }}
            title="Dismiss"
            className="text-gray-400 hover:text-rose-400 transition"
          >
            <Icons.xMark className="text-lg" />
          </button>
        </div>
      </div>

      {syncItems.isError && (
        <p className="mt-3 text-xs text-rose-500">
          Could not sync your texts — please try again.
        </p>
      )}
    </div>
  );
};
