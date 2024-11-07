import { useListAttempts } from "../use-list-attempts";

export const useGetTopTenRecentlyLearned = () => {
  const totalAttempts = useListAttempts();

  return totalAttempts?.slice(0, 10);
};
