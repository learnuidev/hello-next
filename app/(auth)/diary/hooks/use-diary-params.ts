import { useParams, useSearchParams } from "next/navigation";

export const useDiaryParams = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ "entry-id": string }>();

  return {
    entryId: params["entry-id"] || "",
    emotion: searchParams.get("emotion") || "",
  };
};
