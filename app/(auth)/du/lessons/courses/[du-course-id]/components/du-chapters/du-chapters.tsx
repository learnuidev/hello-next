import { useGetDuParams } from "@/app/(auth)/du/hooks/use-get-du-params";
import { useListChapters } from "../../hooks/use-list-chapters";

export const DuChapters = () => {
  const { courseId } = useGetDuParams();

  const { data } = useListChapters(courseId);
  return (
    <div>
      <h2>Chapters</h2>
      <code>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </code>{" "}
    </div>
  );
};
