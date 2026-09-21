"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons.v2";
import { useListContentCollectionsQuery } from "@/domain/content-collections/use-list-content-collections-query";
import { useAddContentCollectionMutation } from "@/domain/content-collections/use-add-content-collection-mutation";
import { useAddContentCollectionItemsMutation } from "@/domain/content-collections/use-add-content-collection-items-mutation";
import { useRemoveContentCollectionItemsMutation } from "@/domain/content-collections/use-remove-content-collection-items-mutation";
import { useListContentCollectionsByContentQuery } from "@/domain/content-collections/use-list-content-collections-by-content-query";
import {
  ContentCollection,
  ContentToCollect,
} from "@/domain/content-collections/content-collections.types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const AddToContentCollectionDialog = ({
  open,
  onOpenChange,
  content,
  onAdded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: ContentToCollect;
  onAdded?: (collectionId: string) => void;
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { data: collectionsData, isLoading } = useListContentCollectionsQuery();
  const { data: byContentData } = useListContentCollectionsByContentQuery(
    { contentId: content?.contentId },
    { enabled: open && !!content?.contentId },
  );

  const addCollectionMutation = useAddContentCollectionMutation();
  const addItemsMutation = useAddContentCollectionItemsMutation();
  const removeItemsMutation = useRemoveContentCollectionItemsMutation();

  const collections: ContentCollection[] =
    (collectionsData as any)?.items || [];

  const existingCollectionIds = new Set<string>(
    (byContentData as any)?.collectionIds || [],
  );

  const isPending =
    addItemsMutation.isPending ||
    removeItemsMutation.isPending ||
    addCollectionMutation.isPending;

  const handleToggle = async (collectionId: string) => {
    if (existingCollectionIds.has(collectionId)) {
      try {
        await removeItemsMutation.mutateAsync({
          collectionId,
          contentIds: [content.contentId],
        });
        toast.success("Removed from collection");
        onAdded?.(collectionId);
      } catch (err: any) {
        toast.error(err?.message || "Failed to remove from collection");
      }
      return;
    }

    try {
      await addItemsMutation.mutateAsync({
        collectionId,
        items: [content],
      });
      toast.success("Saved to collection");
      onAdded?.(collectionId);
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.message || "Failed to save to collection");
    }
  };

  const handleCreateAndAdd = async () => {
    if (!newTitle.trim()) return;

    try {
      setIsCreating(true);
      const collection = await addCollectionMutation.mutateAsync({
        title: newTitle.trim(),
      });

      await addItemsMutation.mutateAsync({
        collectionId: collection.id,
        items: [content],
      });

      setNewTitle("");
      toast.success("Collection created and content saved");
      onAdded?.(collection.id);
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.message || "Failed to create collection");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {/* Stops clicks inside the dialog from reaching handlers on ancestor
            elements (e.g. a card <Link> that opened this dialog). */}
        <div
          className="grid gap-4"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>收藏</DialogTitle>
            <DialogDescription>
              {content?.title
                ? `将「${content.title}」添加到收藏集`
                : "选择一个收藏集，或创建一个新的"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 max-h-72 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center py-6">
                <Icons.spinner className="animate-spin text-xl" />
              </div>
            ) : collections.length === 0 ? (
              <p className="text-sm text-gray-500 py-2">
                还没有收藏集，在下方创建一个。
              </p>
            ) : (
              collections.map((collection) => {
                const isAlreadyAdded = existingCollectionIds.has(
                  collection.id,
                );

                return (
                  <motion.button
                    key={collection.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-lg border transition disabled:opacity-60",
                      isAlreadyAdded
                        ? "border-rose-400/60 bg-rose-500/5"
                        : "border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900",
                    )}
                    disabled={isPending}
                    onClick={() => handleToggle(collection.id)}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <Icons.archive className="text-rose-400 flex-shrink-0" />
                      <span className="text-sm font-medium truncate text-left">
                        {collection.title}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-xs text-gray-500 flex-shrink-0">
                      {collection.totalItems} 内容
                      {isAlreadyAdded && (
                        <Icons.starSolid className="text-rose-400 text-sm" />
                      )}
                    </span>
                  </motion.button>
                );
              })
            )}
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
            <Input
              placeholder="新建收藏集..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateAndAdd();
              }}
              className="flex-1"
            />
            <Button
              size="sm"
              className="bg-rose-500 hover:bg-rose-600 text-white"
              onClick={handleCreateAndAdd}
              disabled={!newTitle.trim() || isCreating}
            >
              {isCreating ? (
                <Icons.spinner className="animate-spin" />
              ) : (
                <Icons.plusIcon className="text-lg" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
