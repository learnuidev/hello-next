import { useSearchParams } from "next/navigation";
import { useGetDuParams } from "../../../hooks/use-get-du-params";
import { useListTopLessons } from "../../../hooks/use-list-top-lessons";
import { useGetChapterDetails } from "../hooks/use-get-chapter-details";
import Link from "next/link";

export const DuLessonView = () => {
  const { chapterId, cookie } = useGetDuParams();

  const { data: courses } = useListTopLessons({ cookie });

  const searchParams = useSearchParams();

  const courseId = searchParams?.get("courseId") || "";

  const { data } = useGetChapterDetails({
    chapterId,
    courseId,
    cookie: `oHAI2NVPZgiAz%2F%2FR4YbLaUgYCpCxgIuwHUSADEqYngzUXQeBlLaUBAvozrtvHy8vbDy9v0dNJcHOa5FMPKwC6xmxLn3PtZRz6OHGzY7On0eiGL2t0rsJ2nDeYiiwyqzJdLRj18Xf0nqrDtiWXxQKh%2BHquYx49VE8WAtHH3GR1q3dd7idL2PFiYU384VoqqrJ8PtaVtXnkQg2i1W%2BQJ9QdbvPCSq%2BhdqhTI21teAtRZUSeIE9FmDBFPsWJiL7Q%2FAXvOeC4Lj9PYKF2lWZ3IwVnluL0UYuhVujxlhWwOTnylx1tcr9Q%2BTEvYNiziVaeyJbSO7DNLsXrkM2Ui53D1NppsTaLXv%2Bi8We71NmnvCz5HseHB%2BEPLc%2BEMYRpO02siEFKW18g7e1%2B1YyAJ0L7uWiYSHsfsj2jdm13TW1Y6XIC3JnHebFxBSGWozHZ3FUrtR%2BgpNtj37N5fIf8My%2B8DASmen8kacwr8VJURBZTP3TDdaLBGi7YAVbLGIXhAySZhK3L%2BQSSXWUxgVf6cM0ZJcAYVTZpgsDSnKnvFhD0PKGVoyL6GDF%2BAG5oH2Dmdu%2BDEEYV%2FPy7u01JODCvQxMIVvFJJ%2Bfq5go0YMU%2BA0%3D--5wP9B4t69qnaAiEB--CcfIMirI1Ix1oPBxDhXIQQ%3D%3D`,
  });

  // const lesson = data?.lessons?.[0];

  const course = data?.course;

  return (
    <div>
      <div>
        <Link href="/du"> Stories </Link> /{" "}
        <Link
          href={
            `/du/${course?.path}`
            // section?.display === "lesson"
            //   ? `/du/lessons/${item?.id}`
            //   : `/du/${item?.path}`
          }
        >
          Story: {course?.title}
        </Link>{" "}
        / <span>{chapterId}</span>
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
      {/* <div className="mt-16 grid gap-12 items-start grid-cols-12">
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
      </div> */}

      {/* <div className="mx-auto mt-12">
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
      </div> */}

      <section>
        <code>
          <pre>
            {/* {JSON.stringify(selectedItem, null, 4)} */}

            {JSON.stringify(data, null, 4)}
          </pre>
        </code>
      </section>
    </div>
  );

  return (
    <div>
      <h1>{chapterId}</h1>

      <section>
        <code>
          <pre>
            {/* {JSON.stringify(selectedItem, null, 4)} */}

            {JSON.stringify(data, null, 4)}
          </pre>
        </code>
      </section>
    </div>
  );
};
