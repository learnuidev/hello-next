"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { usePortEpisodesMutation } from "@/domain/content-v2/use-port-episodes-mutation";
import { ContentListGrid } from "@/components/new-home-page/components/content-list-grid/content-list-grid";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const defaultPic =
  "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png";

function formatNumber(num = 0): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function SelectableContentCard({
  id,
  title,
  imageUrl,
  stats,
  isSelected,
  onToggleSelect,
}: {
  id: string;
  title: string;
  imageUrl: string;
  stats: any;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}) {
  const isLongTitle = title.length > 30;

  return (
    <motion.div
      key={id}
      className={`dark:hover:bg-[rgb(14,15,16)] dark:bg-[rgb(11,12,13)] hover:bg-gray-100 bg-gray-50 flex flex-col sm:flex-row shadow rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
        isSelected ? "border-rose-500" : "border-transparent"
      }`}
      onClick={() => onToggleSelect(id)}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="p-2">
        <motion.div
          className="aspect-square sm:w-40 sm:flex-shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
        <div className="flex items-start gap-3">
          <div className="pt-1 flex-shrink-0">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onToggleSelect(id)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            {isLongTitle ? (
              <motion.div
                className="flex overflow-hidden"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                whileHover={{ x: "-50%" }}
                transition={{ duration: 10, ease: "linear" }}
                style={{
                  width: "200%",
                }}
              >
                <h3 className="font-semibold text-lg whitespace-nowrap w-1/2 pr-4">
                  {title}
                </h3>
                <h3 className="font-semibold text-lg whitespace-nowrap w-1/2">
                  {title}
                </h3>
              </motion.div>
            ) : (
              <motion.h3
                className="font-semibold text-lg truncate"
                whileHover={{ color: "rgb(244, 63, 94)" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {title}
              </motion.h3>
            )}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span className="hidden sm:flex items-center gap-1">
                {formatNumber(stats?.totalCharacters)} 字
              </span>
              <span className="hidden sm:flex items-center gap-1">
                {formatNumber(stats?.totalWords)} 词
              </span>
              <span className="hidden sm:flex items-center gap-1">
                {formatNumber(stats?.totalSentences)} 句
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortDataPage() {
  const params = useParams<{ seriesId: string }>();
  const seriesId = params.seriesId;
  const router = useRouter();

  const { data: contentsData, isLoading, error } = useListContentsQuery();
  const portEpisodesMutation = usePortEpisodesMutation();
  const [selectedContentIds, setSelectedContentIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(16);

  const filteredContents = useMemo(() => {
    const contents = contentsData?.items || [];
    if (!searchQuery.trim()) {
      return contents;
    }
    const query = searchQuery.toLowerCase();
    return contents.filter((item: any) =>
      item.title?.toLowerCase().includes(query),
    );
  }, [contentsData, searchQuery]);

  const displayedContents = filteredContents.slice(0, visibleCount);

  const handleToggleSelect = (contentId: string) => {
    setSelectedContentIds((prev) =>
      prev.includes(contentId)
        ? prev.filter((id) => id !== contentId)
        : [...prev, contentId],
    );
  };

  const handlePortEpisodes = async () => {
    if (selectedContentIds.length === 0) {
      toast.error("请至少选择一个内容");
      return;
    }

    try {
      await portEpisodesMutation.mutateAsync({
        seriesId,
        contentIds: selectedContentIds,
      });
      toast.success(`成功添加 ${selectedContentIds.length} 个内容到系列`);
      router.push(`/studio/series/${seriesId}`);
    } catch (error: any) {
      toast.error(error?.message || "添加内容失败");
    }
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
          <p className="text-muted-foreground mt-2">
            {error?.message || "无法加载内容列表"}
          </p>
        </div>
        <div className="flex gap-3 mt-6">
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
          <h1 className="text-3xl font-bold tracking-tight">从已有内容添加</h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">
            {selectedContentIds.length > 0
              ? `已选择 ${selectedContentIds.length} 个内容`
              : "请选择要添加的内容"}
          </p>
        </div>
        <Button
          onClick={handlePortEpisodes}
          disabled={
            selectedContentIds.length === 0 || portEpisodesMutation.isPending
          }
          className="gap-2 bg-rose-500 hover:bg-rose-600"
        >
          添加到系列
        </Button>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="搜索内容..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setVisibleCount(16);
          }}
          className="max-w-md"
        />
      </div>

      {filteredContents.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center dark:bg-[rgb(11,12,13)] bg-gray-50 rounded-lg border border-gray-200 dark:border-gray-800">
          <Icons.layerGroup className="h-16 w-16 text-muted-foreground opacity-50" />
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              {searchQuery ? "未找到匹配的内容" : "暂无内容"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "请尝试其他搜索词" : "您还没有创建任何内容"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => router.push("/studio/new-content")}
                className="gap-2 bg-rose-500 hover:bg-rose-600"
              >
                <Icons.plusIcon className="h-4 w-4" />
                创建新内容
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <ContentListGrid>
            {displayedContents.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SelectableContentCard
                  id={item.id}
                  title={item.title}
                  imageUrl={item.thumbnailUrl || defaultPic}
                  stats={item.stats || {}}
                  isSelected={selectedContentIds.includes(item.id)}
                  onToggleSelect={handleToggleSelect}
                />
              </motion.div>
            ))}
          </ContentListGrid>
          {displayedContents.length < filteredContents.length && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setVisibleCount((prev) => prev + 16)}
                variant="outline"
                className="gap-2"
              >
                加载更多
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
