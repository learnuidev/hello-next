import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export const useGetTopTenRecentlyLearned = () => {
  const { data } = useListCharactersQuery();

  return data?.sort((a, b) => b?.createdAt - a?.createdAt)?.slice(0, 8);
};
