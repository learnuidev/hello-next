"use client";

import { Suspense, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { ConvoDetails } from "@/app/(auth)/convos/convo-details";
import { ConvosNavBar } from "@/app/(auth)/convos/convos-nav-bar";
import { AutoHideOnIdle } from "@/components/auto-hide-on-idle";
import { getContentQueryId } from "@/domain/content/content.queries";

import { exampleIContent } from "../example-content";
import { useShowcaseSettings } from "./use-showcase-settings";

/**
 * The content page, whole: the nav bar that slides in and out on idle, and the
 * player underneath — the app's `ConvoDetails`, which is the audio, the
 * transport, the dock, the transcript and the karaoke, with the example import
 * playing from its real YouTube source.
 *
 * The one thing that makes this work without an account is the seed: every one
 * of those screens reads its content from the query cache, so putting the
 * example there is enough. Nothing else is faked — `useGetContentQuery` is
 * disabled for a signed-out visitor, so the seeded object is what renders.
 */
export const PlayerStage = () => {
  useShowcaseSettings();

  const queryClient = useQueryClient();

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

  return (
    <Suspense>
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
    </Suspense>
  );
};
