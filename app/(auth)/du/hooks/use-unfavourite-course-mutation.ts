import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listSavedLessonsQueryKey } from "./use-list-saved-lessons-query";

export const useUnfavouriteCourseMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries([
        listSavedLessonsQueryKey,
        authUser?.jwt,
      ] as any);
    },
    mutationFn: async ({
      courseId,
      cookie,
    }: {
      courseId: string;
      cookie: string;
    }) => {
      const resp = await fetch(`${duChineseApiUrl}/v1/unsave-course`, {
        method: "POST",

        body: JSON.stringify({
          courseId,
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
