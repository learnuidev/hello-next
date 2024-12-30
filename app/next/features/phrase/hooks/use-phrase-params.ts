import { useSearchParams } from "next/navigation";

export const usePhraseParams = () => {
  const searchParams = useSearchParams();
  const contextId = searchParams?.get("contextId") || "";
  const view = searchParams?.get("view");

  return {
    contextId,
    view,
  };
};
