import { useSearchQueryStore } from "@/components/search/state";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import Link from "next/link";
import { TotalReviews } from "./total-reviews";

export const ReviewList = () => {
  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant: "discovered" });
  const queryStr = useSearchQueryStore((state) => state.query);

  const filteredGroups = groups;
  const groupTitles = filteredGroups
    ?.map((group) => group.title)
    ?.filter((title: string) => {
      if (queryStr) {
        return title?.toLowerCase()?.includes(queryStr);
      }

      return true;
    });

  return (
    <section className="w-full px-4 md:px-12 md:my-4">
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 justify-around items-center gap-2 md:p-16 p-4 my-8 text-gray-400 font-light text-2xl">
        {groupTitles?.map((groupTitle) => {
          return (
            <div
              key={groupTitle}
              className="hover:text-white transition aspect-square border-2 border-[#0b0b0f] flex flex-col justify-between py-4 pb-8 px-4"
            >
              {/* <h2 className="md:text-xl text-sm text-slate-700">
                {groupTitle}
              </h2> */}

              <Link
                href={`/review?date=${groupTitle}`}
                className="md:text-xl text-sm text-slate-700"
              >
                {groupTitle}
              </Link>

              <TotalReviews date={groupTitle} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
