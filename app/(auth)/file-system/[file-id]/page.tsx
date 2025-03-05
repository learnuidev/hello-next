"use client";

import { useParams } from "next/navigation";
import { useDeleteFileMutation } from "../hooks/use-delete-file-mutation";
import { useGetFileQuery } from "../hooks/use-get-file-query";

export default function FileItem() {
  const params = useParams<{ "file-id": string }>();
  const fileId = params["file-id"];

  const { data: file } = useGetFileQuery({ fileId });

  const deleteFileMutation = useDeleteFileMutation();

  return (
    <div>
      <h2>File Item</h2>

      <div>
        <code>
          <pre>{JSON.stringify(file, null, 4)}</pre>
        </code>

        <button
          onDoubleClick={() => {
            deleteFileMutation.mutateAsync({
              fileId,
            });
          }}
        >
          {deleteFileMutation.isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
