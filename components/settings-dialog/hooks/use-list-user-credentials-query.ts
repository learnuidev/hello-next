import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const listUserCredentials = async (opts: { Authorization: string }) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-user-credentials`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    throw Error(`Something went wrong`);
  }
  const resp = await res.json();
  return resp;
};

export const listUserCredentialsQueryId = "list-user-credentials";
export const useListUserCredentialsQuery = () => {
  const { data: authUser } = useCurrentAuthUser({});

  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [listUserCredentialsQueryId, authUser?.jwt],
    queryFn: async () => {
      return listUserCredentials({ Authorization: authUser?.jwt });
    },
  });
};
