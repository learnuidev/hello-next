"use client";

import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";
import { useSearchQueryStore } from "@/components/search/state";

export const useGetInsightSearchResults = () => {
  const totalAttempts = useListAttempts();

  const querySync = useSearchQueryStore((state) => state.query);

  const isEqual = querySync.split("=");
  const isGreater = querySync.split(">");
  const isContains = querySync.split("~");

  const val = isEqual?.[1]?.trim();

  const filteredTotalAttempts = querySync
    ? totalAttempts?.filter((item) => {
        if (!querySync) {
          return true;
        }

        if (isEqual?.length > 1) {
          const attr = isEqual[0]?.trim();
          // return item[attr]?.toLowerCase() === val?.toLowerCase();

          const attributeItem = item?.[attr];

          if (!attributeItem) {
            return false;
          }

          if (
            `${attributeItem}`?.toLowerCase() ===
            `${val}`?.toLowerCase()?.trim()
          ) {
            return true;
          } else {
            return false;
          }
        }

        if (isGreater?.length > 1) {
          const attr = isGreater[0]?.trim();
          const val = isGreater?.[1]?.trim();

          return item?.[attr] > parseInt(val);
        }
        if (isContains?.length > 1) {
          const attr = isContains[0]?.trim();
          const val = isContains?.[1]?.trim();

          return `${item?.[`${attr}`]}`?.includes(`${val}`);
        }

        return JSON.stringify(item)
          ?.toLowerCase()
          ?.includes(querySync?.toLowerCase());
      })
    : [];

  return filteredTotalAttempts;
};
