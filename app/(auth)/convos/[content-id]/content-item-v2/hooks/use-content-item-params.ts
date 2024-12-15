import { useParams } from "next/navigation";

export const useContentItemParams = () => {
  const params = useParams() as {
    "content-id": string;
  };

  const contentId = params["content-id"];

  return {
    contentId,
  };
};
