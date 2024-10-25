import { useParams } from "next/navigation";

export const useGetCharacterId = () => {
  const params = useParams<{
    "component-id": string;
  }>();
  return decodeURIComponent(params?.["component-id"]);
};
