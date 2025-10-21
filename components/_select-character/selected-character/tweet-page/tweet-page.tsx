import { useGetContentQuery } from "@/domain/content/content.queries";

export function TweetPage({ contentId }: { contentId: string }) {
  const { data } = useGetContentQuery({ contentId });
  return (
    <div>
      <h1>Tweet</h1>
      <div>
        <code>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </code>
      </div>
    </div>
  );
}
