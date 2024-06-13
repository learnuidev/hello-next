import { useSearchQueryStore } from "@/components/search/state";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import Link from "next/link";
import { TotalReviews } from "./total-reviews";
import { getDay } from "date-fns";

const indexToDays = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export const MonthlyReview = () => {
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
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 justify-around items-center gap-2 md:p-16 p-4 mb-8 text-gray-400 font-light text-2xl">
        {groupTitles?.map((groupTitle) => {
          const groupItem = groups?.find((group) => group?.title === groupTitle)
            ?.items?.[0];

          //   const day = groupItem ? groupTitle : getDay(new Date(groupTitle));
          const day = (() => {
            const dayIndex = getDay(new Date(groupTitle));

            return indexToDays?.[dayIndex];
          })();

          return (
            <div
              key={groupTitle}
              className="hover:text-white transition aspect-square border-2 border-[#0b0b0f] bg-[rgb(13,14,16)] flex flex-col justify-between py-4 pb-8 px-4"
            >
              {/* <h2 className="md:text-xl text-sm text-slate-700">
                {groupTitle}
              </h2> */}

              <div className="flex justify-between items-center">
                <p className="text-[14px]">{day}</p>

                <Link
                  href={`/review?date=${groupTitle}`}
                  className="text-[14px] text-slate-400"
                >
                  {groupTitle}
                </Link>
              </div>

              <TotalReviews date={groupTitle} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
