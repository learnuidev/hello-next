import { Icons } from "@/components/ui/icons.v2";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import ReactPlayer from "react-player";

interface DropzoneProps {
  className?: string;
}

interface FileWithPreview extends File {
  preview: string;
}

// function isAudio(type: string) {
//   return ["audio/wav", "audio/mp3"]?.includes(type);
// }

function isVideo(type: string) {
  return ["video/mp4"]?.includes(type);
}

export const Dropzone = ({ className }: DropzoneProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
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
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("upload_preset", "friendsbook");

    console.log("files", files);

    // const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    // const data = await fetch(URL, {
    //   method: "POST",
    //   body: formData,
    // }).then((res) => res.json());

    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full block">
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        <div className="w-[600px] flex flex-col items-center justify-center border-dotted dark:border-gray-700 border-2 rounded-2xl pt-16">
          <Icons.upload className="w-5 h-5 fill-current" />

          <p className="dark:text-gray-400 font-extralight mt-2">
            {isDragActive
              ? "Drop the files here ..."
              : "Drag & drop or choose file to upload"}
          </p>
          <p className="dark:text-gray-500 font-extralight mt-12 pb-8">
            Supported file types: Vide, Audio (e.g. mp3)
          </p>
        </div>
      </div>

      {/* Preview */}

      <div className="mt-8 space-y-4">
        {files.map((file) => (
          <div
            key={file.name}
            className="rounded-md shadow-lg flex flex-row justify-end space-x-4 items-center gap-2 pb-2"
          >
            <ReactPlayer
              url={file.preview}
              width={"600px"}
              height={isVideo(file.type) ? "100%" : "40px"}
              controls
            />

            <button
              type="button"
              className="w-8 h-8 px-2 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center  dark:hover:bg-gray-800 hover:bg-white transition-colors"
              onClick={() => removeFile(file.name)}
            >
              <Icons.xMark className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
            </button>
          </div>
        ))}
      </div>
    </form>
  );
};
