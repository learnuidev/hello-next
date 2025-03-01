"use client";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { rootFileUrl } from "../constants";

export const useDeleteFileMutation = () => {
  const token = useJwtToken();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      fileId,
      permanentlyDelete = true,
    }: {
      fileId: string;
      permanentlyDelete?: boolean;
    }) => {
      const files = await fetch(`${rootFileUrl}/v1/delete-file`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileId,
          permanentlyDelete,
        }),
      });

      return files.json();
    },

    onSuccess: () => {
      router.push(`/file-system`);
    },
  });
};
