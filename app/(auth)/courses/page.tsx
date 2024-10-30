"use client";

import { FilterSelect } from "@/app/nmm/filter-select";
import { belts } from "@/app/nmm/utils";
import { NavBar } from "@/components/navbar";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { useRouter } from "next/navigation";
import { useGetCoursesSearchParams } from "./hooks/use-get-courses-search-params";
import { cn } from "@/lib/utils";
import { useSearchQueryStore } from "@/components/search/state";

export default function Courses() {
  const router = useRouter();

  const { data } = useListContentsQuery();

  const { tag, level } = useGetCoursesSearchParams();

  const tags = [
    ...new Set(
      data
        ?.map((content: any) => content?.tags)
        ?.filter(Boolean)
        ?.flat() as string[]
    ),
  ];

  const querySync = useSearchQueryStore((state) => state.querySync);

  const filteredData = data?.filter((item: any) => {
    if (querySync) {
      return (
        item?.tags?.includes(tag) &&
        JSON.stringify(item)?.toLowerCase()?.includes(querySync?.toLowerCase())
      );
    }

    if (tag) {
      return item?.tags?.includes(tag);
    }

    return true;
  });
  return (
    <main className="relative">
      <div className="sticky top-0 dark:bg-[rgb(9,10,11)] bg-white">
        <NavBar autoFocus={false} />

        <div className="flex justify-between space-x-4 px-4 md:px-12">
          <section className="flex justify-start items-center w-full gap-8">
            {belts.map((belt) => {
              return (
                <button
                  key={belt.color}
                  onClick={() => {
                    router.push(`/courses?tag=${tag}&level=${belt?.hskLevel}`);
                  }}
                  className={cn(
                    "border-[1px] px-3 rounded-full text-xs py-[2px] border-gray-400 text-gray-400 transition-all dark:hover:text-white dark:hover:border-white hover:text-black hover:border-black",
                    level === belt?.hskLevel
                      ? "dark:text-white dark:border-white text-gray-800 border-gray-800"
                      : "dark:text-gray-600 dark:border-gray-600 text-gray-300 border-gray-300"
                  )}
                >
                  HSK {belt.hskLevel}
                </button>
              );
            })}
          </section>

          <FilterSelect
            className="w-96"
            title={"Select a topic"}
            value={tag || tags?.[0]}
            items={tags?.map((topic) => {
              return {
                title: topic,
                id: topic,
              };
            })}
            onValueChange={(tag) => {
              router.push(`/courses?tag=${tag}&level=${level}`);
            }}
          />
        </div>

        {/* filters */}
      </div>

      <section className={"px-4 md:px-12 mt-12"}>
        <code>
          <pre>
            {JSON.stringify(
              filteredData
                ?.sort((a: any, b: any) => a?.createdAt - b?.createdAt)
                ?.map((item: any) => item?.title),
              null,
              4
            )}
          </pre>
        </code>
      </section>
    </main>
  );
}
