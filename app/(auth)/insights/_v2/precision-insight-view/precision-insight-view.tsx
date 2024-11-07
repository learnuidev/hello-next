"use client";

import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useListErrors } from "../use-list-errors";
import { useSearchQueryStore } from "@/components/search/state";
import { PrecisionInsightHeaders } from "./precision-insight-headers";
import { useListAttempts } from "../use-list-attempts";
import { useGetTopTenIncorrect } from "./use-get-top-ten-incorrect";

export const PrecisionInsightView = () => {
  const totalAttempts = useListAttempts();
  const topTenIncorrect = useGetTopTenIncorrect();

  const querySync = useSearchQueryStore((state) => state.querySync);

  const isEqual = querySync.split("=");

  const attr = isEqual[0]?.trim();
  const val = isEqual?.[1]?.trim();

  console.log("IS EQUAL", [attr, val]);

  const filteredErrors = totalAttempts?.filter((item) => {
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
          <p className="font-extralight text-3xl">{filteredErrors?.length}</p>
        </div>
      </div>

      <PrecisionInsightHeaders />

      <section>
        <code>
          <pre>{JSON.stringify(topTenIncorrect, null, 2)}</pre>
        </code>
      </section>
    </div>
  );
};
