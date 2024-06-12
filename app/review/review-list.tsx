import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import Link from "next/link";

export const ReviewList = () => {
  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant: "discovered" });

  const filteredGroups = groups;
  const groupTitles = filteredGroups?.map((group) => group.title);

  return (
    <section className="w-full px-4 md:px-12 md:my-4">
      <div className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 text-center justify-around items-center md:gap-16 gap-8 md:p-16 p-4 my-8 text-gray-400 font-light text-2xl">
        {groupTitles?.map((groupTitle) => {
          return (
            <Link
              href={`/review?date=${groupTitle}`}
              className="hover:text-white transition"
              key={groupTitle}
            >
              {groupTitle}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
