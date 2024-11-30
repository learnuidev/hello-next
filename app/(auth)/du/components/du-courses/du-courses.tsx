/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useListTopLessons } from "../../hooks/use-list-top-lessons";
import { useGetDuParams } from "../../hooks/use-get-du-params";
import { useDuStore } from "../../hooks/use-du-store";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";

export const DuCourses = () => {
  const { cookie } = useGetDuParams();
  const levels = useDuStore((state) => state.levels);
  const { data, isLoading } = useListTopLessons({ cookie, levels });

  const duCourses = data?.sections?.filter(
    (section) => section?.item_type === "course"
  );

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }
  return (
    <div className="space-y-12">
      {data?.sections?.map((section) => {
        return (
          <div key={JSON.stringify(section)}>
            <h2 className="text-2xl font-semibold text-gray-300">
              {" "}
              {section?.section_name}
            </h2>

            <div className="space-y-12 mt-4 columns-1 sm:columns-2 lg:columns-5 gap-4 gap-y-4">
              {section?.items?.map((item) => {
                return (
                  <Link
                    href={
                      `/du/${item?.path}`
                      // section?.display === "lesson"
                      //   ? `/du/lessons/${item?.id}`
                      //   : `/du/${item?.path}`
                    }
                    key={JSON.stringify(item)}
                    className="block"
                  >
                    <img
                      className="object-cover rounded-xl w-full"
                      src={item?.large_image_url}
                      alt={item?.title}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
      {/* <code>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </code>{" "} */}
    </div>
  );
};
