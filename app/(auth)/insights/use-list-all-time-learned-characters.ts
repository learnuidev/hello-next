import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { format, parseISO } from "date-fns";

interface TransformedData {
  day: string;
  count: number;
}

function transformAllData(data: any): TransformedData[] {
  // Create a map to store counts by day
  const dayCounts = new Map<string, number>();

  // Process each item in the input data
  data.forEach((item: any) => {
    // Convert timestamp to Date object
    const date = new Date(item.createdAt);
    // Format date as "Month Day, Year" (e.g., "May 21st, 2024")
    const dayKey = format(date, "MMMM do, yyyy");

    // Update count for this day
    const currentCount = dayCounts.get(dayKey) || 0;
    dayCounts.set(dayKey, currentCount + 1);
  });

  // Convert the map to an array of objects
  const result = Array.from(dayCounts.entries())
    .map(([day, count]) => ({ day, count }))
    // Sort by date (ascending)
    .sort((a, b) => {
      const dateA = parseISO(a.day);
      const dateB = parseISO(b.day);
      return dateA.getTime() - dateB.getTime();
    });

  // Calculate accumulated counts
  let accumulatedCount = 0;
  return result.map((item) => {
    accumulatedCount += item.count;
    return {
      day: item.day,
      count: accumulatedCount,
    };
  });
}

export function useListAllTimeCharacters(variant?: "mastery") {
  const { data: learnedCharacters, isLoading: isLearnedCharactersLoading } =
    useListCharactersQuery();

  const singleChars =
    learnedCharacters
      ?.filter((char) => {
        const initialFilter = char?.hanzi?.length === 1 && char?.lang === "zh";

        if (variant === "mastery") {
          return initialFilter && char?.status === "forgotten";
        }

        return initialFilter;
      })
      ?.sort((a, b) => a?.createdAt - b?.createdAt) || [];

  return {
    data: transformAllData(singleChars || []),
    totalData: singleChars?.length,
    isLoading: isLearnedCharactersLoading,
  };
}
