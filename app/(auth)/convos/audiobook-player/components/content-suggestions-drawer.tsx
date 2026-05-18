"use client";

import { Icons } from "@/components/ui/icons.v2";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useInfiniteListContentsQuery,
  useListContentsQuery,
} from "@/domain/content/content.queries";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultPic } from "@/data/default-image-urls";
import { useListFavouriteContentsQuery } from "../../[content-id]/hooks/use-list-favourited-contents-query";
import { useListPublishedContentsQuery } from "../../[content-id]/hooks/use-list-published-contents-query";
import { useRecentlyWatchedContent } from "../../use-recently-watched-content-store";
import { contentTypes } from "../../constants/content-types";

type ViewType = "history" | "me" | "public" | "favourites";

const viewTabs: { label: string; value: ViewType }[] = [
  { label: "历史", value: "history" },
  { label: "我", value: "me" },
  { label: "公开", value: "public" },
  { label: "收藏", value: "favourites" },
];

export function ContentSuggestionsDrawer({
  open,
  onOpenChange,
  contentId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
}) {
  const [activeTab, setActiveTab] = useState<ViewType>("history");
  const [contentTypeFilter, setContentTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: contentsData } = useListContentsQuery();
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteListContentsQuery();
  const { data: publishedData } = useListPublishedContentsQuery({});
  const { data: favouriteData } = useListFavouriteContentsQuery({});
  const { recentlyWatched } = useRecentlyWatchedContent();

  const router = useRouter();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 300);

  const myContentItems = useMemo(() => {
    if (!infiniteData?.pages) return contentsData?.items || [];
    const infiniteItems = infiniteData.pages.flatMap(
      (page) => page.items || [],
    );
    const seen = new Set<string>();
    const merged = [...infiniteItems, ...(contentsData?.items || [])];
    return merged.filter((item: any) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [infiniteData, contentsData]);

  const contentsByTab = useMemo(() => {
    switch (activeTab) {
      case "history":
        return recentlyWatched || [];
      case "me":
        return myContentItems;
      case "public":
        return publishedData?.items || [];
      case "favourites":
        return favouriteData?.items || [];
      default:
        return [];
    }
  }, [
    activeTab,
    recentlyWatched,
    myContentItems,
    publishedData,
    favouriteData,
  ]);

  const filteredContents = useMemo(() => {
    let result = contentsByTab as any[];

    if (contentTypeFilter !== "all") {
      result = result?.filter(
        (item: any) =>
          contentTypeFilter === item?.type ||
          contentTypeFilter === item?.contentType,
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result?.filter((item: any) =>
        JSON.stringify(item).toLowerCase().includes(q),
      );
    }

    return result || [];
  }, [contentsByTab, contentTypeFilter, searchQuery]);

  const showLoadMore = activeTab === "me" && hasNextPage;

  const handleSelect = (id: string) => {
    router.push(`/convos/${id}`);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b dark:border-gray-700 pb-3">
          <div className="flex items-center justify-between">
            <DrawerTitle>Content</DrawerTitle>
            <button onClick={() => onOpenChange(false)}>
              <Icons.xMark className="text-2xl" />
            </button>
          </div>
        </DrawerHeader>

        <div
          className="flex gap-1 px-4 pt-3 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {viewTabs.map((tab) => (
            <button
              key={tab.value}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition",
                activeTab === tab.value
                  ? "bg-white text-black dark:bg-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
              )}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-4 pt-3 flex gap-2 items-center">
          <div className="relative flex-1">
            <Icons.magnifyingGlass className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search content..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <Select
            value={contentTypeFilter}
            onValueChange={setContentTypeFilter}
          >
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有类型</SelectItem>
              {contentTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {filteredContents?.map((item: any) => (
              <button
                key={item.id}
                className={cn(
                  "rounded-lg overflow-hidden transition-transform hover:scale-105 focus:outline-none",
                  contentId === item.id && "ring-2 ring-rose-500",
                )}
                onClick={() => handleSelect(item.id)}
              >
                <div
                  className="aspect-square bg-cover bg-center rounded-md"
                  style={{
                    backgroundImage: `url(${item?.coverPhotoUrl || defaultPic})`,
                  }}
                />
                <p className="text-[10px] mt-1 truncate px-0.5 text-left w-full leading-tight">
                  {item?.title}
                </p>
              </button>
            ))}
          </div>

          {showLoadMore && (
            <div className="flex justify-center py-4">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-6 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
