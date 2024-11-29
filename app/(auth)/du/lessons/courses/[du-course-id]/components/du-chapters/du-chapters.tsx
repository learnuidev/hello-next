import { useGetDuParams } from "@/app/(auth)/du/hooks/use-get-du-params";
import { useListChapters } from "../../hooks/use-list-chapters";
import Link from "next/link";

export const DuChapters = () => {
  const { courseId } = useGetDuParams();

  const { data } = useListChapters({
    courseId,
    cookie: `oHAI2NVPZgiAz%2F%2FR4YbLaUgYCpCxgIuwHUSADEqYngzUXQeBlLaUBAvozrtvHy8vbDy9v0dNJcHOa5FMPKwC6xmxLn3PtZRz6OHGzY7On0eiGL2t0rsJ2nDeYiiwyqzJdLRj18Xf0nqrDtiWXxQKh%2BHquYx49VE8WAtHH3GR1q3dd7idL2PFiYU384VoqqrJ8PtaVtXnkQg2i1W%2BQJ9QdbvPCSq%2BhdqhTI21teAtRZUSeIE9FmDBFPsWJiL7Q%2FAXvOeC4Lj9PYKF2lWZ3IwVnluL0UYuhVujxlhWwOTnylx1tcr9Q%2BTEvYNiziVaeyJbSO7DNLsXrkM2Ui53D1NppsTaLXv%2Bi8We71NmnvCz5HseHB%2BEPLc%2BEMYRpO02siEFKW18g7e1%2B1YyAJ0L7uWiYSHsfsj2jdm13TW1Y6XIC3JnHebFxBSGWozHZ3FUrtR%2BgpNtj37N5fIf8My%2B8DASmen8kacwr8VJURBZTP3TDdaLBGi7YAVbLGIXhAySZhK3L%2BQSSXWUxgVf6cM0ZJcAYVTZpgsDSnKnvFhD0PKGVoyL6GDF%2BAG5oH2Dmdu%2BDEEYV%2FPy7u01JODCvQxMIVvFJJ%2Bfq5go0YMU%2BA0%3D--5wP9B4t69qnaAiEB--CcfIMirI1Ix1oPBxDhXIQQ%3D%3D`,
  });
  return (
    <div>
      <h2>Chapters</h2>
      <div className="space-y-12">
        {data?.lessons?.map((lesson) => {
          return (
            <Link
              key={JSON.stringify(lesson)}
              href={`/du/lessons/${lesson?.id}`}
            >
              <code>
                <pre>{JSON.stringify(lesson, null, 4)}</pre>
              </code>
            </Link>
          );
        })}
      </div>
      <code>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </code>{" "}
    </div>
  );
};
