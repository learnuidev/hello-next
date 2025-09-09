import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useListHistoryQuery } from "@/domain/history/history.queries";

export const useContentSearchHistory = ({
  contentId,
  lang,
}: {
  contentId: string;
  lang: string;
}) => {
  const addHistoryMutation = useAddHistoryMutation();

  const { data } = useListHistoryQuery();

  const addSearchHistory = (props: { input: string } & any) => {
    addHistoryMutation.mutate({
      ...props,
      input: props.input,
      lang,
      eventType: "SEARCH",
      context: {
        contentId,
      },
    } as any);
  };

  const searchHistory = data?.Items?.filter(
    (item: any) => item?.context?.contentId === contentId
  )?.sort((a: any, b: any) => (a?.lastSeen || 0) - (b?.lastSeen || 0));

  return {
    addSearchHistory,
    searchHistory,
  };
};
