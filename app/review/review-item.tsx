import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

export const ReviewItem = () => {
  const searchParams = useSearchParams();

  const { data: components } = useListCharactersQuery();

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
            return [item?.hanzi, item?.input]?.includes(reviewId);

            return true;
          })
        )
      : groups;

  const groupItems = filteredGroups
    ?.map((group) => group.items)
    ?.flat()
    ?.filter((item) => {
      if (lang && item?.lang) {
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

  const reviewCharactersKeys = groupItems
    ?.map((item) => item?.hanzi || item?.input)
    ?.filter((item) => {
      const comp = components?.find((c: any) => c?.hanzi === item);
      if (comp?.steps) {
        delete comp?.steps;
      }
      return comp;
    });

  const reviewCharacters = reviewCharactersKeys?.map((item) => {
    const comp = components?.find((c: any) => c?.hanzi === item);
    if (comp?.steps) {
      delete comp?.steps;
    }
    return comp;
  });

  return (
    <section className="w-full px-4 md:px-12 md:my-4">
      <h1>Total: {reviewCharactersKeys?.length}</h1>
      <div className="">
        <code>
          <pre>{JSON.stringify(reviewCharactersKeys, null, 2)}</pre>
        </code>
      </div>
    </section>
  );
};
