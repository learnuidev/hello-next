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
import { useRouter } from "next/navigation";

function ReviewClassic() {
  const { view, mode } = useGetReviewParams();

  if (view === "hsk-level") {
    return <ChangeMode />;
  }

  if (["hsk", "hsk3"]?.includes(mode)) {
    return <HskReviewMode />;
  }

  if (view === "cal") {
    return <ReviewCalView />;
  }

  return <ReviewModeClassic />;
}

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

  const { reviewMode } = useReviewModeView();

  if (!reviewMode) {
    return <ReviewModeSelector />;
  }

  if (reviewMode === "cloze") {
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

  return <ReviewClassic />;
}

export default function ReviewPage(props: any) {
  return (
    <>
      <ReviewMode />
      <FloatingNavbar />
    </>
  );
}
