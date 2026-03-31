import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons.v2";
import { toast } from "sonner";
import {
  useUploadFileV2,
  UploadFileResponse,
} from "@/domain/file-upload/use-upload-file-v2";
import { useListUserAssets } from "@/domain/asset/use-list-user-assets";
import { useGetUserAssetQuery } from "@/app/(auth)/assets/[asset-id]/use-get-user-asset-query";

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
  const [uploadTab, setUploadTab] = useState<"upload" | "select">("upload");
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageFormats = ["jpg", "jpeg", "png", "gif", "webp"];

  const { onUploadFileChange, addUserAssetMutation } = useUploadFileV2(
    handleUploadSuccess,
    {},
    { types: imageFormats }
  );
  const isUploading = addUserAssetMutation?.isPending ?? false;

  const { data: userAssets } = useListUserAssets();
  const { data: selectedAsset } = useGetUserAssetQuery(selectedAssetId);

  const imageAssets =
    userAssets?.filter((asset) => imageFormats.includes(asset.contentType)) ||
    [];

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
    setSelectedAssetId("");
  };

  const handleAssetSelect = (assetId: string) => {
    setSelectedAssetId(assetId);
  };

  const handleBackToSelect = () => {
    setUploadTab("select");
    setSelectedAssetId("");
    onPhotoChange("", "");
  };

  useEffect(() => {
    if (selectedAsset) {
      onPhotoChange(selectedAsset.sourceUrl, selectedAsset.id);
    }
  }, [selectedAsset]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-gray-700 font-medium">
          Cover Photo
          <span className="text-gray-500 ml-2 font-normal">(Optional)</span>
        </Label>

        {photoUrl ? (
          <div className="relative group">
            <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={photoUrl}
                alt="Series cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <Button
                variant="secondary"
                onClick={handleBackToSelect}
                size="sm"
              >
                <Icons.book className="h-4 w-4 mr-2" />
                Choose Different
              </Button>
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
              >
                <Icons.refresh className="h-4 w-4 mr-2" />
                Upload New
              </Button>
              <Button variant="destructive" onClick={handleRemove} size="sm">
                <Icons.trash className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <Tabs
            value={uploadTab}
            onValueChange={(v) => setUploadTab(v as "upload" | "select")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upload">Upload New</TabsTrigger>
              <TabsTrigger value="select">Select from Assets</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  aspect-video w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all
                  ${dragActive ? "border-rose-500 bg-rose-50" : "border-gray-300 hover:border-rose-500 hover:bg-rose-50/50"}
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
                  <Icons.spinner className="h-12 w-12 animate-spin text-rose-500" />
                ) : (
                  <>
                    <div className="h-16 w-16 rounded-full bg-rose-100 flex items-center justify-center">
                      <Icons.upload className="h-8 w-8 text-rose-500" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="font-medium text-lg text-gray-900">
                        {dragActive
                          ? "Drop your image here"
                          : "Click or drag to upload"}
                      </p>
                      <p className="text-sm text-gray-600">
                        PNG, JPG, or GIF (max 5MB)
                      </p>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="select">
              {imageAssets.length === 0 ? (
                <div className="aspect-video w-full rounded-lg border-2 border-gray-200 flex flex-col items-center justify-center gap-4 bg-gray-50">
                  <Icons.book className="h-12 w-12 text-gray-400" />
                  <div className="text-center space-y-1">
                    <p className="font-medium text-lg text-gray-900">
                      No images available
                    </p>
                    <p className="text-sm text-gray-600">
                      Upload a new image to get started
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 max-h-[400px] overflow-y-auto">
                  {imageAssets.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => handleAssetSelect(asset.id)}
                      className={`
                        aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-rose-500
                        ${photoAssetId === asset.id ? "border-rose-500 ring-2 ring-rose-200" : "border-gray-200"}
                      `}
                    >
                      <img
                        src={asset.sourceUrl}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {error && (
          <p className="text-sm text-rose-500 flex items-center gap-1">
            <Icons.xMark className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold mb-3 text-gray-900">Photo Guidelines</h3>
        <ul className="space-y-2 text-sm text-gray-600">
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
    </div>
  );
}
