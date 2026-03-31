"use client";

import { useState } from "react";
import { useListContentsQuery } from "@/domain/content-v2/use-list-contents-query";
import { useListSeriesQuery } from "@/domain/content-v2/use-list-series-query";
import { ContentV2, ContentFormat } from "@/domain/content-v2/content-v2.types";
import { TopicType } from "@/domain/topic/topic.types";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons.v2";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CONTENT_FORMATS = [
  { value: ContentFormat.YOUTUBE, label: "YouTube" },
  { value: ContentFormat.AUDIO, label: "Audio" },
  { value: ContentFormat.TEXT, label: "Text" },
  { value: ContentFormat.WEBSITE, label: "Website" },
];

interface AddContentFormData {
  title: string;
  format: ContentFormat | "";
  mediaUrl: string;
  seriesId: string;
}

interface ContentWithSeries extends ContentV2 {
  seriesId?: string;
  seriesTitle?: string;
  transcriptionStatus?: "pending" | "processing" | "completed" | "failed";
  transcriptionProgress?: number;
}

const MOCK_CONTENT: ContentWithSeries[] = [
  {
    id: "content-1",
    topicType: "chinese-classics",
    title: "中国传统文化概述",
    format: ContentFormat.AUDIO,
    mediaUrl: "https://example.com/audio1.mp3",
    thumbnailUrl:
      "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png",
    seriesId: "series-1",
    seriesTitle: "中文播客精选",
    transcriptionStatus: "completed",
    transcriptionProgress: 100,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
    stats: {
      averageRating: 4.5,
      totalPlays: 1500,
      totalStars: 120,
      totalCharacters: 850,
      totalSentences: 42,
      totalWords: 120,
    },
  },
  {
    id: "content-2",
    topicType: "technology",
    title: "人工智能在医疗领域的应用",
    format: ContentFormat.YOUTUBE,
    mediaUrl: "https://youtube.com/watch?v=example1",
    thumbnailUrl:
      "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png",
    seriesId: "series-1",
    seriesTitle: "中文播客精选",
    transcriptionStatus: "processing",
    transcriptionProgress: 65,
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 172800000,
    stats: {
      averageRating: 4.2,
      totalPlays: 980,
      totalStars: 85,
      totalCharacters: 620,
      totalSentences: 31,
      totalWords: 95,
    },
  },
  {
    id: "content-3",
    topicType: "lifestyle",
    title: "中国茶文化",
    format: ContentFormat.YOUTUBE,
    mediaUrl: "https://youtube.com/watch?v=example2",
    thumbnailUrl:
      "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png",
    seriesId: "series-2",
    seriesTitle: "中国古代故事",
    transcriptionStatus: "pending",
    transcriptionProgress: 0,
    createdAt: Date.now() - 259200000,
    updatedAt: Date.now() - 259200000,
    stats: {
      averageRating: 4.8,
      totalPlays: 2100,
      totalStars: 180,
      totalCharacters: 720,
      totalSentences: 36,
      totalWords: 105,
    },
  },
  {
    id: "content-4",
    topicType: "news",
    title: "2024年经济趋势分析",
    format: ContentFormat.AUDIO,
    mediaUrl: "https://example.com/audio2.mp3",
    thumbnailUrl:
      "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png",
    seriesId: "series-3",
    seriesTitle: "科技新闻每日",
    transcriptionStatus: "failed",
    transcriptionProgress: 25,
    createdAt: Date.now() - 345600000,
    updatedAt: Date.now() - 345600000,
    stats: {
      averageRating: 4.0,
      totalPlays: 650,
      totalStars: 45,
      totalCharacters: 480,
      totalSentences: 24,
      totalWords: 78,
    },
  },
];

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

