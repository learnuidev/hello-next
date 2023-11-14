import { useSearchParams as _useSearchParams } from "next/navigation";

export function useSearchParams() {
  const searchParams = _useSearchParams();
  return {
    lessonId: searchParams?.get("lessonId") as string,
  };
}
