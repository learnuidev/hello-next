import { useSearchQueryStore } from "@/components/search/state";
import { useListLessons } from "../../hooks/use-list-lessons";
import { useGetDuParams } from "../../hooks/use-get-du-params";
import { useDuStore } from "../../hooks/use-du-store";
import { Nothing } from "@/app/nmm/nothing";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import Link from "next/link";

export const DuSearchResults = () => {
  const query = useSearchQueryStore((state) => state.query2);
  const levels = useDuStore((state: any) => state.levels);
  const { cookie } = useGetDuParams();

  const { data, isLoading } = useListLessons({ query, cookie, levels });
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
        <section className="my">
          <h2 className="text-2xl font-semibold text-gray-300">
            {" "}
            Search Results
          </h2>

          <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-4 gap-y-4 lg:gap-8">
            {data?.lessons?.map((item) => {
              return (
                <div key={JSON.stringify(item)} className="block col-span-3">
                  <Link
                    href={
                      `/du/${item?.path}`
                      // section?.display === "lesson"
                      //   ? `/du/lessons/${item?.id}`
                      //   : `/du/${item?.path}`
                    }
                    className="block"
                  >
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
                      <span>{item?.levels?.[0]}</span>
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
