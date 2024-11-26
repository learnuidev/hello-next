import { useListAttempts } from "../use-list-attempts";

export const useGetTopTenRecentlyReviewed = () => {
  const totalAttempts = useListAttempts();

  return totalAttempts?.slice(0, 8);
};
