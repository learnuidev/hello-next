import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";

export const useGetTopTenIncorrect = () => {
  const totalAttempts = useListAttempts();

  return totalAttempts
    ?.sort((a, b) => b?.totalIncorrect - a?.totalIncorrect)
    ?.slice(0, 20);
};
