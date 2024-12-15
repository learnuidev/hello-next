import { useParams, useSearchParams } from "next/navigation";

export const useGetSelectedCharacterParams = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ "component-id": string }>();
  const characterId = decodeURIComponent(params["component-id"]);
  return {
    variant: searchParams.get("variant") || "",
    characterId,
  };
};
