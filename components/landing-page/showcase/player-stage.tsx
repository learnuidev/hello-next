"use client";

import { Suspense, useCallback, useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ConvoDetails } from "@/app/(auth)/convos/convo-details";
import { ConvosNavBar } from "@/app/(auth)/convos/convos-nav-bar";
import { AutoHideOnIdle } from "@/components/auto-hide-on-idle";
import { getContentQueryId } from "@/domain/content/content.queries";

import { exampleIContent } from "../example-content";
import { useShowcaseSettings } from "./use-showcase-settings";

/** Where the demo remembers the view it was left on. */
const VIEW_STORAGE_KEY = "landing-demo-view";

/**
 * The content page, whole: the nav bar that slides in and out on idle, and the
 * player underneath — the app's `ConvoDetails`, which is the audio, the
 * transport, the dock, the transcript and the karaoke, with the example import
 * playing from its real YouTube source.
 *
 * Two things make it work on a public page.
 *
 * The content is seeded into the query cache, because every screen under here
 * reads it from there and `useGetContentQuery` is disabled for a signed-out
 * visitor.
 *
 * The nav bar is simulated: its links point at `/convos/:id?view=…`, which needs
 * an account. Clicks on them are caught here and answered by changing the `view`
 * query parameter of this page instead — the same parameter `ConvoDetails`
 * switches on — so listen, karaoke, cloze, reader, insights, settings and ai all
 * open in place. The view the demo is left on is kept in local storage and put
 * back into the url on the next visit.
 */
export const PlayerStage = () => {
  useShowcaseSettings();

  const queryClient = useQueryClient();
  const router = useRouter();

  // Seeded in a lazy initialiser, so it is in the cache for the first render —
  // on the server as well, which is why the player is in the HTML and not just
  // after hydration.
  useState(() => {
    queryClient.setQueryData(
      [getContentQueryId, exampleIContent.id],
      exampleIContent,
    );

    return true;
  });

  // Restore the view the demo was left on.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("view");
    const stored = window.localStorage.getItem(VIEW_STORAGE_KEY);

    const view = fromUrl ?? stored;

    if (!view || view === fromUrl) {
      return;
    }

    params.set("view", view);

    router.replace(`/?${params.toString()}`, { scroll: false });
  }, [router]);

  // The nav bar's links, answered in place instead of navigating away.
  const handleNavBarClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");

      if (!href || !href.startsWith("/convos")) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const target = new URL(href, window.location.origin);
      const view = target.searchParams.get("view") ?? "listen";
      const start = target.searchParams.get("start");

      window.localStorage.setItem(VIEW_STORAGE_KEY, view);

      const params = new URLSearchParams(window.location.search);

      params.set("view", view);

      if (start) {
        params.set("start", start);
      } else {
        params.delete("start");
      }

      router.replace(`/?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  return (
    <Suspense>
      <div onClickCapture={handleNavBarClick}>
        <div className="sticky top-0 z-50">
          <AutoHideOnIdle
            hiddenOffset="-100%"
            className="px-4 md:px-12 bg-white/85 backdrop-blur-sm dark:bg-[rgb(9,10,11)]/85"
          >
            <ConvosNavBar />
          </AutoHideOnIdle>
        </div>

        <div className="mb-24">
          <ConvoDetails contentId={exampleIContent.id} />
        </div>
      </div>
    </Suspense>
  );
};
