import { useSearchParams } from "next/navigation";

export const useGetCoursesSearchParams = () => {
  const searchParams = useSearchParams();

  const date = searchParams.get("date") || "";
  const langParams = searchParams.get("lang") || "";
  const mode = searchParams.get("mode") || "";
  const level = parseInt(searchParams.get("level") as string) || 1;
  const character = searchParams.get("character");
  const view = searchParams.get("view");
  const studyMode = searchParams.get("study-mode") || "srs";
  const tag = searchParams?.get("tag") || "";

  return {
    date,
    lang: langParams,
    tag,
    mode,
    level,
    character,
    view,
    studyMode,
  };
};
