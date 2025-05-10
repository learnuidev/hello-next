import { useGetContentQuery } from "@/domain/content/content.queries";
import { useMemo } from "react";

export const useIsContent = (mode: string) => {
  const { data: content } = useGetContentQuery({ contentId: mode });

  return useMemo(() => !!content, [content]);
};
