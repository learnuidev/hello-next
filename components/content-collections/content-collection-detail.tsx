"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/ui/icons.v2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { toast } from "sonner";
import { useGetContentCollectionQuery } from "@/domain/content-collections/use-get-content-collection-query";
import { useRemoveContentCollectionItemsMutation } from "@/domain/content-collections/use-remove-content-collection-items-mutation";
import { useUpdateContentCollectionMutation } from "@/domain/content-collections/use-update-content-collection-mutation";
import {
  ContentCollectionItem,
  ContentCollectionWithItems,
} from "@/domain/content-collections/content-collections.types";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17,
};

function ContentCollectionItemCard({
  item,
  index,
  onRemove,
  isRemoving,
}: {
  item: ContentCollectionItem;
  index: number;
  onRemove: () => void;
  isRemoving: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <motion.div
        className="dark:hover:bg-[rgb(14,15,16)] dark:bg-[rgb(11,12,13)] hover:bg-gray-100 bg-gray-50 shadow rounded-lg overflow-hidden cursor-pointer group relative"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={springTransition}
      >
        <Link
          href={`/convos/${item.contentId}`}
          className="flex items-center gap-3 px-5 py-4"
        >
          {item.thumbnailUrl ? (
            <div
              className="w-12 h-12 rounded-md bg-cover bg-center flex-shrink-0"
              style={{ backgroundImage: `url(${item.thumbnailUrl})` }}
            />
          ) : (
            <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gray-200 dark:bg-gray-800 flex-shrink-0">
              <Icons.content className="text-gray-500" />
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-medium text-base truncate">
              {item.title || item.contentId}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {item.subtitle || item.lang || item.format || ""}
            </p>
          </div>
        </Link>
        <button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition p-1 text-gray-400 hover:text-red-400"
          disabled={isRemoving}
          title="从收藏集移除"
          aria-label="从收藏集移除"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
        >
          {isRemoving ? (
            <Icons.spinner className="text-sm animate-spin" />
          ) : (
            <Icons.xMark className="text-sm" />
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}

export function ContentCollectionDetail({
  collectionId,
  onBack,
  backLabel = "收藏",
}: {
  collectionId: string;
  onBack: () => void;
  backLabel?: string;
}) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [title, setTitle] = useState("");

  const { data, isLoading } = useGetContentCollectionQuery({ collectionId });
  const removeItemsMutation = useRemoveContentCollectionItemsMutation();
  const updateCollectionMutation = useUpdateContentCollectionMutation();

  const collection = data as ContentCollectionWithItems | undefined;

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  if (!collection) {
    return <Nothing message="未找到收藏集" icon={Icons.archive} />;
  }

  const items: ContentCollectionItem[] = collection.items || [];

  const handleRemoveItem = (itemId: string) => {
    removeItemsMutation.mutate(
      { collectionId, itemIds: [itemId] },
      {
        onSuccess: () => {
          toast.success("已移除");
        },
        onError: (err: any) => {
          toast.error(err?.message || "移除失败");
        },
      },
    );
  };

  const handleRename = () => {
    if (!title.trim()) {
      setIsRenaming(false);
      return;
    }

    updateCollectionMutation.mutate(
      { collectionId, title: title.trim() },
      {
        onSuccess: () => {
          setIsRenaming(false);
          toast.success("已重命名");
        },
        onError: (err: any) => {
          toast.error(err?.message || "重命名失败");
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onBack}
        className="text-sm text-gray-500 hover:text-rose-400 mb-8 flex items-center gap-2 transition"
      >
        <Icons.back className="text-lg" />
        <span className="font-light">{backLabel}</span>
      </button>

      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 flex-shrink-0">
          <Icons.archive className="text-rose-400 text-xl" />
        </div>
        <div className="min-w-0 flex-1">
          {isRenaming ? (
            <div className="flex items-center gap-2">
              <Input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename();
                  if (e.key === "Escape") setIsRenaming(false);
                }}
                className="max-w-xs"
              />
              <Button
                size="sm"
                onClick={handleRename}
                disabled={updateCollectionMutation.isPending}
              >
                {updateCollectionMutation.isPending ? (
                  <Icons.spinner className="animate-spin" />
                ) : (
                  "保存"
                )}
              </Button>
            </div>
          ) : (
            <h2 className="text-2xl font-semibold truncate flex items-center gap-3">
              {collection.title}
              <button
                className="text-gray-500 hover:text-rose-400 transition text-sm"
                title="重命名"
                aria-label="重命名"
                onClick={() => {
                  setTitle(collection.title);
                  setIsRenaming(true);
                }}
              >
                <Icons.edit className="text-base" />
              </button>
            </h2>
          )}
          <p className="text-sm text-gray-500 mt-0.5">{items.length} 内容</p>
        </div>
      </div>

      <div className="mt-10">
        {items.length === 0 ? (
          <Nothing message="还没有内容" icon={Icons.seedling}>
            <p className="text-sm text-gray-600 mt-4 font-light">
              点击任意内容上的星标即可加入收藏集
            </p>
          </Nothing>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6">
            {items.map((item, index) => (
              <ContentCollectionItemCard
                key={item.id}
                item={item}
                index={index}
                isRemoving={removeItemsMutation.isPending}
                onRemove={() => handleRemoveItem(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
