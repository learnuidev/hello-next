"use client";

import "@/libs/cognito/init";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useGetContentQuery } from "@/domain/content/content.queries";
import Link from "next/link";
import { useEffect } from "react";
import { ConvoDetails } from "../convo-details";
import { ConvosNavBar } from "../convos-nav-bar";
import { useRecentlyWatchedContent } from "../use-recently-watched-content-store";
import { useGetContentId } from "./hooks/use-get-content-id";
import { useGo } from "./hooks/use-go";

const statusMessages = {
  GENERATING_SENTENCES: "Generating Sentences",
  SENTENCES_GENERATED: "Sentences Generated",
  GENERATING_TRANSLATIONS: "Generating Translations",
  TRANSLATED: "Translated",
  GENERATING_AUDIO_AND_SENTENCES: "Generating Audio and Sentences",
  AUDIO_AND_SENTENCES_GENERATED: "Audio and Sentences Generated",
  UPLOADING_AUDIO_AND_SENTENCES: "UPLOADING_AUDIO_AND_SENTENCES",
} as any;

function RemoveIfExistsButton({ contentId }: { contentId: string }) {
  const { recentlyWatched, setRecentlyWatched, isLoading } =
    useRecentlyWatchedContent();

  const containsRecentlyWatched = recentlyWatched?.find(
    (item: any) => item?.id === contentId
  );

  if (containsRecentlyWatched) {
    return (
      <button
        onClick={() => {
          setRecentlyWatched({ id: contentId }, "remove");
        }}
      >
        {isLoading ? "Removing..." : "Remove from history"}{" "}
      </button>
    );
  }
}

function WithContentItem({ children }: { children: React.ReactNode }) {
  const contentId = useGetContentId();

  const resp = useGetContentQuery({ contentId });
  const { data, isError, isLoading } = resp;
  const error: any = resp?.error;

  if (isLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  if (error?.message !== undefined) {
    return (
      <div>
        <Nothing icon={Icons.cat} message={error?.message}>
          <div className="mt-12 flex gap-8 justify-center">
            <Link href="/convos"> Back</Link>

            <RemoveIfExistsButton contentId={contentId} />
          </div>
        </Nothing>
      </div>
    );
  }

  return children;
}

export default function ContentItem() {
  const contentId = useGetContentId();

  const { data: content, isLoading } = useGetContentQuery({
    contentId: contentId,
  });

  const editMode = useContentEditStore((state) => state.editMode);

  const { goToBefore, goToNext } = useGo();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code === "ArrowDown" && "editMode") {
        goToNext();
        return null;
      }
      if (event.code === "ArrowUp" && "editMode") {
        goToBefore();
        return null;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [editMode, goToNext, goToBefore]);

  return (
    <WithContentItem>
      <main>
        <div>
          <div className="px-4 md:px-12">
            <ConvosNavBar />
          </div>

          <div className="mb-24">
            <ConvoDetails contentId={contentId} />
          </div>
        </div>
      </main>
    </WithContentItem>
  );
}
