import { useParams } from "next/navigation";

export const useGetComponentId = () => {
  const params = useParams() as {
    "component-id": string;
  };

  return decodeURIComponent(params["component-id"]);
};
