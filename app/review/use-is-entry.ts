import { useGetJournalDetailsQuery } from "../(auth)/diary/hooks/use-get-journal-details-query";

export const useIsEntry = (mode: string) => {
  const { data, isLoading: isContentLoading } = useGetJournalDetailsQuery(mode);

  const isEntry = data?.entryId === mode;

  return isEntry;
};
