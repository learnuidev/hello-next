"use client";

import { useListContentsQuery } from "@/domain/content-v2/use-list-contents-query";
import { TopicType } from "@/domain/topic/topic.types";
import { ContentCard } from "./content-card/content-card";
import { ContentListGrid } from "./content-list-grid/content-list-grid";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { motion } from "framer-motion";

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
    return <Nothing message="未找到内容" icon={Icons.cat} />;
  }

  return (
    <section>
      <ContentListGrid>
        {data.items.map((content, index) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ContentCard
              id={content.id}
              title={content.title}
              imageUrl={content.thumbnailUrl}
              stats={content.stats}
            />
          </motion.div>
        ))}
      </ContentListGrid>
    </section>
  );
}
