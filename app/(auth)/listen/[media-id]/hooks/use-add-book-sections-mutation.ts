import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listenApiUrl } from "../../constants";
import {
  AddBookSectionsParams,
  AudioBook,
  UpdateBookRequestParams,
} from "./book.types";

export const useAddBookSectionsMutation = () => {
  const jwt = useJwtToken();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      bookId,
      sectionId,
      sectionIds,
      ...rest
    }: AddBookSectionsParams): Promise<AudioBook> => {
      const resp = await fetch(`${listenApiUrl}/v1/add-book-section`, {
        method: "POST",
        headers: {
          Authorization: `${jwt}`,
        },

        body: JSON.stringify({
          bookId,
          sectionId,
          sectionIds,
          ...rest,
        }),
      });

      const respJson = await resp.json();

      return respJson;
    },

    onSuccess: (data: AudioBook) => {
      queryClient.invalidateQueries({
        queryKey: ["list-books", jwt],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-book", data?.id],
      });
    },
  });
};
