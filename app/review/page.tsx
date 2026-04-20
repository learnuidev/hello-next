"use client";
import React from "react";
import { ReviewCalView } from "@/app/review/review-cal-view";
import { ReviewModeClassic } from "@/app/review/review-mode";

import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { HskReviewMode } from "@/app/review/hsk-review-mode/hsk-review-mode";
import { ChangeMode } from "./change-mode";
import { FloatingNavbar } from "@/components/floating-navbar";
import { useReviewModeView } from "./use-review-mode";
import { ReviewCloze } from "./review-cloze/review-cloze";
import { useGetCurrentReviewCharacter } from "./use-get-current-review-character";
import { useRouter, useSearchParams } from "next/navigation";
import { useIsContent } from "./use-is-content";
import { ReviewClozeContent } from "./review-cloze-content/review-cloze-content";
import { useClozeContentMode } from "./content-cloze-mode-button";
import { usePreviousPathnameStore } from "@/components/language-selector/use-previous-path-name-store";

function ReviewModeSelectorButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="dark:text-gray-500 dark:hover:text-white hover:text-black transition"
    >
      {children}
    </button>
  );
}

function ReviewModeSelector() {
  const { setReviewMode } = useReviewModeView();
  return (
    <div>
      <h1 className="text-center mt-24 lg:mt-32 text-2xl font-light">
        Please select review mode
      </h1>

      <div className="flex justify-center items-center gap-8 mt-8">
        <ReviewModeSelectorButton
          onClick={() => {
            setReviewMode("cloze");
          }}
        >
          cloze
        </ReviewModeSelectorButton>
        <ReviewModeSelectorButton
          onClick={() => {
            setReviewMode("classic");
          }}
        >
          classic
        </ReviewModeSelectorButton>
      </div>
    </div>
  );
}
function ReviewMode() {
  const {
    currentCharacter,
    lang,
    isLoading: isReviewCharactersLoading,
  } = useGetCurrentReviewCharacter();

  const router = useRouter();
  const { setPreviousPath, previousPath } = usePreviousPathnameStore();

  const { reviewMode } = useReviewModeView();
  const { mode, level, entryId } = useGetReviewParams();

  const isContent = useIsContent(mode);

  const { clozeContentMode } = useClozeContentMode();

  console.log("REVIVE MODE", reviewMode);
  console.log("CLOZE CONTENT MODE", clozeContentMode);

  if (reviewMode === "cloze") {
    if (clozeContentMode === "content") {
      return (
        <ReviewClozeContent
          // contentId={mode}
          isLoading={isReviewCharactersLoading}
          currentCharacter={currentCharacter?.hanzi}
          lang={lang}
          onClose={() => {
            if (previousPath) {
              router.push(previousPath);
            } else {
              router.push(`/nmm?lang=${lang}`);
            }
          }}
        />
      );
    } else {
      return (
        <ReviewCloze
          isLoading={isReviewCharactersLoading}
          currentCharacter={currentCharacter?.hanzi}
          lang={lang}
          onClose={() => {
            router.push(`/nmm?lang=${lang}`);
          }}
        />
      );
    }
  }

  return <ReviewModeClassic />;
}

export default function ReviewPage(props: any) {
  return (
    <>
      <ReviewMode />
      <FloatingNavbar />
    </>
  );
}
