import { useGetUserAssetQuery } from "@/app/(auth)/assets/[asset-id]/use-get-user-asset-query";
import ReactPlayer from "react-player";

export const ImagePreview = ({ userAssetId }: { userAssetId: string }) => {
  const { data } = useGetUserAssetQuery(userAssetId);

  return (
    <div className="my-8">
      <img src={data?.sourceUrl} className="aspect-square" />
    </div>
  );
};
