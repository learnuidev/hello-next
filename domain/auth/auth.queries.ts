import { currentAuthUser } from "@/libs/cognito/auth";
import { useQuery } from "@tanstack/react-query";
import { queryIds } from "./queryIds";

export function useCurrentAuthUser(options = {}) {
  return useQuery({
    queryKey: [queryIds.currentAuthUser],

    queryFn: currentAuthUser,
    ...options,
    retry: false,
  });
}

const superAdminEmail = "learnuidev@gmail.com";

export const useIsSuperAdmin = () => {
  const { data } = useCurrentAuthUser();

  return data?.email === superAdminEmail;
};
