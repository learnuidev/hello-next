import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { useSearchQueryStore } from "@/components/search/state";
import Link from "next/link";
import { getDuCategory } from "../../constants/du-categories";
import { useDuStore } from "../../hooks/use-du-store";
import { useGetDuParams } from "../../hooks/use-get-du-params";
import { useListLessons } from "../../hooks/use-list-lessons";

export const DuCategoryList = () => {
  const query = useSearchQueryStore((state) => state.querySync);
  const levels = useDuStore((state: any) => state.levels);
  const { cookie, category } = useGetDuParams();

  const { data, isLoading } = useListLessons({
    cookie,
    category,
    levels,
  });

  const duCategory = getDuCategory(category);

  const filteredLessons = data?.lessons?.filter((item) => {
    if (query) {
      return JSON.stringify(item)
        ?.toLowerCase()
        ?.includes(query?.toLowerCase());
    }
    return true;
  });

  return (
    <div className="">
      {isLoading ? (
        <div>
          <LottieLoadingAnimation />
        </div>
      ) : !filteredLessons?.length ? (
        <Nothing
          message={"Nothing found. Please try searching for something else"}
        />
      ) : (
        <section className="">
          <h2 className="text-2xl font-semibold text-gray-300 mb-8 sm:mb-16">
            Category: {duCategory?.title}
          </h2>

          <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-10 gap-4 gap-y-4 lg:gap-8">
            {filteredLessons?.map((item) => {
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
        </section>
      )}
    </div>
  );
};
