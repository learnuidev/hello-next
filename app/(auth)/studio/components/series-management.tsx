"use client";

import { useState } from "react";
import Link from "next/link";
import { useListSeriesQuery } from "@/domain/content-v2/use-list-series-query";
import { TopicType } from "@/domain/topic/topic.types";
import { Button } from "@/components/ui/button";
import { ContentListGrid } from "@/components/new-home-page/components/content-list-grid/content-list-grid";
import { ContentCard } from "@/components/new-home-page/components/content-card/content-card";
import { Icons } from "@/components/ui/icons.v2";
import { topicsList } from "@/domain/topic/topic.constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const defaultPic =
  "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png";

export function SeriesManagement() {
  const [activeTopic, setActiveTopic] = useState<TopicType | null>(null);

  const { data: seriesData, isLoading } = useListSeriesQuery({
    topicType: activeTopic || undefined,
    limit: 50,
    direction: "desc",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const series = seriesData?.items || [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">系列</h2>
          <p className="text-muted-foreground">管理您的内容系列</p>
        </div>

        <Link href="/studio/create-series">
          <Button className="gap-2">
            <Icons.plusIcon className="h-4 w-4" />
            添加系列
          </Button>
        </Link>
      </div>

      <section className="flex gap-12 overflow-x-auto flex-nowrap mb-8">
        {topicsList.map((topic, index) => {
          const isActive = activeTopic === topic.type;
          return (
            <motion.div
              key={topic.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => {
                  setActiveTopic(topic.type);
                }}
                className={cn(
                  `pb-2 rounded-none hover:text-rose-500 whitespace-nowrap transition-all relative`,
                  isActive ? "text-rose-500" : "text-gray-600",
                )}
              >
                {topic.title}
                {isActive && (
                  <motion.div
                    layoutId="activeTopicStudio"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </motion.div>
          );
        })}
      </section>

      {series.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Icons.contentSolid className="h-16 w-16 text-muted-foreground opacity-50" />
          <div className="mt-4">
            <h3 className="text-lg font-semibold">暂无系列</h3>
            <p className="text-muted-foreground">创建您的第一个系列以开始</p>
          </div>
          <Link href="/studio/create-series">
            <Button className="gap-2 mt-4">
              <Icons.plusIcon className="h-4 w-4" />
              创建系列
            </Button>
          </Link>
        </div>
      ) : (
        <ContentListGrid>
          {series.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/studio/series/${item.id}`}>
                <ContentCard
                  id={item.id}
                  title={item.title}
                  imageUrl={
                    item.backgroundImage ||
                    item.backgroundImageAssetId ||
                    defaultPic
                  }
                  subtitle={item.source.title}
                  stats={item.stats}
                />
              </Link>
            </motion.div>
          ))}
        </ContentListGrid>
      )}
    </div>
  );
}
