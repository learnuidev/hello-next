import { useSearchParams } from "next/navigation";

export const useGetCurrentLang = () => {
  const searchParams = useSearchParams();
  return searchParams.get("lang") || "zh";
};
