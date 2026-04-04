"use client";

import { useGetContentQuery } from "@/domain/content/content.queries";
import { useGetContentId } from "./hooks/use-get-content-id";
import { WithConvoStatusLoading } from "./with-convo-status-loading";

export function WithContentLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentId = useGetContentId();

  const { data: content, isLoading } = useGetContentQuery({
    contentId: contentId,
  });

  if (
    content?.lang === "zh" &&
    ["audio", "text", "website", "tweet"]?.includes(content?.type) &&
    !["TRANSLATED", "PUBLISHED"]?.includes(content?.status)
  ) {
    return <WithConvoStatusLoading contentId={contentId} />;
  }

  return children;
}
