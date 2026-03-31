import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useUploadFileV2, UploadFileResponse } from "@/domain/file-upload/use-upload-file-v2";

interface StepPhotoUploadProps {
  photoUrl: string;
  photoAssetId: string;
  onPhotoChange: (url: string, assetId: string) => void;
  error?: string;
}

export function StepPhotoUpload({
  photoUrl,
  photoAssetId,
  onPhotoChange,
  error,
}: StepPhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { onUploadFileChange, addUserAssetMutation } = useUploadFileV2(
    handleUploadSuccess,
    {},
    { types: ["jpg", "jpeg", "png", "gif", "webp"] }
  );
  const isUploading = addUserAssetMutation?.isPending ?? false;

  function handleUploadSuccess(resp: UploadFileResponse) {
    onPhotoChange(resp.sourceUrl, resp.id);
    toast.success("Photo uploaded successfully");
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      await onUploadFileChange(file);
    } catch (uploadError) {
      toast.error("Failed to upload photo");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleRemove = () => {
    onPhotoChange("", "");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label className="text-base">
          Cover Photo
          <span className="text-muted-foreground ml-2 font-normal">
            (Optional)
          </span>
        </Label>

        {photoUrl ? (
          <div className="relative group">
            <div className="aspect-video w-full rounded-lg overflow-hidden border-2">
              <img
                src={photoUrl}
                alt="Series cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
              >
                <Icons.refresh className="h-4 w-4 mr-2" />
                Replace
              </Button>
              <Button variant="destructive" onClick={handleRemove} size="sm">
                <Icons.trash className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              aspect-video w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all
              ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary hover:bg-muted/50"}
              ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              disabled={isUploading}
            />
            {isUploading ? (
              <Icons.spinner className="h-12 w-12 animate-spin text-primary" />
            ) : (
              <>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icons.upload className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center space-y-1">
                  <p className="font-medium text-lg">
                    {dragActive
                      ? "Drop your image here"
                      : "Click or drag to upload"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, or GIF (max 5MB)
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <Icons.xMark className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>

      <div className="bg-muted/50 rounded-lg p-6 border border-muted">
        <h3 className="font-semibold mb-3">Photo Guidelines</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>
              Use a high-quality image (16:9 aspect ratio recommended)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>Choose an image that represents your series content</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>Avoid text or busy backgrounds</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>You can add or change this photo later</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
