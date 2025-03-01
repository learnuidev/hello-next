"use client";
import Link from "next/link";
import { useListFilesQuery } from "./hooks/use-list-files-query";
import { UploadFileButtonNew } from "./upload-file-button-new";

export default function FileUpload() {
  const { data: files } = useListFilesQuery();
  return (
    <main>
      <h1 className="font-bold text-center mt-16 text-3xl">yoo</h1>
      <p className="text-center mt-4">File upload made easy</p>

      <UploadFileButtonNew className="mb-4" />

      <div>
        {files?.files?.map((file: any) => {
          return (
            <Link href={`/file-system/${file?.fileId}`} key={file?.fileId}>
              <code key={file?.fileId}>
                <pre>{JSON.stringify(file, null, 4)}</pre>
              </code>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
