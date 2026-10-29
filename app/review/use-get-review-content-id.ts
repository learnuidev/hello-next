"use client";

import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useGetReviewParams } from "./use-get-review-params";

/**
 * The content a review is a review of: the `mode` the URL names, or else the
 * content that is active in the app.
 *
 * The URL comes first because a review opened at `/review?mode=<id>` is a
 * review of that content, whatever was last active elsewhere.
 */
export const useGetReviewContentId = () => {
  const { mode } = useGetReviewParams();
  const { mode: activeContent } = useLearningMode();

  const modeId = mode || activeContent;

  const { data: content } = useGetContentQuery({ contentId: modeId || "" });

  // `null` when the review is not of a content at all. `hsk` and `nmm` are
  // ways of studying, not contents, and asking the characters API to scope
  // itself to one of them would scope it to a content that does not exist —
  // an empty review, where the whole one was wanted.
  return { contentId: content ? modeId : null };
};