function getTranscriptionBadge(status: string, progress: number) {
  switch (status) {
    case "completed":
      return (
        <Badge variant="default" className="bg-green-500">
          Completed
        </Badge>
      );
    case "processing":
      return (
        <Badge variant="secondary" className="bg-yellow-500 text-white">
          Processing {progress}%
        </Badge>
      );
    case "pending":
      return <Badge variant="outline">Pending</Badge>;
    case "failed":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}

export function ContentManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [formData, setFormData] = useState<AddContentFormData>({
    title: "",
    format: "",
    mediaUrl: "",
    seriesId: "",
  });

  const {
    data: contentsData,
    isLoading,
    refetch,
  } = useListContentsQuery({
    limit: 50,
    direction: "desc",
  });

  const { data: seriesData } = useListSeriesQuery({
    limit: 100,
    direction: "desc",
  });

  const handleAddContent = async () => {
    if (
      !formData.title ||
      !formData.format ||
      !formData.mediaUrl ||
      !formData.seriesId
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Content added to series");
    setIsAddDialogOpen(false);
    setFormData({ title: "", format: "", mediaUrl: "", seriesId: "" });
  };

  const filteredContent = MOCK_CONTENT.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed")
      return item.transcriptionStatus === "completed";
    if (activeTab === "processing")
      return item.transcriptionStatus === "processing";
    if (activeTab === "pending") return item.transcriptionStatus === "pending";
    if (activeTab === "failed") return item.transcriptionStatus === "failed";
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-muted-foreground">
            Manage content and transcriptions
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Icons.plusIcon className="h-4 w-4" />
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Content to Series</DialogTitle>
              <DialogDescription>
                Add new content to an existing series
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="content-title">Title *</Label>
                <Input
                  id="content-title"
                  placeholder="Enter content title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content-format">Format *</Label>
                <Select
                  value={formData.format}
                  onValueChange={(value) =>
                    setFormData({ ...formData, format: value as ContentFormat })
                  }
                >
                  <SelectTrigger id="content-format">
                    <SelectValue placeholder="Select content format" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_FORMATS.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content-url">Media URL *</Label>
                <Input
                  id="content-url"
                  placeholder="Enter media URL"
                  value={formData.mediaUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, mediaUrl: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content-series">Series *</Label>
                <Select
                  value={formData.seriesId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, seriesId: value })
                  }
                >
                  <SelectTrigger id="content-series">
                    <SelectValue placeholder="Select a series" />
                  </SelectTrigger>
                  <SelectContent>
                    {seriesData?.items.map((series) => (
                      <SelectItem key={series.id} value={series.id}>
                        {series.title}
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
              <Button onClick={handleAddContent}>Add Content</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredContent.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <Icons.layerGroup className="h-16 w-16 text-muted-foreground opacity-50" />
                <div>
                  <h3 className="text-lg font-semibold">No content found</h3>
                  <p className="text-muted-foreground">
                    Add content to a series to get started
                  </p>
                </div>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="gap-2"
                >
                  <Icons.plusIcon className="h-4 w-4" />
                  Add Content
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="truncate">
                            {item.title}
                          </CardTitle>
                          <CardDescription className="truncate">
                            {item.seriesTitle && `Series: ${item.seriesTitle}`}
                          </CardDescription>
                        </div>
                        {getTranscriptionBadge(
                          item.transcriptionStatus || "pending",
                          item.transcriptionProgress || 0,
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {item.format === ContentFormat.YOUTUBE && (
                            <Icons.youtube className="h-4 w-4" />
                          )}
                          {item.format === ContentFormat.AUDIO && (
                            <Icons.music className="h-4 w-4" />
                          )}
                          {item.format === ContentFormat.TEXT && (
                            <Icons.typeWriter className="h-4 w-4" />
                          )}
                          {item.format === ContentFormat.WEBSITE && (
                            <Icons.browser className="h-4 w-4" />
                          )}
                          <span className="capitalize">{item.format}</span>
                        </div>

                        {item.transcriptionStatus === "processing" &&
                          item.transcriptionProgress !== undefined && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Transcription Progress</span>
                                <span>{item.transcriptionProgress}%</span>
                              </div>
                              <Progress
                                value={item.transcriptionProgress}
                                className="h-2"
                              />
                            </div>
                          )}

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
                          <span>
                            {formatNumber(item.stats.totalPlays)} plays
                          </span>
                          <span>•</span>
                          <span>{item.stats.averageRating.toFixed(1)} ⭐</span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Icons.eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          {item.transcriptionStatus === "pending" && (
                            <Button size="sm" className="flex-1">
                              <Icons.lightning className="h-4 w-4 mr-2" />
                              Transcribe
                            </Button>
                          )}
                          {item.transcriptionStatus === "failed" && (
                            <Button
                              size="sm"
                              variant="destructive"
                              className="flex-1"
                            >
                              <Icons.refresh className="h-4 w-4 mr-2" />
                              Retry
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
