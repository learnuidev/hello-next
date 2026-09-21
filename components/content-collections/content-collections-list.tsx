"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/ui/icons.v2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { toast } from "sonner";
import { useListContentCollectionsQuery } from "@/domain/content-collections/use-list-content-collections-query";
import { useAddContentCollectionMutation } from "@/domain/content-collections/use-add-content-collection-mutation";
import { ContentCollection } from "@/domain/content-collections/content-collections.types";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17,
};

function ContentCollectionCard({
  collection,
  index,
  onSelectCollection,
}: {
  collection: ContentCollection;
  index: number;
  onSelectCollection?: (collectionId: string) => void;
}) {
  const body = (
    <motion.div
      className="dark:hover:bg-[rgb(14,15,16)] dark:bg-[rgb(11,12,13)] hover:bg-gray-100 bg-gray-50 flex items-center justify-between shadow rounded-lg overflow-hidden cursor-pointer px-6 py-5"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
      transition={springTransition}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500/10 flex-shrink-0">
          <Icons.archive className="text-rose-400 text-lg" />
        </div>
        <div className="min-w-0">
          <motion.h3
            className="font-semibold text-lg truncate"
            whileHover={{ color: "rgb(244, 63, 94)" }}
            transition={springTransition}
          >
            {collection.title}
          </motion.h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {collection.totalItems} 内容
          </p>
        </div>
      </div>
      <Icons.front className="text-gray-600 text-lg flex-shrink-0 ml-4" />
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {onSelectCollection ? (
        <div onClick={() => onSelectCollection(collection.id)}>{body}</div>
      ) : (
        <Link href={`/content-collections?collectionId=${collection.id}`}>
          {body}
        </Link>
      )}
    </motion.div>
  );
}

export function ContentCollectionsList({
  onSelectCollection,
}: {
  onSelectCollection?: (collectionId: string) => void;
}) {
  const [newTitle, setNewTitle] = useState("");

  const { data: collectionsData, isLoading } = useListContentCollectionsQuery();
  const addCollectionMutation = useAddContentCollectionMutation();

  const collections: ContentCollection[] =
    (collectionsData as any)?.items || [];

  const createCollection = () => {
    if (!newTitle.trim()) return;

    addCollectionMutation.mutate(
      { title: newTitle.trim() },
      {
        onSuccess: () => {
          setNewTitle("");
          toast.success("收藏集创建成功");
        },
        onError: (err: any) => {
          toast.error(err?.message || "创建收藏集失败");
        },
      },
    );
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-10 max-w-md">
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
        <div className="space-y-4">
          {collections.map((collection, index) => (
            <ContentCollectionCard
              key={collection.id}
              collection={collection}
              index={index}
              onSelectCollection={onSelectCollection}
            />
          ))}
        </div>
      )}
    </div>
  );
}
