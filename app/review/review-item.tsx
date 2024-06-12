import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

export const ReviewItem = () => {
  const searchParams = useSearchParams();

  const reviewId = searchParams.get("input") || "";
  const lang = searchParams.get("lang") || "";
  const date = searchParams.get("date") || "";

  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant: "discovered" });

  const filteredGroups = date
    ? groups?.filter((group) =>
        group?.items?.find((item: any) => item?.date === date)
      )
    : reviewId && lang
      ? groups?.filter((group) =>
          group?.items?.find((item: any) => {
            return (
              [item?.hanzi, item?.input]?.includes(reviewId) &&
              item?.lang === lang
            );

            return true;
          })
        )
      : groups;

  const groupItems = filteredGroups
    ?.map((group) => group.items)
    ?.flat()
    ?.filter((item) => {
      if (lang) {
        return JSON.stringify(item?.lang)?.includes(lang);
      }

      return true;
    });

  const totalItems = groupItems?.length || 0;

  const totalLangs = [...new Set(groupItems?.map((x) => x.lang))].filter(
    Boolean
  );

  if (!lang && totalLangs?.length > 0) {
    return (
      <section className="w-full px-4 md:px-12 md:my-4">
        <div className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 text-center justify-around items-center md:gap-16 gap-8 md:p-16 p-4 my-8">
          {totalLangs?.map((lang) => {
            return (
              <Link
                href={`/review?date=${date}&lang=${lang}`}
                className="hover:text-white transition text-gray-400 font-light text-4xl"
                key={lang}
              >
                {lang}
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 md:px-12 md:my-4">
      <h1>Total: {totalItems}</h1>
      <div className="">
        <code>
          <pre>{JSON.stringify(groupItems, null, 2)}</pre>
        </code>
      </div>
    </section>
  );
};
