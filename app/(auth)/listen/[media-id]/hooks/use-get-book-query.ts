import { useQuery } from "@tanstack/react-query";
import { listenApiUrl } from "../../constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { AudioBook, ListBooksResponse } from "./book.types";

export const useGetBookQuery = (bookId: string) => {
  const jwt = useJwtToken();
  return useQuery({
    queryKey: ["get-book", bookId],

    queryFn: async (): Promise<AudioBook> => {
      const resp = await fetch(`${listenApiUrl}/v1/get-book`, {
        method: "POST",
        headers: {
          Authorization: `${jwt}`,
        },

        body: JSON.stringify({
          bookId,
        }),
      });

      const respJson = await resp.json();

      return respJson;
    },
  });
};
