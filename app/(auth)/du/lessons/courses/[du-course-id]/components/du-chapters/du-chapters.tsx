/* eslint-disable @next/next/no-img-element */
import { useGetDuParams } from "@/app/(auth)/du/hooks/use-get-du-params";
import { useListChapters } from "../../hooks/use-list-chapters";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Icons } from "@/components/ui/icons.v2";
import { HoverEffect } from "@/components/hover-effect";

export const DuChapters = () => {
  const { courseId, cookie } = useGetDuParams();

  const { data } = useListChapters({
    courseId,
    cookie,
  });

  const lesson = data?.lessons?.[0];

  const course = lesson?.course;

  return (
    <div>
      <div>
        <Link href="/du"> Stories </Link> / Story: {course?.title}
      </div>
      <div className="mt-12 mb-4">
        <p className="uppercase mt-8 font-bold text-gray-400">
          {course?.levels?.join(", ")}
        </p>
        <h1 className="text-2xl font-bold">{course?.title}</h1>
      </div>
      {/* <button className="text-sm space-x-2 border-[1px] rounded-2xl px-2 py-1">
        <Icons.bookmark />

        <span>Save Story</span>
      </button> */}
      <div className="mt-16 grid gap-12 items-start grid-cols-12">
        <img
          className="col-span-6"
          src={course?.large_image_url}
          alt={course?.title}
        />
        <div className="col-span-5">
          <p className="text-xl text-gray-300 font-extralight">
            {course?.description}
          </p>

          <div className="space-x-8 mt-16">
            <Link
              href={`/du/${lesson?.path}${(lesson?.path?.includes("?") ? "&" : "?") + `courseId=${courseId}`}`}
              className="space-x-2 border-[1px] rounded-full px-4 py-2"
            >
              <Icons.glassesRound />

              <span>Start Reading</span>
            </Link>

            <button className="space-x-2 border-[1px] rounded-full px-4 py-[5.5px]">
              <Icons.bookmark />

              <span>Favourite</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12">
        <HoverEffect
          className="lg:grid-cols-4"
          items={
            data?.lessons?.map((lesson, idx) => {
              return {
                title: `Chapter ${idx + 1}`,
                description: `Start Reading`,
                link: `/du/${lesson?.path}${(lesson?.path?.includes("?") ? "&" : "?") + `courseId=${courseId}`}`,
              };
            }) || []
          }
        />
      </div>
    </div>
  );
};
