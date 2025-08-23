import { useGetUserAssetQuery } from "@/app/(auth)/assets/[asset-id]/use-get-user-asset-query";
import ReactPlayer from "react-player";

export const VideoPreview = ({ userAssetId }: { userAssetId: string }) => {
  const { data } = useGetUserAssetQuery(userAssetId);

  return (
    <div className="my-8">
      <ReactPlayer
        progressInterval={20}
        url={data?.sourceUrl}
        height={"400px"}
        width={"100%"}
        controls
      />
    </div>
  );
};
