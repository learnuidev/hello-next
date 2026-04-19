import { useNewConvoStore } from "@/components/step";
import { useListUserAssets } from "@/domain/asset/use-list-user-assets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { UploadFileResponse } from "@/domain/file-upload/use-upload-file";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useUploadFileV2 } from "@/domain/file-upload/use-upload-file-v2";

const IMAGE_FORMATS = ["jpg", "jpeg", "png", "gif", "webp"];

export const BackgroundImageSelector = () => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const { data: userAssets } = useListUserAssets();

  const imageAssets =
    userAssets?.filter((asset: UploadFileResponse) =>
      IMAGE_FORMATS.includes(asset?.extension?.toLowerCase()),
    ) || [];

  const { onUploadFileChange, addUserAssetMutation } = useUploadFileV2(
    (resp: UploadFileResponse) => {
      setConvo("backgroundImageId", resp.id);
      setConvo("backgroundImageUrl", resp.sourceUrl);
    },
    {},
    { types: IMAGE_FORMATS },
  );
  const isUploading = addUserAssetMutation?.isPending ?? false;

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
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith("image/")) return;
      if (file.size > 5 * 1024 * 1024) return;
      onUploadFileChange(file);
    }
  };

  const handleRemoveImage = () => {
    setConvo("backgroundImageId", "");
    setConvo("backgroundImageUrl", "");
  };

  const handleAssetSelect = (assetId: string) => {
    const selectedAsset = imageAssets?.find(
      (asset: UploadFileResponse) => asset.id === assetId,
    );
    if (selectedAsset) {
      setConvo("backgroundImageId", selectedAsset.id);
      setConvo("backgroundImageUrl", selectedAsset.sourceUrl);
    }
  };

  return (
    <div className="my-8">
      <div className="text-gray-500 mb-4">Background Image (optional)</div>

      {newConvo?.backgroundImageUrl ? (
        <div className="relative group">
          <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-800">
            <img
              src={newConvo.backgroundImageUrl}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              className="text-white text-sm bg-white/20 px-3 py-1 rounded hover:bg-white/30"
              onClick={handleRemoveImage}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "aspect-video w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all",
              dragActive
                ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20"
                : "border-gray-300 hover:border-rose-500 hover:bg-rose-50/50 dark:border-gray-700 dark:hover:bg-rose-950/10",
              isUploading && "opacity-50 cursor-not-allowed",
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (!file.type.startsWith("image/")) return;
                if (file.size > 5 * 1024 * 1024) return;
                onUploadFileChange(file);
              }}
              className="hidden"
              disabled={isUploading}
            />
            {isUploading ? (
              <p className="text-gray-400">Uploading...</p>
            ) : (
              <div className="text-center space-y-1">
                <p className="font-medium text-lg text-gray-900 dark:text-gray-100">
                  {dragActive ? "Drop image here" : "Click or drag to upload"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  PNG, JPG or GIF (max 5MB)
                </p>
              </div>
            )}
          </div>

          {imageAssets.length > 0 && (
            <div>
              <div className="text-gray-500 mb-2 flex items-center gap-2">
                <Icons.upload />
                <span>Or select from uploaded images</span>
              </div>
              <Select
                value={newConvo?.backgroundImageId || ""}
                onValueChange={handleAssetSelect}
              >
                <SelectTrigger className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full font-extralight focus:outline-0 p-2 border-0 border-none dark:text-gray-300">
                  <SelectValue placeholder="Choose from your uploads..." />
                </SelectTrigger>
                <SelectContent>
                  {imageAssets.map((asset: UploadFileResponse) => (
                    <SelectItem key={asset.id} value={asset.id}>
                      <div className="flex items-center gap-2">
                        <img
                          src={asset.sourceUrl}
                          alt={asset.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="truncate max-w-xs">
                            {asset.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(asset.createdAt).toLocaleDateString()} ·{" "}
                            {asset.extension.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
