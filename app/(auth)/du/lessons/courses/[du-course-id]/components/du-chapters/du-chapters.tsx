/* eslint-disable @next/next/no-img-element */
import { useFavouriteCourseMutation } from "@/app/(auth)/du/hooks/use-favourite-course-mutation";
import { useGetDuParams } from "@/app/(auth)/du/hooks/use-get-du-params";
import { useListSavedLessonsQuery } from "@/app/(auth)/du/hooks/use-list-saved-lessons-query";
import { useListStudiedLessonsQuery } from "@/app/(auth)/du/hooks/use-list-studied-lessons-query";
import { useUnfavouriteCourseMutation } from "@/app/(auth)/du/hooks/use-unfavourite-course-mutation";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { formatPercentage } from "@/app/profile/utils/format-percentage";
import { HoverEffect } from "@/components/hover-effect";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useListChapters } from "../../hooks/use-list-chapters";

function useIsSaved(courseId: number) {
  const { cookie } = useGetDuParams();

  const { data: savedLessons } = useListSavedLessonsQuery({
    cookie,
  });

  return savedLessons?.lessons?.find(
    (lesson) => lesson?.document?.id === courseId
  );
}

function useGetProgress(courseId: string) {
  const { cookie } = useGetDuParams();

  const { data } = useListChapters({
    courseId,
    cookie,
  });

  const { data: studiedLessons } = useListStudiedLessonsQuery({
    cookie,
  });

  const lesson = data?.lessons?.[0];

  const course = lesson?.course;

  const studiedCourseLessons = studiedLessons?.lessons?.filter(
    (lesson) => lesson?.course?.id === course?.id
  );

  return formatPercentage(
    (studiedCourseLessons?.length || 0) / ((data?.lessons || [])?.length || 1)
  );
}

export const DuChapters = () => {
  const { courseId, cookie } = useGetDuParams();

  const { data } = useListChapters({
    courseId,
    cookie,
  });

  const progress = useGetProgress(courseId);

  const favouriteCourseMutation = useFavouriteCourseMutation();
  const unfavouriteCourseMutation = useUnfavouriteCourseMutation();

  const lesson = data?.lessons?.[0];

  const course = lesson?.course;

  const isSaved = useIsSaved(course?.id || 0);

  // console.log("COURSE", course);

  if (!course) {
    return <LottieLoadingAnimation />;
  }

  return (
    <div className="w-full">
      <div className="text-gray-500">
        <Link href="/du" className="hover:text-white">
          {" "}
          Courses{" "}
        </Link>{" "}
        / Series: {course?.title}
      </div>
      <div className="mt-12 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase font-bold text-gray-400">
              {course?.levels?.join(", ")}
            </p>
            <h1 className="text-2xl font-bold">{course?.title}</h1>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl">{progress}</p>

            <p className="text-xs font-extralight text-gray-400 uppercase">
              progress
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-12 items-start grid-cols-12 w-full">
        <div className={cn("sm:col-span-6 col-span-12 pr-4")}>
          <img
            className={cn("w-full object-cover rounded-xl")}
            src={course?.large_image_url}
            alt={course?.title}
          />
        </div>
        <div className="sm:col-span-5 col-span-12">
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

            <button
              disabled={true}
              onClick={() => {
                if (isSaved) {
                  unfavouriteCourseMutation.mutateAsync({
                    courseId: `${course.id}`,
                    cookie,
                  });
                } else {
                  favouriteCourseMutation.mutateAsync({
                    courseId: `${course.id}`,
                    cookie,
                  });
                }
              }}
              className="space-x-2 border-[1px] rounded-full px-4 py-[5.5px]"
            >
              {unfavouriteCourseMutation?.isLoading ||
              favouriteCourseMutation?.isLoading ? (
                <Icons.spinner spinPulse />
              ) : (
                <>
                  {isSaved ? <Icons.bookmarkSolid /> : <Icons.bookmark />}

                  <span>{!isSaved ? "Favourite" : "Favourited"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <HoverEffect
          className="lg:grid-cols-4 w-full"
          items={
            data?.lessons?.map((lesson, idx) => {
              return {
                // title: `Chapter ${idx + 1}`,
                icon:
                  lesson?.status === "not_started"
                    ? () => <Icons.questionMark className="text-2xl" />
                    : () => (
                        <Icons.badgeCheck className="text-rose-400 text-2xl" />
                      ),
                title:
                  lesson?.title !== course?.title
                    ? `${idx + 1}. ${lesson?.title}`
                    : `Chapter ${idx + 1}`,
                description: lesson?.synopsis || `Start Reading`,
                link: `/du/${lesson?.path}${(lesson?.path?.includes("?") ? "&" : "?") + `courseId=${courseId}`}`,
              };
            }) || []
          }
        />
      </div>
    </div>
  );
};
