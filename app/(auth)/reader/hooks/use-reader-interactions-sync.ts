"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useListReaderInteractionsQuery } from "@/domain/reader/use-list-reader-interactions";
import { syncReaderInteractions } from "@/domain/reader/use-sync-reader-interactions";
import { useEffect, useRef } from "react";

import { useReaderInteractionsStore } from "./use-reader-interactions";

/**
 * Keeps the interactions ledger in step with the server: hydrates it once on
 * mount, then pushes any local change back after a short quiet spell — so a
 * burst of taps syncs as one batch rather than a request per tap.
 */
export const useReaderInteractionsSync = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const { data: remote } = useListReaderInteractionsQuery();

  const hydrate = useReaderInteractionsStore((state) => state.hydrate);
  const markClean = useReaderInteractionsStore((state) => state.markClean);
  const snapshot = useReaderInteractionsStore((state) => state.snapshot);
  const dirty = useReaderInteractionsStore((state) => state.dirty);

  useEffect(() => {
    if (remote?.items?.length) {
      hydrate(remote.items);
    }
  }, [remote, hydrate]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!dirty) {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      try {
        await syncReaderInteractions(snapshot(), {
          Authorization: authUser?.jwt,
        });
        markClean();
      } catch {
        // Leave it dirty so the next change (or next visit) retries.
      }
    }, 3000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [dirty, snapshot, authUser?.jwt, markClean]);
};
