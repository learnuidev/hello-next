"use client";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useQuery } from "@tanstack/react-query";
import { rootFileUrl } from "../constants";

import { IFile } from "../file.types";

export const listFilesQueryKey = `list-files`;
interface ListFilesResponse {
  files: IFile[];
  lastEvaluatedKey?: string;
}
export const useListFilesQuery = () => {
  const token = useJwtToken();
  return useQuery<ListFilesResponse, Error>({
    queryKey: [listFilesQueryKey],
    queryFn: async () => {
      const files = await fetch(`${rootFileUrl}/files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filesJson = await files.json();

      return filesJson as ListFilesResponse;
    },
  });
};
