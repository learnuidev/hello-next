import { Icons } from "@/components/ui/icons.v2";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import ReactPlayer from "react-player";
import { ContentTypeItem } from "./components/content-type-item";
import { ContentOptionsButton } from "./components/content-option-buttons";
import {
  contentSouceBucketStore,
  contentSouceUrlStore,
  contentSourceStore,
  contentTypeStore,
} from "./new-content-store";
import { fi } from "date-fns/locale";
import {
  UploadFileResponse,
  useUploadFile,
} from "@/domain/file-upload/use-upload-file";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import { useUploadFileV2 } from "@/domain/file-upload/use-upload-file-v2";
import { isVideo } from "./utils/is-video";

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
    // files.forEach((file) => formData.append("file", file));
    // formData.append("upload_preset", "friendsbook");

    // console.log("files", files);

    // const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    // const data = await fetch(URL, {
    //   method: "POST",
    //   body: formData,
    // }).then((res) => res.json());

    // console.log(data);
  };

  console.log("content type", contentType);

  if (contentType === "youtube") {
    return (
      <div
        onClick={() => {
          setContentType("");
        }}
      >
        {" "}
        Youtube Flow
      </div>
    );
  }
  if (contentType === "website") {
    return (
      <div
        onClick={() => {
          setContentType("");
        }}
      >
        {" "}
        Html Flow{" "}
      </div>
    );
  }

  if (contentType === "text") {
    return (
      <div
        onClick={() => {
          setContentType("");
        }}
      >
        {" "}
        Text Flow{" "}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full block">
      {!source?.sourceUrl && files?.length === 0 && (
        <div
          {...getRootProps({
            className: className,
          })}
        >
          <input {...getInputProps()} />
          <div className="px-4 w-full sm:min-w-[600px] flex flex-col items-center justify-center border-dotted dark:border-gray-700 border-2 rounded-2xl pt-16">
            <Icons.upload className="w-5 h-5 fill-current" />

            <p className="dark:text-gray-400 text-gray-600 font-light mt-2">
              {isDragActive
                ? "Drop the files here ..."
                : "Drag & drop or choose file to upload"}
            </p>
            <p className="text-sm dark:text-gray-500 text-gray-500 font-extralight mt-12 pb-8">
              Supported file types: Video, Audio (e.g. mp3)
            </p>
          </div>
        </div>
      )}

      {/* Preview */}

      {source?.sourceUrl !== undefined && (
        <div className="rounded-md shadow-lg flex flex-col justify-end space-x-4 items-end gap-2 pb-2">
          <ReactPlayer
            url={source?.sourceUrl}
            // width={isSmall ? "100%" : "600px"}
            height={isVideo(source?.sourceUrl) ? "100%" : "40px"}
            controls
          />

          <div className="flex space-x-4 mt-2">
            <button
              type="button"
              className="w-8 h-8 px-2 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center  dark:hover:bg-gray-800 hover:bg-white transition-colors"
              onClick={() => {
                setSource(null);
              }}
            >
              <Icons.xMark className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {files.map((file: FileWithPreview) => {
          console.log("FILE", file);
          return (
            <div
              key={file.name}
              className="rounded-md shadow-lg flex flex-col justify-end space-x-4 items-end gap-2 pb-2"
            >
              <ReactPlayer
                url={file.preview}
                width={isSmall ? "100%" : "600px"}
                height={isVideo(file) ? "100%" : "40px"}
                controls
              />

              <div className="flex space-x-4 mt-2">
                <button
                  type="button"
                  className="w-8 h-8 px-2 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center  dark:hover:bg-gray-800 hover:bg-white transition-colors"
                  onClick={() => removeFile(file.name)}
                >
                  <Icons.xMark className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 px-2 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center  dark:hover:bg-gray-800 hover:bg-white transition-colors"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  {addUserAssetMutation.isLoading ? (
                    <Icons.spinner
                      spinPulse
                      className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors"
                    />
                  ) : (
                    <Icons.check className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {!source?.sourceUrl && files?.length === 0 && (
        <div className="flex gap-4 flex-col sm:flex-row">
          <ContentTypeItem title={"Link"} Icon={Icons.link}>
            <div className="mt-4 space-x-4">
              {[
                { id: "youtube", title: "YouTube", Icon: Icons.youtube },
                {
                  id: "website",
                  title: "Web",
                  Icon: Icons.browser,
                  disabled: true,
                },
              ].map((linkType) => {
                return (
                  <ContentOptionsButton
                    linkType={linkType}
                    key={JSON.stringify(linkType)}
                  />
                );
              })}
            </div>
          </ContentTypeItem>
          <ContentTypeItem title={"Paste"} Icon={Icons.paste}>
            <div className="mt-4 space-x-4">
              {[
                { id: "text", title: "Copied text", Icon: Icons.paragraph },
              ].map((linkType) => {
                return (
                  <ContentOptionsButton
                    linkType={linkType}
                    key={JSON.stringify(linkType)}
                  />
                );
              })}
            </div>
          </ContentTypeItem>
        </div>
      )}
    </form>
  );
};
