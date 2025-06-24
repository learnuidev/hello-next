import { currentAuthUser } from "@/libs/cognito/auth";
import { isSuperAdmin } from "@/libs/constants/super-admin-emails";
import { useQuery } from "@tanstack/react-query";
import { queryIds } from "./queryIds";

export function useCurrentAuthUser(options = {}) {
  return useQuery<any>({
    queryKey: [queryIds.currentAuthUser],

    queryFn: currentAuthUser,
    ...options,
    retry: false,
  });
}

export const useIsSuperAdmin = () => {
  const { data } = useCurrentAuthUser();

  return isSuperAdmin(data?.email);
};
