import { useParams } from "next/navigation";

export const useGetContentId = () => {
  const params = useParams() as {
    "content-id": string;
    contentId: string;
  };

  const contentId = params["content-id"] || params.contentId;

  return contentId;
};
