import { useGetContentQuery } from "@/domain/content/content.queries";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useListHistoryQuery } from "@/domain/history/history.queries";

export const useContentSearchHistory = ({
  contentId,
}: {
  contentId: string;
}) => {
  const addHistoryMutation = useAddHistoryMutation();

  const { data: content } = useGetContentQuery({ contentId });

  const { data } = useListHistoryQuery();

  const addSearchHistory = (props: { input: string } & any) => {
    addHistoryMutation.mutate({
      input: props.input,
      lang: content?.lang,
      eventType: "SEARCH",
      [contentId]: {
        transcriptionId: props?.transcriptionId,
        contentId,
      },
    } as any);
  };

  const searchHistory = data?.Items?.filter(
    (item: any) => item?.[contentId]
  )?.sort((a: any, b: any) => (a?.lastSeen || 0) - (b?.lastSeen || 0));

  return {
    addSearchHistory,
    searchHistory,
  };
};
