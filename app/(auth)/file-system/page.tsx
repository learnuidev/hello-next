"use client";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useQuery } from "@tanstack/react-query";
import { rootFileUrl } from "./constants";
import { UploadFileButtonNew } from "./upload-file-button-new";
import Link from "next/link";

export default function FileUpload() {
  const token = useJwtToken();

  const { data: files } = useQuery({
    queryKey: ["list-files", token],
    queryFn: async () => {
      const files = await fetch(`${rootFileUrl}/files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filesJson = await files.json();

      if (!Array.isArray(filesJson)) {
        return [];
      }
      return filesJson;
    },
  });
  return (
    <main>
      <h1 className="font-bold text-center mt-16 text-3xl">yoo</h1>
      <p className="text-center mt-4">File upload made easy</p>

      <UploadFileButtonNew className="mb-4" />

      <div>
        {files?.map((file: any) => {
          return (
            <Link href={`/file-system/${file?.fileId}`} key={file?.fileId}>
              <code key={file?.fileId}>
                <pre>{JSON.stringify(files, null, 4)}</pre>
              </code>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
