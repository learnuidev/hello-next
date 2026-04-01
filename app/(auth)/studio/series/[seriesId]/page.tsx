"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { useGetSeriesDetailsQuery } from "@/domain/content-v2/use-get-series-details-query";
import { useUpdateSeriesMutation } from "@/domain/content-v2/use-update-series-mutation";
import { ContentListGrid } from "@/components/new-home-page/components/content-list-grid/content-list-grid";
import { ContentCard } from "@/components/new-home-page/components/content-card/content-card";
import { toast } from "sonner";
import { SeriesForm } from "../../components/series-form";
import { BaseTabs } from "@/components/ui/base-tabs";

const defaultPic =
  "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png";

const tabs = [
  {
    label: "信息",
    value: "info" as const,
  },
  {
    label: "内容",
    value: "episodes" as const,
  },
];

export default function SeriesDetailsPage() {
  const params = useParams<{ seriesId: string }>();

  const seriesId = params.seriesId;
  const router = useRouter();
  const { data, isLoading, error, refetch } = useGetSeriesDetailsQuery({
    seriesId: params.seriesId,
  });

  console.log("ERROR", error);
  const updateSeriesMutation = useUpdateSeriesMutation();
  const [activeTab, setActiveTab] = useState<"info" | "episodes">("episodes");

  const getErrorMessage = (error: any) => {
    if (error?.message) {
      if (
        error.message.includes("404") ||
        error.message.includes("not found")
      ) {
        return "未找到该系列";
      }
      if (
        error.message.includes("403") ||
        error.message.includes("Access denied")
      ) {
        return "无权访问该系列";
      }
      return error.message;
    }
    return "无法加载系列详情";
  };

  const handleUpdateSeries = async (data: {
    title: string;
    topicType: string;
    sourceId: string;
    backgroundImageAssetId: string;
  }) => {
    try {
      await updateSeriesMutation.mutateAsync({
        id: params.seriesId,
        title: data.title,
        topicType: data.topicType as any,
        sourceId: data.sourceId,
        backgroundImageAssetId: data.backgroundImageAssetId,
      });
      toast.success("系列更新成功");
      refetch();
    } catch (error: any) {
      toast.error(error?.message || "更新系列失败");
      throw error;
    }
  };

  const handleAddEpisode = () => {
    router.push("/studio/new-content");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Icons.spinner className="h-8 w-8 animate-spin" />
        <p className="text-muted-foreground mt-4">加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto">
        <Icons.exlamationCircle className="h-20 w-20 text-rose-500 opacity-70" />
        <div className="mt-6">
          <h3 className="text-xl font-semibold">加载失败</h3>
          <p className="text-muted-foreground mt-2">{getErrorMessage(error)}</p>
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={() => refetch()} className="gap-2" variant="default">
            <Icons.refresh className="h-4 w-4" />
            重试
          </Button>
          <Button
            onClick={() => router.back()}
            className="gap-2"
            variant="outline"
          >
            <Icons.back className="h-4 w-4" />
            返回
          </Button>
        </div>
      </div>
    );
  }

  console.log("DATA", data);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <Icons.exlamationCircle className="h-16 w-16 text-muted-foreground opacity-50" />
        <div className="mt-4">
          <h3 className="text-lg font-semibold">数据未找到</h3>
          <p className="text-muted-foreground">无法获取系列信息</p>
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={() => refetch()} className="gap-2" variant="outline">
            <Icons.refresh className="h-4 w-4" />
            重试
          </Button>
          <Button
            onClick={() => router.back()}
            className="gap-2"
            variant="outline"
          >
            <Icons.back className="h-4 w-4" />
            返回
          </Button>
        </div>
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

      <div className="p-0">
        <div className="flex justify-between items-center">
          <BaseTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            layoutId="activeTab"
          />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <div className="max-w-4xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-2">编辑系列</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    更新系列的详细信息
                  </p>
                </div>
                <SeriesForm
                  mode="edit"
                  seriesId={series.id}
                  initialData={{
                    title: series.title,
                    description: "",
                    topicType: series.topicType,
                    sourceId: series.sourceId,
                    sourceName: series.source.title,
                    photoAssetId: series.backgroundImageAssetId || "",
                    photoUrl: series.backgroundImage || "",
                  }}
                  onSubmit={handleUpdateSeries}
                  onCancel={() => router.back()}
                  submitLabel="保存更改"
                />
              </div>
            </motion.div>
          )}

          {activeTab === "episodes" && (
            <motion.div
              key="episodes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">内容</h2>
                  <p className="text-muted-foreground">
                    {episodesList.length} 个内容项
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() =>
                      router.push(`/studio/series/${seriesId}/port-data`)
                    }
                    className="gap-2"
                    variant="outline"
                  >
                    <Icons.layerGroup className="h-4 w-4" />
                    从已有内容添加
                  </Button>
                  <Button
                    onClick={handleAddEpisode}
                    className="gap-2 bg-rose-500 hover:bg-rose-600"
                  >
                    <Icons.plusIcon className="h-4 w-4" />
                    添加内容
                  </Button>
                </div>
              </div>

              {episodesList.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center dark:bg-[rgb(11,12,13)] bg-gray-50 rounded-lg border border-gray-200 dark:border-gray-800">
                  <Icons.layerGroup className="h-16 w-16 text-muted-foreground opacity-50" />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">暂无内容</h3>
                    <p className="text-muted-foreground mb-4">
                      此系列还没有添加任何内容
                    </p>
                    <Button
                      onClick={handleAddEpisode}
                      className="gap-2 bg-rose-500 hover:bg-rose-600"
                    >
                      <Icons.plusIcon className="h-4 w-4" />
                      添加新内容
                    </Button>
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
