import { useSearchParams } from "next/navigation";
import { defaultFeature } from "@/app/next/components/features";

export const useGetNextParams = () => {
  const searchParams = useSearchParams();

  return {
    featureId: searchParams.get("feature-id") || defaultFeature.id,
  };
};
