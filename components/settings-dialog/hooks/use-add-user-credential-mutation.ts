import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listUserCredentialsQueryId } from "./use-list-user-credentials-query";

interface AddCredentialParams {
  title: string;
  scopes: string[];
}
const addUserCredential = async (
  params: AddCredentialParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/add-user-credential`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export const useAddUserCredentialMutation = (options = {} as any) => {
  const { data: authUser } = useCurrentAuthUser({});

  const queryClient = useQueryClient();
  return useMutation(
    async (params: AddCredentialParams) => {
      const response = await addUserCredential(params, {
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
