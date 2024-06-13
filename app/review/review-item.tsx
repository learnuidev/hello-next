import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useGetReviewState } from "./use-get-review-state";
import { Icons } from "@/components/ui/icons.v2";

export const ReviewItem = () => {
  const searchParams = useSearchParams();

  const { data: components } = useListCharactersQuery();

  const lang = searchParams.get("lang") || "";
  const date = searchParams.get("date") || "";

  const { totalLangs, groupItems, reviewCharactersKeys, reviewCharacters } =
    useGetReviewState({
      date,
    });

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
    <section className="w-full px-4 md:px-12 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Link href="/review">
            <Icons.xMark />
          </Link>
        </div>
        <h1 className="text-gray-400 text-2xl font-extralight">
          {reviewCharactersKeys?.length} items{" "}
        </h1>
      </div>

      <div className="space-y-4 mt-8">
        {reviewCharacters?.map((character: any) => {
          return (
            <div key={JSON.stringify(character)}>
              <h3 className="text-gray-300">{character?.input}</h3>
              <h4 className="text-gray-400 font-light">{character?.en}</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
};
