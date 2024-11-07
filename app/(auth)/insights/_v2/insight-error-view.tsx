"use client";

import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useListErrors } from "./use-list-errors";
import { useSearchQueryStore } from "@/components/search/state";

export const InsightErrorView = () => {
  const totalErrors = useListErrors();

  const querySync = useSearchQueryStore((state) => state.querySync);

  const filteredErrors = totalErrors?.filter((item) => {
    if (!querySync) {
      return true;
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
          Errors
        </h1>

        <div>
          <p className="font-extralight text-3xl">{filteredErrors?.length}</p>
        </div>
      </div>

      <section>
        <code>
          <pre>{JSON.stringify(filteredErrors, null, 2)}</pre>
        </code>
      </section>
    </div>
  );
};
