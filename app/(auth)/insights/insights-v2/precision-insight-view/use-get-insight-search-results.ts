"use client";

import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";
import { useSearchQueryStore } from "@/components/search/state";
import { useListComponents } from "@/domain/lesson/component.queries";

export const useGetInsightSearchResults = (filterType?: string) => {
  const totalAttempts = useListAttempts();

  const querySync = useSearchQueryStore((state) => state.query2);

  const { data: components } = useListComponents();

  const isEqual = querySync.split("=");
  const isGreater = querySync.split(">");
  const isContains = querySync.split("~");

  const val = isEqual?.[1]?.trim();

  const filteredTotalAttempts = querySync
    ? (filterType === "all" ? components : totalAttempts)?.filter(
        (item: any) => {
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
        }
      )
    : [];

  return (filteredTotalAttempts || [])?.slice(0, 100);
};
