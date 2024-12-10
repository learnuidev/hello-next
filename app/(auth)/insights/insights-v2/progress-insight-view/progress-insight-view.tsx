"use client";

import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { ProgressInsightHeaders } from "./progress-insight-headers";

export const ProgressInsightView = () => {
  return (
    <div className="my-4 md:my-16 relative">
      <div className="sticky top-0 z-20 bg-[rgb(9,10,11)] mb-12 flex justify-between items-center">
        <Link href="/insights">
          <Icons.xMark />
        </Link>
        <h1 className="text-2xl dark:text-gray-500 font-extralight text-center">
          Progress
        </h1>

        <div></div>
      </div>

      <ProgressInsightHeaders />

      {/* <div>
        <code>
          <pre>{JSON.stringify(progress, null, 3)}</pre>
        </code>
      </div> */}
    </div>
  );
};
