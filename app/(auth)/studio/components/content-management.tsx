"use client";

import { useState } from "react";
import { useListContentsQuery } from "@/domain/content-v2/use-list-contents-query";
import { useListSeriesQuery } from "@/domain/content-v2/use-list-series-query";
import { ContentV2, ContentFormat } from "@/domain/content-v2/content-v2.types";
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

export function ContentManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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

  const contents = contentsData?.items || [];

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">内容</h2>
          <p className="text-muted-foreground">管理您的内容库</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Icons.plusIcon className="h-4 w-4" />
              添加内容
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>添加内容到系列</DialogTitle>
              <DialogDescription>添加新内容到现有系列</DialogDescription>
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
                取消
              </Button>
              <Button onClick={handleAddContent}>添加内容</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {contents.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Icons.layerGroup className="h-16 w-16 text-muted-foreground opacity-50" />
          <div className="mt-4">
            <h3 className="text-lg font-semibold">暂无内容</h3>
            <p className="text-muted-foreground">添加内容到系列以开始</p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="gap-2 mt-4"
          >
            <Icons.plusIcon className="h-4 w-4" />
            添加内容
          </Button>
        </div>
      ) : (
        <ContentListGrid>
          {contents.map((item: ContentV2) => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.thumbnailUrl}
              stats={item.stats}
            />
          ))}
        </ContentListGrid>
      )}
    </div>
  );
}
