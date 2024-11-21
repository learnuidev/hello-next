"use client";
import React from "react";
import { ReviewCalView } from "@/app/review/review-cal-view";
import { ReviewMode } from "@/app/review/review-mode";

import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { HskReviewMode } from "@/app/review/hsk-review-mode/hsk-review-mode";
import { ChangeMode } from "./change-mode";

export default function ReviewPage(props: any) {
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

  return <ReviewMode />;
}
