"use client";

import { useListContentsQuery } from "@/domain/content-v2/use-list-contents-query";
import { TopicType } from "@/domain/topic/topic.types";
import { ContentCard } from "./content-card/content-card";
import { ContentListGrid } from "./content-list-grid/content-list-grid";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";

interface ContentListProps {
  activeTopic?: TopicType | null;
}

export function ContentList({ activeTopic }: ContentListProps) {
  const { data, isLoading } = useListContentsQuery({
    topicType: activeTopic || undefined,
    limit: 10,
  });

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  if (!data || data.items.length === 0) {
    return <Nothing message="No content found" icon={Icons.content} />;
  }

  return (
    <section>
      <ContentListGrid>
        {data.items.map((content) => (
          <ContentCard
            key={content.id}
            id={content.id}
            title={content.title}
            imageUrl={content.thumbnailUrl}
            stats={content.stats}
          />
        ))}
      </ContentListGrid>
    </section>
  );
}
