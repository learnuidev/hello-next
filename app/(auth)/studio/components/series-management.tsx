"use client";

import { useState } from "react";
import Link from "next/link";
import { useListSeriesQuery } from "@/domain/content-v2/use-list-series-query";
import { useAddSeriesMutation } from "@/domain/content-v2/use-add-series-mutation";
import { useUpdateSeriesMutation } from "@/domain/content-v2/use-update-series-mutation";
import { useListSourcesQuery } from "@/domain/content-v2/use-list-sources-query";
import { TopicType } from "@/domain/topic/topic.types";
import { Series } from "@/domain/content-v2/series.types";
import { Button } from "@/components/ui/button";
import { ContentListGrid } from "@/components/new-home-page/components/content-list-grid/content-list-grid";
import { ContentCard } from "@/components/new-home-page/components/content-card/content-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/ui/icons.v2";
import { toast } from "sonner";
import { topicsList } from "@/domain/topic/topic.constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const TOPIC_TYPES: { value: TopicType; label: string }[] = [
  { value: "recommendation", label: "推荐" },
  { value: "storytelling", label: "故事" },
  { value: "news", label: "新闻" },
  { value: "chinese-classics", label: "经典" },
  { value: "history", label: "历史" },
  { value: "technology", label: "科技" },
  { value: "science", label: "科学" },
  { value: "lifestyle", label: "生活" },
  { value: "travel", label: "旅行" },
  { value: "music", label: "音乐" },
  { value: "personal-growth", label: "成长" },
  { value: "business", label: "商业" },
  { value: "politics", label: "政治" },
  { value: "innovation", label: "创新" },
  { value: "kids", label: "儿童" },
  { value: "sports", label: "运动" },
];

const defaultPic =
  "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png";

interface FormData {
  title: string;
  topicType: TopicType | "";
  sourceId: string;
  backgroundImageAssetId: string;
}

export function SeriesManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    topicType: "",
    sourceId: "",
    backgroundImageAssetId: "",
  });
  const [activeTopic, setActiveTopic] = useState<TopicType | null>(null);

  const {
    data: seriesData,
    isLoading,
    refetch,
  } = useListSeriesQuery({
    topicType: activeTopic || undefined,
    limit: 50,
    direction: "desc",
  });

  const { data: sourcesData } = useListSourcesQuery({
    filter: "me",
    limit: 100,
  });

  const addSeriesMutation = useAddSeriesMutation();

  const updateSeriesMutation = useUpdateSeriesMutation();

  const handleAddSeries = async () => {
    if (!formData.title || !formData.topicType || !formData.sourceId) {
      toast.error("Please fill in all required fields");
      return;
    }

    addSeriesMutation.mutate(
      {
        title: formData.title,
        topicType: formData.topicType as TopicType,
        sourceId: formData.sourceId,
        backgroundImageAssetId: formData.backgroundImageAssetId || "default",
      },
      {
        onSuccess: () => {
          toast.success("Series created successfully");
          setIsAddDialogOpen(false);
          setFormData({
            title: "",
            topicType: "",
            sourceId: "",
            backgroundImageAssetId: "",
          });
          refetch();
        },
        onError: () => {
          toast.error("Failed to create series");
        },
      },
    );
  };

  const handleEditSeries = async () => {
    if (
      !selectedSeries ||
      !formData.title ||
      !formData.topicType ||
      !formData.sourceId
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateSeriesMutation.mutate(
      {
        id: selectedSeries.id,
        title: formData.title,
        topicType: formData.topicType as TopicType,
        sourceId: formData.sourceId,
        backgroundImageAssetId: formData.backgroundImageAssetId,
      },
      {
        onSuccess: () => {
          toast.success("Series updated successfully");
          setIsEditDialogOpen(false);
          setSelectedSeries(null);
          refetch();
        },
        onError: () => {
          toast.error("Failed to update series");
        },
      },
    );
  };

  const openEditDialog = (series: Series) => {
    setSelectedSeries(series);
    setFormData({
      title: series.title,
      topicType: series.topicType,
      sourceId: series.sourceId,
      backgroundImageAssetId: series.backgroundImageAssetId || "",
    });
    setIsEditDialogOpen(true);
  };

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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>编辑系列</DialogTitle>
            <DialogDescription>更新系列信息</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                placeholder="Enter series title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-topicType">Topic Type *</Label>
              <Select
                value={formData.topicType}
                onValueChange={(value) =>
                  setFormData({ ...formData, topicType: value as TopicType })
                }
              >
                <SelectTrigger id="edit-topicType">
                  <SelectValue placeholder="Select a topic type" />
                </SelectTrigger>
                <SelectContent>
                  {TOPIC_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-source">Source *</Label>
              <Select
                value={formData.sourceId}
                onValueChange={(value) =>
                  setFormData({ ...formData, sourceId: value })
                }
              >
                <SelectTrigger id="edit-source">
                  <SelectValue placeholder="Select a source" />
                </SelectTrigger>
                <SelectContent>
                  {sourcesData?.items.map((source) => (
                    <SelectItem key={source.id} value={source.id}>
                      {source.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              取消
            </Button>
            <Button
              onClick={handleEditSeries}
              disabled={updateSeriesMutation.isPending}
            >
              {updateSeriesMutation.isPending ? "更新中..." : "更新系列"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
