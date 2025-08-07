import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { updateComponent } from "@/domain/component/update-component.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getComponentQueryKey } from "../lesson/use-get-component-query";

export function useUpdateComponentMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: any) => {
      const response = await updateComponent(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.setQueryData(
        [getComponentQueryKey, data?.hanzi] as any,
        (old: any) => [data, ...old]
      );

      queryClient.invalidateQueries({
        queryKey: [getComponentQueryKey, data?.hanzi],
      });
    },
  });
}
