import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDuStore } from "../use-du-store";

const verifyUserQueryKey = "du-chinese/verify-user";
export const useVerifyUser = ({ cookie }: { cookie?: string }) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<{ success: boolean; message: string }, Error>({
    queryKey: [verifyUserQueryKey, authUser?.jwt, cookie],
    retry: false,
    queryFn: async () => {
      const resp = await fetch(`${duChineseApiUrl}/v1/verify-user`, {
        method: "POST",

        body: JSON.stringify({
          cookie,
        }),
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      if (!resp.ok) {
        throw Error(resp?.statusText);
      }

      return resp.json();
    },
  });
};

export const useReverifyUserHandler = () => {
  const queryClient = useQueryClient();
  const { data: authUser } = useCurrentAuthUser({});
  const cookie = useDuStore((state) => state.cookie);

  return () => {
    queryClient.invalidateQueries([verifyUserQueryKey, authUser?.jwt, cookie]);
  };
};

export const useVerifyUserMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const revifyUserHandler = useReverifyUserHandler();

  return useMutation({
    mutationFn: async ({ cookie }: { cookie: string }) => {
      const resp = await fetch(`${duChineseApiUrl}/v1/verify-user`, {
        method: "POST",

        body: JSON.stringify({
          cookie,
        }),
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      return resp.json();
    },

    onSuccess: () => {
      revifyUserHandler();
    },
  });
};
