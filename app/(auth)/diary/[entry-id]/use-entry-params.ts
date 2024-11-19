import { useParams } from "next/navigation";

export const useEntryParams = () => {
  const params = useParams<{ "entry-id": string }>();

  return {
    entryId: params["entry-id"] || "",
  };
};
