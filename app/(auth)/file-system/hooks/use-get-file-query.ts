"use client";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useMutation, useQuery } from "@tanstack/react-query";
import { rootFileUrl } from "../constants";

import { IFile } from "../file.types";

type GetFileResponse = IFile & {
  presignedUrl: string;
};

const getFileQueryKey = `get-file`;

export const useGetFileQuery = ({ fileId }: { fileId: string }) => {
  const token = useJwtToken();
  return useQuery<GetFileResponse, Error>({
    queryKey: [getFileQueryKey, fileId],
    queryFn: async () => {
      const files = await fetch(`${rootFileUrl}/files/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filesJson = await files.json();
      return filesJson as GetFileResponse;
    },
  });
};
