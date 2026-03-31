"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { useGetSeriesDetailsQuery } from "@/domain/content-v2/use-get-series-details-query";
import { ContentListGrid } from "@/components/new-home-page/components/content-list-grid/content-list-grid";
import { ContentCard } from "@/components/new-home-page/components/content-card/content-card";
import { cn } from "@/lib/utils";

const defaultPic =
  "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png";

export default function SeriesDetailsPage({
  params,
}: {
  params: { seriesId: string };
}) {
  const router = useRouter();
  const { data, isLoading, error } = useGetSeriesDetailsQuery({
    seriesId: params.seriesId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <Icons.exlamationCircle className="h-16 w-16 text-muted-foreground opacity-50" />
        <div className="mt-4">
          <h3 className="text-lg font-semibold">加载失败</h3>
          <p className="text-muted-foreground">无法加载系列详情</p>
        </div>
        <Button
          onClick={() => router.back()}
          className="gap-2 mt-4"
          variant="outline"
        >
          <Icons.back className="h-4 w-4" />
          返回
        </Button>
      </div>
    );
  }

  const { series, episodes } = data;
  const episodesList = episodes || [];

  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <div className="flex items-center gap-4 mb-8 py-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-rose-500 transition-colors dark:text-gray-400 dark:hover:text-rose-500"
        >
          <Icons.back className="h-6 w-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">系列详情</h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">
            {series.title}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="dark:bg-[rgb(11,12,13)] bg-gray-50 rounded-lg border border-gray-200 dark:border-gray-800 p-6 flex gap-6"
        >
          <div className="flex-shrink-0">
            <div
              className="aspect-square w-40 rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  series.backgroundImage ||
                  series.backgroundImageAssetId ||
                  defaultPic
                })`,
              }}
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{series.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {series.source.title}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="dark:bg-[rgb(14,15,16)] bg-white rounded-lg p-3 border border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 uppercase font-medium">
                  总字符数
                </p>
                <p className="text-lg font-semibold">
                  {series.stats.totalCharacters.toLocaleString()}
                </p>
              </div>
              <div className="dark:bg-[rgb(14,15,16)] bg-white rounded-lg p-3 border border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 uppercase font-medium">
                  总词数
                </p>
                <p className="text-lg font-semibold">
                  {series.stats.totalWords.toLocaleString()}
                </p>
              </div>
              <div className="dark:bg-[rgb(14,15,16)] bg-white rounded-lg p-3 border border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 uppercase font-medium">
                  总句数
                </p>
                <p className="text-lg font-semibold">
                  {series.stats.totalSentences.toLocaleString()}
                </p>
              </div>
              <div className="dark:bg-[rgb(14,15,16)] bg-white rounded-lg p-3 border border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 uppercase font-medium">
                  平均评分
                </p>
                <p className="text-lg font-semibold">
                  {series.stats.averageRating.toFixed(1)}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="gap-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 dark:text-gray-400 dark:hover:text-rose-500 dark:hover:bg-rose-950/20"
                onClick={() => router.back()}
              >
                <Icons.back className="h-4 w-4" />
                返回
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">内容</h2>
              <p className="text-muted-foreground">
                {episodesList.length} 个内容项
              </p>
            </div>
          </div>

          {episodesList.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center dark:bg-[rgb(11,12,13)] bg-gray-50 rounded-lg border border-gray-200 dark:border-gray-800">
              <Icons.layerGroup className="h-16 w-16 text-muted-foreground opacity-50" />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">暂无内容</h3>
                <p className="text-muted-foreground">
                  此系列还没有添加任何内容
                </p>
              </div>
            </div>
          ) : (
            <ContentListGrid>
              {episodesList.map((item: any, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ContentCard
                    id={item.id}
                    title={item.title}
                    imageUrl={item.thumbnailUrl || defaultPic}
                    stats={item.stats}
                  />
                </motion.div>
              ))}
            </ContentListGrid>
          )}
        </motion.div>
      </div>
    </div>
  );
}
