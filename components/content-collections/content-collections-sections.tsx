"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/ui/icons.v2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { defaultPic } from "@/data/default-image-urls";
import { toast } from "sonner";
import { useListContentCollectionsQuery } from "@/domain/content-collections/use-list-content-collections-query";
import { useAddContentCollectionMutation } from "@/domain/content-collections/use-add-content-collection-mutation";
import { useGetContentCollectionQuery } from "@/domain/content-collections/use-get-content-collection-query";
import { useRemoveContentCollectionItemsMutation } from "@/domain/content-collections/use-remove-content-collection-items-mutation";
import { useUpdateContentCollectionMutation } from "@/domain/content-collections/use-update-content-collection-mutation";
import {
  ContentCollection,
  ContentCollectionItem,
} from "@/domain/content-collections/content-collections.types";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17,
};

/**
 * A saved content, laid out like the cards on the /convos page: square cover
 * on the left, title and metadata on the right.
 */
function CollectionContentCard({
  item,
  onRemove,
  isRemoving,
}: {
  item: ContentCollectionItem;
  onRemove: () => void;
  isRemoving: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={springTransition}
      className="dark:hover:bg-[rgb(14,15,16)] dark:bg-[rgb(11,12,13)] hover:bg-gray-100 bg-gray-50 flex flex-col sm:flex-row shadow rounded-lg overflow-hidden group relative"
    >
      <Link
        href={`/convos/${item.contentId}`}
        className="flex flex-col sm:flex-row w-full"
      >
        <div className="p-2">
          <div
            className="aspect-square sm:w-40 sm:flex-shrink-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${item.thumbnailUrl || defaultPic})`,
            }}
          />
        </div>

        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-semibold text-lg truncate dark:text-white dark:hover:text-rose-500">
              {item.title || item.contentId}
            </h3>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              {item.lang && <span className="capitalize">{item.lang}</span>}
              {item.author && (
                <>
                  <span>•</span>
                  <span>{item.author}</span>
                </>
              )}
              {!item.author && item.format && (
                <>
                  <span>•</span>
                  <span className="capitalize">{item.format}</span>
                </>
              )}
            </div>

            {(item.description || item.subtitle) && (
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {item.description || item.subtitle}
              </p>
            )}
          </div>
        </div>
      </Link>

      <button
        title="从收藏集移除"
        aria-label="从收藏集移除"
        disabled={isRemoving}
        className="absolute top-2 right-2 z-50 p-2 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
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
  );
}

/**
 * One collection: its name, then its contents right below.
 */
function ContentCollectionSection({
  collection,
}: {
  collection: ContentCollection;
}) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [title, setTitle] = useState(collection.title);

  const { data, isLoading } = useGetContentCollectionQuery({
    collectionId: collection.id,
  });
  const removeItemsMutation = useRemoveContentCollectionItemsMutation();
  const updateCollectionMutation = useUpdateContentCollectionMutation();

  const items: ContentCollectionItem[] = (data as any)?.items || [];

  const handleRemoveItem = (itemId: string) => {
    removeItemsMutation.mutate(
      { collectionId: collection.id, itemIds: [itemId] },
      {
        onSuccess: () => toast.success("已移除"),
        onError: (err: any) => toast.error(err?.message || "移除失败"),
      },
    );
  };

  const handleRename = () => {
    if (!title.trim()) {
      setIsRenaming(false);
      return;
    }

    updateCollectionMutation.mutate(
      { collectionId: collection.id, title: title.trim() },
      {
        onSuccess: () => {
          setIsRenaming(false);
          toast.success("已重命名");
        },
        onError: (err: any) => toast.error(err?.message || "重命名失败"),
      },
    );
  };

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-rose-500/10 flex-shrink-0">
            <Icons.archive className="text-rose-400" />
          </div>

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
                className="h-8 max-w-xs"
              />
              <Button
                size="sm"
                variant="ghost"
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
            <h2 className="text-xl font-semibold truncate">
              {collection.title}
            </h2>
          )}

          <span className="text-sm text-gray-500 flex-shrink-0">
            {isLoading ? collection.totalItems : items.length} 内容
          </span>
        </div>

        {!isRenaming && (
          <button
            title="重命名"
            aria-label="重命名"
            className="text-gray-500 hover:text-rose-400 transition flex-shrink-0"
            onClick={() => {
              setTitle(collection.title);
              setIsRenaming(true);
            }}
          >
            <Icons.edit />
          </button>
        )}
      </div>

      {isLoading ? (
        <LottieLoadingAnimation />
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 dark:border-gray-800 px-6 py-8 text-center">
          <p className="text-sm text-gray-500">
            还没有内容，点击任意内容上的星标即可加入
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(32rem,1fr))] sm:grid-cols-[repeat(2,minmax(20rem,1fr))] gap-8">
          {items.map((item) => (
            <CollectionContentCard
              key={item.id}
              item={item}
              isRemoving={removeItemsMutation.isPending}
              onRemove={() => handleRemoveItem(item.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * All collections for the current user: collection name followed by its
 * contents, for every collection at once.
 */
export function ContentCollectionsSections() {
  const [newTitle, setNewTitle] = useState("");

  const { data: collectionsData, isLoading } = useListContentCollectionsQuery();
  const addCollectionMutation = useAddContentCollectionMutation();

  const collections: ContentCollection[] = (
    (collectionsData as any)?.items || []
  )
    .slice()
    .sort(
      (a: ContentCollection, b: ContentCollection) => b.createdAt - a.createdAt,
    );

  const createCollection = () => {
    if (!newTitle.trim()) return;

    addCollectionMutation.mutate(
      { title: newTitle.trim() },
      {
        onSuccess: () => {
          setNewTitle("");
          toast.success("收藏集创建成功");
        },
        onError: (err: any) => toast.error(err?.message || "创建收藏集失败"),
      },
    );
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-12 max-w-md">
        <Input
          placeholder="新建收藏集..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") createCollection();
          }}
          className="flex-1 rounded-full"
        />
        <Button
          size="icon"
          className="rounded-full h-10 w-10 bg-rose-500 hover:bg-rose-600 text-white"
          disabled={!newTitle.trim() || addCollectionMutation.isPending}
          onClick={createCollection}
        >
          {addCollectionMutation.isPending ? (
            <Icons.spinner className="animate-spin h-4 w-4" />
          ) : (
            <Icons.plusIcon className="text-lg" />
          )}
        </Button>
      </div>

      {isLoading ? (
        <LottieLoadingAnimation />
      ) : collections.length === 0 ? (
        <Nothing message="暂无收藏集" icon={Icons.archive}>
          <p className="text-sm text-gray-600 mt-4 font-light">
            在上方创建你的第一个收藏集
          </p>
        </Nothing>
      ) : (
        collections.map((collection) => (
          <ContentCollectionSection
            key={collection.id}
            collection={collection}
          />
        ))
      )}
    </div>
  );
}
