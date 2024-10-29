import { getHskLevel } from "./get-hsk-level";

export const resolveHsk = (
  queryStr: string,
  {
    hskWords,
    variant,
    level,
    topic,
  }: {
    hskWords: { hanzi: string; level: number; hskLevel: number }[];
    variant?: "all";
    level?: number;
    topic?: string;
  },
  options = { fetchAll: false }
) => {
  const resolvedLevel = level || getHskLevel(queryStr);

  if (variant === "all") {
    return hskWords?.filter((item) => {
      return item?.level <= resolvedLevel;
    });
  }

  return hskWords?.filter((item) => {
    return item?.level === resolvedLevel;
  });
};
