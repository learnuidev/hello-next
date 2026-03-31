"use client";

import { useState } from "react";
import { useListSeriesQuery } from "@/domain/content-v2/use-list-series-query";
import { useAddSeriesMutation } from "@/domain/content-v2/use-add-series-mutation";
import { useUpdateSeriesMutation } from "@/domain/content-v2/use-update-series-mutation";
import { useListSourcesQuery } from "@/domain/content-v2/use-list-sources-query";
import { TopicType } from "@/domain/topic/topic.types";
import { Series } from "@/domain/content-v2/series.types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { motion } from "framer-motion";
import { toast } from "sonner";

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

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
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

  const {
    data: seriesData,
    isLoading,
    refetch,
  } = useListSeriesQuery({
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Series Management</h2>
          <p className="text-muted-foreground">
            Create and manage your content series
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Icons.plusIcon className="h-4 w-4" />
              Add Series
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Series</DialogTitle>
              <DialogDescription>
                Create a new content series to organize your content
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter series title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topicType">Topic Type *</Label>
                <Select
                  value={formData.topicType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, topicType: value as TopicType })
                  }
                >
                  <SelectTrigger id="topicType">
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
                <Label htmlFor="source">Source *</Label>
                <Select
                  value={formData.sourceId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, sourceId: value })
                  }
                >
                  <SelectTrigger id="source">
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
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddSeries}
                disabled={addSeriesMutation.isPending}
              >
                {addSeriesMutation.isPending ? "Creating..." : "Create Series"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {series.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <Icons.contentSolid className="h-16 w-16 text-muted-foreground opacity-50" />
            <div>
              <h3 className="text-lg font-semibold">No series yet</h3>
              <p className="text-muted-foreground">
                Create your first series to get started
              </p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Icons.plusIcon className="h-4 w-4" />
              Create Series
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {series.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="truncate">{item.title}</CardTitle>
                      <CardDescription className="truncate">
                        {item.source.title}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(item)}
                    >
                      <Icons.edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icons.bookOpen className="h-4 w-4" />
                      <span className="capitalize">
                        {item.topicType.replace("-", " ")}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div className="text-center">
                        <div className="font-medium text-foreground">
                          {formatNumber(item.stats.totalCharacters)}
                        </div>
                        <div>字</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-foreground">
                          {formatNumber(item.stats.totalWords)}
                        </div>
                        <div>词</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-foreground">
                          {formatNumber(item.stats.totalSentences)}
                        </div>
                        <div>句</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icons.playCircle className="h-3 w-3" />
                      <span>{formatNumber(item.stats.totalPlays)} plays</span>
                      <span>•</span>
                      <span>{item.stats.averageRating.toFixed(1)} ⭐</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Series</DialogTitle>
            <DialogDescription>Update series information</DialogDescription>
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
              Cancel
            </Button>
            <Button
              onClick={handleEditSeries}
              disabled={updateSeriesMutation.isPending}
            >
              {updateSeriesMutation.isPending ? "Updating..." : "Update Series"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
