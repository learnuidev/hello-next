import { useSearchQueryStore } from "@/components/search/state";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import Link from "next/link";
import { TotalReviews } from "./total-reviews";

const indexToDays = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const monthIndextoMonth = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
} as any;

export const YearlyReview = () => {
  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant: "discovered" });
  const queryStr = useSearchQueryStore((state) => state.query);

  const years = [...new Set(groups?.map((group) => group.year))].map((year) => {
    const items = groups.filter((group) => group.year === year);
    return {
      year,
      groups: items,
    };
  });

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
      {years?.map((year) => {
        const groupTitles = year.groups
          ?.map((group) => group.title)
          ?.filter((title: string) => {
            if (queryStr) {
              return title?.toLowerCase()?.includes(queryStr);
            }

            return true;
          });

        const months = [
          ...new Set(year?.groups?.map((group) => group.month)),
        ].map((month) => {
          const items = year.groups.filter((group) => group.month === month);
          return {
            month,
            groups: items,
          };
        });

        return (
          <div key={year?.year}>
            <h1 className="text-2xl text-white my-4">{year?.year}</h1>

            <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 justify-around items-center gap-2 md:px-16 p-4 mb-8 text-gray-400 font-light text-2xl">
              {Object.values(monthIndextoMonth).map(
                (groupTitle: any, idx: any) => {
                  return (
                    <div
                      key={groupTitle}
                      className="hover:text-white transition md:aspect-square border-2 border-[#0b0b0f] bg-[rgb(13,14,16)] flex flex-col justify-between py-4 pb-8 px-4"
                    >
                      {/* <h2 className="md:text-xl text-sm text-slate-700">
          {groupTitle}
        </h2> */}

                      <div className="flex justify-between items-center">
                        <p className="text-[14px]">{groupTitle}</p>

                        <Link
                          href={`/review?date=${groupTitle}`}
                          className="text-[14px] text-slate-600"
                        >
                          {idx + 1}
                          {/* {groupTitle
                              ?.split("/")
                              .map((x, i) => (i === 0 ? parseInt(x) + 1 : x))
                              ?.join("/")} */}
                        </Link>
                      </div>

                      <TotalReviews year={year?.year} month={idx + 1} />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};
