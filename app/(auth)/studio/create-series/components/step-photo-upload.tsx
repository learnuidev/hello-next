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
    { types: imageFormats },
  );
  const isUploading = addUserAssetMutation?.isPending ?? false;

  const { data: userAssets } = useListUserAssets();
  const { data: selectedAsset } = useGetUserAssetQuery(selectedAssetId);

  const imageAssets =
    userAssets?.filter((asset) => imageFormats.includes(asset.contentType)) ||
    [];

  function handleUploadSuccess(resp: UploadFileResponse) {
    onPhotoChange(resp.sourceUrl, resp.id);
    toast.success("照片上传成功");
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
        <Label className="text-gray-700 font-medium dark:text-gray-300">
          封面照片
          <span className="text-gray-500 ml-2 font-normal dark:text-gray-400">
            （可选）
          </span>
        </Label>

        {photoUrl ? (
          <div className="relative group">
            <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-800">
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
                选择不同的
              </Button>
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
              >
                <Icons.refresh className="h-4 w-4 mr-2" />
                上传新的
              </Button>
              <Button variant="destructive" onClick={handleRemove} size="sm">
                <Icons.trash className="h-4 w-4 mr-2" />
                删除
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
              <TabsTrigger value="upload">上传新的</TabsTrigger>
              <TabsTrigger value="select">从资产中选择</TabsTrigger>
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
                  ${dragActive ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20" : "border-gray-300 hover:border-rose-500 hover:bg-rose-50/50 dark:border-gray-700 dark:hover:bg-rose-950/10"}
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
                    <div className="h-16 w-16 rounded-full bg-rose-100 flex items-center justify-center dark:bg-rose-950/30">
                      <Icons.upload className="h-8 w-8 text-rose-500" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="font-medium text-lg text-gray-900 dark:text-gray-100">
                        {dragActive ? "将图片拖放到此处" : "点击或拖拽上传"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        PNG、JPG 或 GIF（最大 5MB）
                      </p>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="select">
              {imageAssets.length === 0 ? (
                <div className="aspect-video w-full rounded-lg border-2 border-gray-200 flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-[rgb(11,12,13)] dark:border-gray-800">
                  <Icons.book className="h-12 w-12 text-gray-400" />
                  <div className="text-center space-y-1">
                    <p className="font-medium text-lg text-gray-900 dark:text-gray-100">
                      没有可用图片
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      上传新图片以开始
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
                        ${photoAssetId === asset.id ? "border-rose-500 ring-2 ring-rose-200 dark:ring-rose-900/50" : "border-gray-200 dark:border-gray-800"}
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

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:bg-[rgb(11,12,13)] dark:border-gray-800">
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
          照片指南
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>使用高质量图片（建议 16:9 宽高比）</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>选择代表您系列内容的图片</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>避免文字或复杂的背景</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>您可以稍后添加或更改此照片</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
