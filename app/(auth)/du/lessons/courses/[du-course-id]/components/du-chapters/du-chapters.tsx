import { useGetDuParams } from "@/app/(auth)/du/hooks/use-get-du-params";
import { useListChapters } from "../../hooks/use-list-chapters";
import Link from "next/link";

export const DuChapters = () => {
  const { courseId, cookie } = useGetDuParams();

  const { data } = useListChapters({
    courseId,
    cookie,
  });
  return (
    <div>
      <h2>Chapters</h2>
      <div className="space-y-12">
        {data?.lessons?.map((lesson) => {
          return (
            <Link
              key={JSON.stringify(lesson)}
              // href={`/du/lessons/${lesson?.id}`}
              href={`/du/${lesson?.path}${(lesson?.path?.includes("?") ? "&" : "?") + `{?courseId=${courseId}`}`}
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
