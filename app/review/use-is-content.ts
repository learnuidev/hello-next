import { useListContentsQuery } from "@/domain/content/content.queries";
import { useListPublishedContentsQuery } from "../(auth)/convos/[content-id]/hooks/use-list-published-contents-query";

export const useIsContent = (mode: string) => {
  const { data, isLoading: isContentLoading } = useListPublishedContentsQuery(
    {}
  );

  const contents = data?.items;

  const content = contents?.find((content: any) => content?.id === mode);
  const isContent = !!content;

  return isContent;
};
