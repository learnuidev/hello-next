"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useDeleteContentMutation } from "@/domain/content/use-delete-content-mutation";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import {
  useUploadFileV2,
  UploadFileResponse,
} from "@/domain/file-upload/use-upload-file-v2";
import { useListUserAssets } from "@/domain/asset/use-list-user-assets";
import { useGetUserAssetQuery } from "@/app/(auth)/assets/[asset-id]/use-get-user-asset-query";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useGetContentId } from "./[content-id]/hooks/use-get-content-id";
import { contentTypes } from "./constants/content-types";
import { languages } from "@/app/next/features/phrase/languages";
import { IMAGE_FORMATS } from "@/components/_select-character/selected-character/character-content/image-formats";
import { isYoutube } from "./utils/is-youtube";

export const GeneralContentSettings = () => {
  const [contentType, setContentType] = useState("not-selected");
  const [contentTitle, setContentTitle] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [contentLang, setContentLang] = useState("");
  const [backgroundImageId, setBackgroundImageId] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [imageTab, setImageTab] = useState<"upload" | "select">("upload");
  const [dragActive, setDragActive] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateContentMutation = useUpdateContentMutation();
  const deleteContentMutation = useDeleteContentMutation();
  const contentId = useGetContentId();

  const { data: contentData } = useGetContentQuery({ contentId });

  const content = contentData as any;

  const { onUploadFileChange, addUserAssetMutation } = useUploadFileV2(
    (resp: UploadFileResponse) => {
      setBackgroundImageId(resp.id);
      setBackgroundImageUrl(resp.sourceUrl);
    },
    {},
    { types: IMAGE_FORMATS },
  );
  const isUploading = addUserAssetMutation?.isPending ?? false;

  const { data: userAssets } = useListUserAssets();
  const { data: selectedAsset } = useGetUserAssetQuery(selectedAssetId);

  const imageAssets =
    userAssets?.filter((asset: any) =>
      IMAGE_FORMATS.includes(asset.contentType),
    ) || [];

  useEffect(() => {
    if (content?.title) {
      setContentTitle(content?.title);
    }
    if (content?.description) {
      setContentDescription(content?.description);
    }
    if (content?.lang) {
      setContentLang(content?.lang);
    }
    if (content?.contentType) {
      setContentType(content?.contentType);
    }
    if (content?.backgroundImageId) {
      setBackgroundImageId(content?.backgroundImageId);
    }
    if (content?.backgroundImageUrl) {
      setBackgroundImageUrl(content?.backgroundImageUrl);
    }
    if (content?.audio) {
      setAudioUrl(content?.audio);
    }
  }, [
    content?.contentType,
    content?.title,
    content?.description,
    content?.lang,
    content?.backgroundImageId,
    content?.backgroundImageUrl,
    content?.audio,
  ]);

  useEffect(() => {
    if (selectedAsset) {
      setBackgroundImageId(selectedAsset.id);
      setBackgroundImageUrl(selectedAsset.sourceUrl);
    }
  }, [selectedAsset]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return;
    onUploadFileChange(file);
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

  const handleRemoveImage = () => {
    setBackgroundImageId("");
    setBackgroundImageUrl("");
    setSelectedAssetId("");
  };

  const router = useRouter();

  return (
    <>
      <div className="my-4 mb-8">
        <Label className="text-[16px] text-gray-500 block">Content Name</Label>
        <input
          className="w-full h-12 text-2xl bg-transparent dark:text-white dark:border-gray-800 px-2"
          value={contentTitle}
          onChange={(event) => {
            setContentTitle(event.target.value);
          }}
          placeholder="Content title"
        />
      </div>

      <div className="my-4 mb-8">
        <Label className="text-[16px] text-gray-500 block">Description</Label>
        <textarea
          className="w-full min-h-24 text-lg bg-transparent dark:text-white dark:border-gray-800 px-2 py-2 border-b resize-y"
          value={contentDescription}
          onChange={(event) => {
            setContentDescription(event.target.value);
          }}
          placeholder="Content description"
        />
      </div>

      <div className="my-4 mb-8">
        <Label className="text-[16px] text-gray-500 mb-4 block">Language</Label>
        <Select
          value={contentLang}
          onValueChange={(value) => {
            setContentLang(value);
          }}
        >
          <SelectTrigger className="sm:w-1/2 w-full h-12 text-lg bg-transparent dark:text-white dark:border-gray-800 px-2">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="mx-0">
            {languages.map((language) => {
              return (
                <SelectItem key={language.shortId} value={language.shortId}>
                  {language.title}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="my-4">
        <Label className="text-[16px] text-gray-500 mb-4 block">
          Content Type
        </Label>
        <Select
          defaultValue="characters-learned"
          value={contentType}
          onValueChange={(value) => {
            setContentType(value);
          }}
        >
          <SelectTrigger className="sm:w-1/2 w-full h-12 text-2xl bg-transparent dark:text-white dark:border-gray-800 px-2">
            <SelectValue placeholder="Select content type" className="" />
          </SelectTrigger>
          <SelectContent className="mx-0">
            <SelectItem value="not-selected">Not Selected</SelectItem>
            {contentTypes.map((contentType) => {
              return (
                <SelectItem
                  key={JSON.stringify(contentType)}
                  value={contentType.id}
                >
                  {contentType.title}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {(isYoutube(audioUrl) || content?.type === "youtube") && (
        <div className="my-4 mb-8">
          <Label className="text-[16px] text-gray-500 block">
            Audio URL (YouTube)
          </Label>
          <input
            className="w-full h-12 text-lg bg-transparent dark:text-white dark:border-gray-800 px-2"
            value={audioUrl}
            onChange={(event) => {
              setAudioUrl(event.target.value);
            }}
            placeholder="YouTube URL"
          />
        </div>
      )}

      <div className="my-4 mb-8">
        <Label className="text-[16px] text-gray-500 block mb-4">
          Background Image
        </Label>

        {backgroundImageUrl ? (
          <div className="relative group">
            <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-800">
              <img
                src={backgroundImageUrl}
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setImageTab("select");
                  setSelectedAssetId("");
                  setBackgroundImageId("");
                  setBackgroundImageUrl("");
                }}
                size="sm"
              >
                Select Different
              </Button>
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
              >
                Upload New
              </Button>
              <Button
                variant="destructive"
                onClick={handleRemoveImage}
                size="sm"
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <Tabs
            value={imageTab}
            onValueChange={(v) => setImageTab(v as "upload" | "select")}
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
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  disabled={isUploading}
                />
                {isUploading ? (
                  <p className="text-gray-400">Uploading...</p>
                ) : (
                  <div className="text-center space-y-1">
                    <p className="font-medium text-lg text-gray-900 dark:text-gray-100">
                      {dragActive
                        ? "Drop image here"
                        : "Click or drag to upload"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      PNG, JPG or GIF (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="select">
              {imageAssets.length === 0 ? (
                <div className="aspect-video w-full rounded-lg border-2 border-gray-200 flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-[rgb(11,12,13)] dark:border-gray-800">
                  <div className="text-center space-y-1">
                    <p className="font-medium text-lg text-gray-900 dark:text-gray-100">
                      No images available
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Upload a new image to get started
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 max-h-[400px] overflow-y-auto">
                  {imageAssets.map((asset: any) => (
                    <button
                      key={asset.id}
                      onClick={() => {
                        setSelectedAssetId(asset.id);
                        setBackgroundImageId(asset.id);
                        setBackgroundImageUrl(asset.sourceUrl);
                      }}
                      className={cn(
                        "aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-rose-500",
                        backgroundImageId === asset.id
                          ? "border-rose-500 ring-2 ring-rose-200 dark:ring-rose-900/50"
                          : "border-gray-200 dark:border-gray-800",
                      )}
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
      </div>

      <div className="flex gap-4">
        <Button
          variant={"outline"}
          disabled={updateContentMutation.isPending}
          className={cn(
            updateContentMutation.isPending ? "text-gray-500" : "",
            "mt-8 sm:w-24 uppercase w-full rounded-full",
          )}
          onClick={() => {
            return updateContentMutation.mutateAsync({
              id: content?.id || "",
              contentType,
              title: contentTitle,
              description: contentDescription,
              lang: contentLang,
              backgroundImageId,
              audio: audioUrl,
              updatedAt: Date.now(),
            } as any);
          }}
        >
          {updateContentMutation?.isPending ? "Saving..." : "Save"}
        </Button>

        <Button
          variant={"outline"}
          disabled={deleteContentMutation.isPending}
          className={cn(
            deleteContentMutation?.isPending ? "text-gray-500" : "",
            "mt-8 sm:w-24 uppercase w-full rounded-full text-red-500",
          )}
          onDoubleClick={() => {
            return deleteContentMutation
              .mutateAsync({
                id: content?.id || "",
              } as any)
              .then((res) => {
                router.push("/convos");
              });
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
};
