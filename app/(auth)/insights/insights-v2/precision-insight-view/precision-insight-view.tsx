"use client";

import { PrecisionInsightHeaders } from "@/app/(auth)/insights/insights-v2/precision-insight-view/precision-insight-headers";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import {
  TwoSectionLayout,
  TwoSectionLayoutItem,
} from "../components/two-section-layout";
import { PrecisionSearchResults } from "./precision-search-results";
import { TopTenIncorrectComponents } from "./top-ten-incorrect-components";
import { TopTenRecentlyReviewedComponents } from "./top-ten-recently-reviewed-components";
import { useGetInsightSearchResults } from "./use-get-insight-search-results";

export const PrecisionInsightView = () => {
  const filteredTotalAttempts = useGetInsightSearchResults();

  return (
    <div className="my-4 md:my-16 relative">
      <div className="sticky top-0 z-20 bg-[rgb(9,10,11)] mb-12 flex justify-between items-center">
        <Link href="/insights">
          <Icons.xMark />
        </Link>
        <h1 className="text-2xl dark:text-gray-500 font-extralight text-center">
          Precision
        </h1>

        <div>
          {filteredTotalAttempts?.length > 0 && (
            <p className="font-extralight text-3xl">
              {filteredTotalAttempts?.length}
            </p>
          )}
        </div>
      </div>

      <PrecisionInsightHeaders />

      {filteredTotalAttempts?.length > 0 ? (
        <PrecisionSearchResults searchResults={filteredTotalAttempts} />
      ) : (
        <TwoSectionLayout>
          <TwoSectionLayoutItem>
            <TopTenIncorrectComponents />
          </TwoSectionLayoutItem>
          <TwoSectionLayoutItem>
            <TopTenRecentlyReviewedComponents />
          </TwoSectionLayoutItem>
        </TwoSectionLayout>
      )}
    </div>
  );
};
