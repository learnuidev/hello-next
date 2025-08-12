import { useParams } from "next/navigation";

export const useGetImageParams = () => {
  const params = useParams<{ "image-id": string }>();

  return {
    imageId: params["image-id"],
  };
};
