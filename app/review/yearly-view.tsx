import { useSearchQueryStore } from "@/components/search/state";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import Link from "next/link";
import { TotalReviews } from "./total-reviews";
import { getDay, getYear, intervalToDuration, getTime } from "date-fns";
import { groupBy } from "ramda";

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
            {/* <h1 className="text-2xl text-white">{year?.year}</h1> */}

            {months?.map((month) => {
              const groupTitles = month.groups
                ?.map((group) => group.title)
                ?.filter((title: string) => {
                  if (queryStr) {
                    return title?.toLowerCase()?.includes(queryStr);
                  }

                  return true;
                });

              const monthTitle = monthIndextoMonth?.[month?.month];

              return (
                <div key={month?.month}>
                  <h1 className="text-2xl text-white font-light my-4">
                    <span className="font-semibold">{monthTitle}</span>{" "}
                    <span>{year?.year}</span>
                  </h1>
                  {/* <h1 className="text-2xl text-white font-light my-4">
                    0{month?.month}/{year?.year}
                  </h1> */}

                  <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 justify-around items-center gap-2 md:px-16 p-4 mb-8 text-gray-400 font-light text-2xl">
                    {groupTitles?.map((groupTitle) => {
                      const groupItem = groups?.find(
                        (group) => group?.title === groupTitle
                      )?.items?.[0];

                      //   const day = groupItem ? groupTitle : getDay(new Date(groupTitle));
                      const day = (() => {
                        const dayIndex = getDay(new Date(groupTitle));

                        return indexToDays?.[dayIndex];
                      })();

                      const intervalParams = {
                        start: new Date(groupTitle),
                        end: new Date(),
                      };

                      const startTime = getTime(new Date(groupTitle));
                      const endTime = getTime(new Date());

                      const interval = intervalToDuration(intervalParams);

                      // const days = Math.floor(
                      //   Math.abs(startTime - endTime) / (36000 * 2000)
                      // );

                      if (groupTitle === "4/30/2024") {
                        console.log("Start time", startTime);
                        console.log("End time", endTime);
                        console.log("GROUP TITLE", groupTitle);
                        // console.log("interval", interval);
                        console.log("interval-params", intervalParams);
                      }

                      return (
                        <div
                          key={groupTitle}
                          className="hover:text-white transition md:aspect-square border-2 border-[#0b0b0f] bg-[rgb(13,14,16)] flex flex-col justify-between py-4 pb-8 px-4"
                        >
                          {/* <h2 className="md:text-xl text-sm text-slate-700">
            {groupTitle}
          </h2> */}

                          <div className="flex justify-between items-center">
                            <p className="text-[14px]">
                              {interval.days === 0
                                ? "today"
                                : `${interval.days}d`}
                            </p>

                            <Link
                              href={`/review?date=${groupTitle}`}
                              className="text-[14px] text-slate-600"
                            >
                              {day} {groupTitle}
                              {/* {groupTitle
                                ?.split("/")
                                .map((x, i) => (i === 0 ? parseInt(x) + 1 : x))
                                ?.join("/")} */}
                            </Link>
                          </div>

                          <TotalReviews date={groupTitle} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
};
