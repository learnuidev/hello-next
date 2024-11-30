import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useVerifyUser = ({ cookie }: { cookie?: string }) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<{ success: boolean; message: string }, Error>({
    queryKey: ["du-chinese/list-top-lessons", authUser?.jwt],
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

export const useVerifyUserMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});

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
  });
};
