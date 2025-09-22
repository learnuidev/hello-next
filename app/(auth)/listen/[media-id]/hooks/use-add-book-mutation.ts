import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listenApiUrl } from "../../constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { AddBookRequestParams, AudioBook } from "./book.types";

export const useAddBookMutation = () => {
  const jwt = useJwtToken();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      author,
      coverPhotoId,
      lang,
    }: AddBookRequestParams): Promise<AudioBook> => {
      const resp = await fetch(`${listenApiUrl}/v1/add-book`, {
        method: "POST",
        headers: {
          Authorization: `${jwt}`,
        },

        body: JSON.stringify({
          title,
          author,
          coverPhotoId,
          lang,
        }),
      });

      const respJson = await resp.json();

      return respJson;
    },

    onSuccess: (data: AudioBook) => {
      queryClient.invalidateQueries({
        queryKey: ["list-books", jwt],
      });
    },
  });
};
