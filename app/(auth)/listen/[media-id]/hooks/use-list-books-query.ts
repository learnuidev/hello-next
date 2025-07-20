import { useQuery } from "@tanstack/react-query";
import { listenApiUrl } from "../../constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { ListBooksResponse } from "./book.types";

export const useListBooksQuery = () => {
  const jwt = useJwtToken();
  return useQuery({
    queryKey: ["list-books", jwt],

    queryFn: async (): Promise<ListBooksResponse> => {
      const resp = await fetch(`${listenApiUrl}/v1/list-books`, {
        method: "POST",
        headers: {
          Authorization: `${jwt}`,
        },

        body: JSON.stringify({}),
      });

      const respJson = await resp.json();

      return respJson;
    },
  });
};
