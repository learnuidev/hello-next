import { useGetContentQuery } from "@/domain/content/content.queries";
import { useContentItemParams } from "../../hooks/use-content-item-params";

export const AudioPlayer = () => {
  const { contentId } = useContentItemParams();
  const { data: content } = useGetContentQuery({ contentId });

  return (
    <div>
      <code>
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </code>
    </div>
  );
};
