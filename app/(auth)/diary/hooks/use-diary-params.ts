import { useSearchParams } from "next/navigation";

export const useDiaryParams = () => {
  const searchParams = useSearchParams();

  return {
    emotion: searchParams.get("emotion") || "",
  };
};
