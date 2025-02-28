"use client";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useMutation, useQuery } from "@tanstack/react-query";
import { rootFileUrl } from "../constants";
import { useParams, useRouter } from "next/navigation";

export default function FileItem() {
  const token = useJwtToken();
  const params = useParams<{ "file-id": string }>();
  const fileId = params["file-id"];
  const router = useRouter();

  const { data: file } = useQuery({
    queryKey: ["get-file", fileId],
    queryFn: async () => {
      const files = await fetch(`${rootFileUrl}/files/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filesJson = await files.json();
      return filesJson;
    },
  });

  const deleteMutation = useMutation(
    {
      mutationFn: async ({ fileId }: { fileId: string }) => {
        const files = await fetch(`${rootFileUrl}/files/${fileId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      },

      onSuccess: () => {
        router.push(`/file-system`);
      },
    }
    // {
    //   onSuccess: () => {},
    // }
  );

  return (
    <div>
      <h2>File Item</h2>

      <div>
        <code>
          <pre>{JSON.stringify(file, null, 4)}</pre>
        </code>

        <button
          onClick={() => {
            deleteMutation.mutateAsync({
              fileId,
            });
          }}
        >
          {deleteMutation.isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
