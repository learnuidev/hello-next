"use client";

import { PrecisionInsightHeaders } from "@/app/(auth)/insights/insights-v2/precision-insight-view/precision-insight-headers";
import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";
import { useSearchQueryStore } from "@/components/search/state";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import {
  TwoSectionLayout,
  TwoSectionLayoutItem,
} from "../components/two-section-layout";
import { PrecisionSearchResults } from "./precision-search-results";
import { TopTenIncorrectComponents } from "./top-ten-incorrect-components";
import { TopTenRecentlyReviewedComponents } from "./top-ten-recently-reviewed-components";

export const PrecisionInsightView = () => {
  const totalAttempts = useListAttempts();

  const querySync = useSearchQueryStore((state) => state.query);

  const isEqual = querySync.split("=");
  const isGreater = querySync.split(">");

  const attr = isEqual[0]?.trim();
  const val = isEqual?.[1]?.trim();

  const filteredTotalAttempts = totalAttempts?.filter((item) => {
    if (!querySync) {
      return true;
    }

    if (isEqual?.length > 1) {
      const attr = isEqual[0]?.trim();
      // return item[attr]?.toLowerCase() === val?.toLowerCase();

      if (item[attr]?.toLowerCase() === val?.toLowerCase()?.trim()) {
        return true;
      } else {
        return false;
      }
    }

    if (isGreater?.length > 1) {
      const attr = isGreater[0]?.trim();
      const val = isGreater?.[1]?.trim();

      return item[attr] > parseInt(val);
    }

    return JSON.stringify(item)
      ?.toLowerCase()
      ?.includes(querySync?.toLowerCase());
  });

  return (
    <div className="my-4 md:my-16 relative">
      <div className="sticky top-0 py-4 z-20 bg-[rgb(9,10,11)] mb-12 flex justify-between items-center">
        <Link href="/insights">
          <Icons.xMark />
        </Link>
        <h1 className="text-2xl dark:text-gray-500 font-extralight text-center">
          Precision
        </h1>

        <div>
          {querySync && (
            <p className="font-extralight text-3xl">
              {filteredTotalAttempts?.length}
            </p>
          )}
        </div>
      </div>

      <PrecisionInsightHeaders />

      {querySync ? (
        <PrecisionSearchResults searchResults={filteredTotalAttempts} />
      ) : (
        <TwoSectionLayout>
          <TwoSectionLayoutItem>
            <TopTenIncorrectComponents />
          </TwoSectionLayoutItem>
          <TwoSectionLayoutItem>
            <TopTenRecentlyReviewedComponents />
            {/* <code>
              <pre>{JSON.stringify(topTenIncorrect, null, 2)}</pre>
            </code> */}
          </TwoSectionLayoutItem>
        </TwoSectionLayout>
      )}
    </div>
  );
};
