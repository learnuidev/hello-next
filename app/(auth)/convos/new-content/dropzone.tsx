import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import { UploadFileResponse } from "@/domain/file-upload/use-upload-file";
import { useUploadFileV2 } from "@/domain/file-upload/use-upload-file-v2";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { TextContent } from "./components/text-content/text-content";
import { contentSourceStore, contentTypeStore } from "./new-content-store";

interface DropzoneProps {
  className?: string;
}

interface FileWithPreview extends File {
  preview: string;
}

export const Dropzone = ({ className }: DropzoneProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const isSmall = useIsSmall();

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const [rejected, setRejected] = useState<FileRejection[]>([]);
  const contentType = contentTypeStore((state) => state.type);
  const setContentType = contentTypeStore((state) => state.setType);

  //   const setSourceUrl = contentSouceUrlStore((state) => state.setSourcUrl);
  //   const sourceUrl = contentSouceUrlStore((state) => state.sourceUrl);
  //   const setSourceBucket = contentSouceBucketStore(
  //     (state) => state.setSourceBucket
  //   );

  const source = contentSourceStore((state) => state.source) as any;
  const setSource = contentSourceStore((state) => state.setSource);

  const { onUploadFileChange, addUserAssetMutation } = useUploadFileV2(
    (resp: UploadFileResponse) => {
      // alert(JSON.stringify(resp));
      const { uploadBucketKey, sourceUrl } = resp;

      setSource(resp);

      // setSourceUrl(sourceUrl);
      // setSourceBucket(uploadBucketKey);
      removeAll();
    }
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles: FileWithPreview[]) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }

      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "audio/*": [],
      "video/*": [],
    },
    // maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () =>
      files.forEach((file: FileWithPreview) =>
        URL.revokeObjectURL(file.preview)
      );
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files: FileWithPreview[]) =>
      files.filter((file) => file.name !== name)
    );
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async () => {
    if (!files?.length) return;

    const formData = new FormData();

    onUploadFileChange(files?.[0]);
  };

  return (
    <div
      onClick={() => {
        // setContentType("");
      }}
    >
      <TextContent />
    </div>
  );
};
