import { useParams } from "next/navigation";

export const useGetCreatorParams = () => {
  const params = useParams<{ "creator-slug": string }>();
  return {
    creatorSlug: params["creator-slug"],
  };
};
