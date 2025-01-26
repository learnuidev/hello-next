import { useSearchParams } from "next/navigation";

export const useGetLangParams = () => {
  const searchParams = useSearchParams();

  return searchParams.get("lang");
};
