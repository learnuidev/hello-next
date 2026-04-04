import { useNewConvoStore } from "@/components/step";
import { useListUserAssets } from "@/domain/asset/use-list-user-assets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadFileResponse } from "@/domain/file-upload/use-upload-file";
import { Icons } from "@/components/ui/icons.v2";

interface UserAssetSelectorProps {
  assetType: "audio" | "youtube";
}

export const UserAssetSelector = ({ assetType }: UserAssetSelectorProps) => {
  const { data: userAssets, isLoading } = useListUserAssets();
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  const audioExtensions = ["mp3", "m4a", "webm", "wav"];
  const youtubeExtensions = ["webm", "mp4", "mov", "avi"];

  const filteredAssets = userAssets?.filter((asset: UploadFileResponse) => {
    if (assetType === "audio") {
      return audioExtensions.includes(asset?.extension?.toLowerCase());
    }
    if (assetType === "youtube") {
      return (
        youtubeExtensions.includes(asset?.extension?.toLowerCase()) ||
        asset?.webpageUrl?.includes("youtube.com") ||
        asset.webpageUrl?.includes("youtu.be")
      );
    }
    return false;
  });

  const handleAssetSelect = (assetId: string) => {
    const selectedAsset = userAssets?.find(
      (asset: UploadFileResponse) => asset.id === assetId
    );
    if (selectedAsset) {
      setConvo("title", selectedAsset.name || "");
      if (assetType === "audio") {
        setConvo("audioId", selectedAsset.id);
      } else if (assetType === "youtube") {
        setConvo("mediaUrl", selectedAsset.sourceUrl);
        setConvo("audio", selectedAsset.webpageUrl || selectedAsset.sourceUrl);
      }
    }
  };

  const getSelectedValue = () => {
    if (assetType === "audio" && newConvo?.audioId) {
      const asset = userAssets?.find(
        (a: UploadFileResponse) => a.id === newConvo.audioId
      );
      return asset?.name;
    }
    if (assetType === "youtube" && (newConvo?.mediaUrl || newConvo?.audio)) {
      const asset = userAssets?.find(
        (a: UploadFileResponse) =>
          a.sourceUrl === newConvo.mediaUrl ||
          a.sourceUrl === newConvo.audio ||
          a.webpageUrl === newConvo.audio
      );
      return asset?.name;
    }
    return "";
  };

  if (isLoading) {
    return (
      <div className="my-8">
        <div className="text-gray-500 mb-4">Select from Uploaded Files</div>
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!filteredAssets || filteredAssets.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <div className="text-gray-500 mb-4 flex items-center gap-2">
        <Icons.upload />
        <span>Select from Uploaded Files</span>
      </div>
      <Select value={getSelectedValue()} onValueChange={handleAssetSelect}>
        <SelectTrigger className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full font-extralight focus:outline-0 p-2 border-0 border-none dark:text-gray-300">
          <SelectValue placeholder="Choose from your uploads..." />
        </SelectTrigger>
        <SelectContent>
          {filteredAssets.map((asset: UploadFileResponse) => (
            <SelectItem key={asset.id} value={asset.id}>
              <div className="flex flex-col">
                <span className="truncate max-w-xs">{asset.name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(asset.createdAt).toLocaleDateString()} ·{" "}
                  {asset.extension.toUpperCase()}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
