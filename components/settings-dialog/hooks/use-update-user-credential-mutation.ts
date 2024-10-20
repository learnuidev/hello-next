import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listUserCredentialsQueryId,
  UserCredential,
} from "./use-list-user-credentials-query";

interface UpdateCredentialParams {
  id: string;
  title: string;
  scopes: string[];
  permissionType: string;
}
const updateUserCredential = async (
  params: UpdateCredentialParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/update-user-credential`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export const useUpdateUserCredentialMutation = (options = {} as any) => {
  const { data: authUser } = useCurrentAuthUser({});

  const queryClient = useQueryClient();
  return useMutation(
    async (params: UpdateCredentialParams) => {
      const response = await updateUserCredential(params, {
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
