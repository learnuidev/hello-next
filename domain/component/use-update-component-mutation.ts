import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { updateComponent } from "@/domain/component/update-component.api";
import { listComponentsQueryKey } from "@/domain/lesson/component.queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateComponentMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: any) => {
      const response = await updateComponent(params, {
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

        // queryClient.invalidateQueries([listComponentsQueryKey]);
      },
    }
  );
}
