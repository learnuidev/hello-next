import { useParams, useSearchParams } from "next/navigation";

export const useGetContentId = () => {
  const searchParams = useSearchParams();

  const params = useParams() as {
    "content-id": string;
    contentId: string;
  };

  const contentId =
    params["content-id"] || params.contentId || searchParams.get("contentId");

  return contentId;
};
