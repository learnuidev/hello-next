import { useParams, useSearchParams } from "next/navigation";

export const useEntryParams = () => {
  const params = useParams<{ "entry-id": string }>();
  const searchParams = useSearchParams();

  return {
    entryId: params["entry-id"] || "",
    view: searchParams.get("view") || "",
  };
};
