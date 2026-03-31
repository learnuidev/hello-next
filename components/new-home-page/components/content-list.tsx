"use client";

import { useListContentsQuery } from "@/domain/content-v2/use-list-contents-query";
import { TopicType } from "@/domain/topic/topic.types";

interface ContentListProps {
  activeTopic?: TopicType | null;
}

export function ContentList({ activeTopic }: ContentListProps) {
  const { data, isLoading } = useListContentsQuery({
    topicType: activeTopic || undefined,
    limit: 10,
  });

  if (isLoading) {
    return (
      <section>
        <div className="text-center text-gray-500">Loading...</div>
      </section>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <section>
        <div className="text-center text-gray-500">No content found</div>
      </section>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.items.map((content) => (
          <div
            key={content.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              className="aspect-square bg-cover bg-center"
              style={{ backgroundImage: `url(${content.thumbnailUrl})` }}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">
                {content.title}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>★ {content.stats.averageRating}</span>
                <span>{content.stats.totalPlays} plays</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
