import { useListContentsQuery } from "@/domain/content/content.queries";

export const useIsContent = (mode: string) => {
  const { data, isLoading: isContentLoading } = useListContentsQuery();

  const content = data?.find((content: any) => content?.id === mode);
  const isContent = !!content;

  return isContent;
};
