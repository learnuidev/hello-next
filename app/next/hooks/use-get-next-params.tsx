import { useSearchParams } from "next/navigation";
import { defaultFeature } from "@/app/next/components/features";

const url = `http://f.china.com.cn/2021-02/09/content_77203266.htm`;

export const useGetNextParams = () => {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "default";
  const urlValue = searchParams.get("url") || url;
  const title = searchParams.get("title") || "";
  const featureId = searchParams.get("feature-id") || defaultFeature.id;

  return {
    featureId,
    title,
    url: urlValue,
    view,
  };
};
