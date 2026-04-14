/* eslint-disable @next/next/no-img-element */
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import Link from "next/link";
import { useDuStore } from "../../hooks/use-du-store";
import { useGetDuParams } from "../../hooks/use-get-du-params";
import { useListTopLessons } from "../../hooks/use-list-top-lessons";
import { DuForYou } from "../du-for-you/du-for-you";

export const DuCourses = () => {
  const { cookie } = useGetDuParams();
  const levels = useDuStore((state) => state.levels);
  const { data, isLoading } = useListTopLessons({ cookie, levels });

  const duCourses = data?.sections?.filter(
    (section) => section?.item_type === "course",
  );

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  return (
    <div className="space-y-12">
      <DuForYou />
      {data?.sections?.map((section) => {
        return (
          <div key={JSON.stringify(section)}>
            <h2 className="text-2xl font-semibold text-gray-300">
              {" "}
              {section?.section_name}
            </h2>

            <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-10 gap-4 gap-y-4 lg:gap-8">
              {section?.items?.map((item) => {
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

                    <p className="mt-2 truncate">
                      {" "}
                      <span>{item?.title}</span>
                    </p>
                    <p className="font-light text-gray-400 text-sm capitalize">
                      {" "}
                      <span>{item?.levels?.[0] || item?.level}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
