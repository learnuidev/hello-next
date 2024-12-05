import { useSearchQueryStore } from "@/components/search/state";
import { useListLessons } from "../../hooks/use-list-lessons";
import { useGetDuParams } from "../../hooks/use-get-du-params";
import { useDuStore } from "../../hooks/use-du-store";
import { Nothing } from "@/app/nmm/nothing";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import Link from "next/link";
import { getDuCategory } from "../../constants/du-categories";
import { useListSavedLessonsQuery } from "../../hooks/use-list-saved-lessons-query";

export const DuFavouriteList = () => {
  const query = useSearchQueryStore((state) => state.query2);
  const levels = useDuStore((state: any) => state.levels);
  const { cookie, category } = useGetDuParams();

  const { data, isLoading } = useListSavedLessonsQuery({
    cookie,
    levels,
  });

  const duCategory = getDuCategory(category);

  // const { data, isLoading } = useListLessons({ query, cookie, levels });
  return (
    <div className="">
      {isLoading ? (
        <div>
          <LottieLoadingAnimation />
        </div>
      ) : !data?.lessons?.length ? (
        <Nothing
          message={"Nothing found. Please try searching for something else"}
        />
      ) : (
        <section className="">
          <h2 className="text-2xl font-semibold text-gray-300">
            Saved Lessons
          </h2>

          {/* <div>
            <code>
              <pre>{JSON.stringify(data, null, 4)}</pre>
            </code>
          </div> */}

          <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-10 gap-4 gap-y-4 lg:gap-8">
            {data?.lessons?.map((val) => {
              const item = val?.document;
              return (
                <div
                  key={JSON.stringify(item)}
                  className="block col-span-3 lg:col-span-2"
                >
                  <Link href={`/du/${item?.path}`} className="block">
                    <img
                      className="object-cover rounded-xl w-full"
                      src={item?.large_image_url}
                      alt={item?.title}
                    />
                  </Link>

                  <div>
                    <p className="mt-2 truncate">
                      {" "}
                      <span>{item?.title}</span>
                    </p>
                    <p className="font-light text-gray-400 text-sm capitalize">
                      {" "}
                      <span>{item?.levels?.[0] || item?.level}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div>
            <code>
              <pre>{JSON.stringify(data, null, 4)}</pre>
            </code>
          </div> */}
        </section>
      )}
    </div>
  );
};
