"use client";

import { useListSeriesQuery } from "@/domain/content-v2/use-list-series-query";
import { TopicType } from "@/domain/topic/topic.types";
import { ContentCard } from "./content-card/content-card";
import { ContentListGrid } from "./content-list-grid/content-list-grid";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { motion } from "framer-motion";

interface SeriesListProps {
  activeTopic?: TopicType | null;
}

export function SeriesList({ activeTopic }: SeriesListProps) {
  const { data, isLoading } = useListSeriesQuery({
    topicType: activeTopic || undefined,
    limit: 10,
  });

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  if (!data || data.items.length === 0) {
    return <Nothing message="No series found" icon={Icons.content} />;
  }

  return (
    <section>
      <ContentListGrid>
        {data.items.map((series, index) => (
          <motion.div
            key={series.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ContentCard
              id={series.id}
              title={series.title}
              imageUrl={series.backgroundImageUrl}
              subtitle={series.source.title}
              stats={series.stats}
            />
          </motion.div>
        ))}
      </ContentListGrid>
    </section>
  );
}
