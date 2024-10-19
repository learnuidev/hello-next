import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listUserCredentialsQueryId } from "./use-list-user-credentials-query";

const deleteUserCredential = async (
  params: {
    credentialId: string;
  },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/delete-user-credential`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export const useDeleteUserCredentialMutation = (options = {} as any) => {
  const { data: authUser } = useCurrentAuthUser({});

  const queryClient = useQueryClient();
  return useMutation(
    async (params: { credentialId: string }) => {
      const response = await deleteUserCredential(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    {
      ...options,
      onSuccess: (data) => {
        if (options?.onSucess) {
          options?.onSuccess(data);
        }

        queryClient.invalidateQueries([listUserCredentialsQueryId]);
      },
    }
  );
};
