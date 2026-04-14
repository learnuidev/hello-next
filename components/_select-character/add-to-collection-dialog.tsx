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
import { useListCollectionsQuery } from "@/domain/collections/use-list-collections-query";
import { useAddCollectionMutation } from "@/domain/collections/use-add-collection-mutation";
import { useAddCollectionItemsMutation } from "@/domain/collections/use-add-collection-items-mutation";
import { toast } from "sonner";

export const AddToCollectionDialog = ({
  open,
  onOpenChange,
  characterId,
  lang,
  onAdded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  characterId: string;
  lang?: string;
  onAdded?: (collectionId: string) => void;
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { data: collectionsData, isLoading } = useListCollectionsQuery();
  const addCollectionMutation = useAddCollectionMutation();
  const addCollectionItemsMutation = useAddCollectionItemsMutation();

  const collections: any[] = (collectionsData as any)?.items || [];

  const handleAddToCollection = async (collectionId: string) => {
    try {
      await addCollectionItemsMutation.mutateAsync({
        collectionId,
        items: [{ characterId, lang }],
      });
      toast.success("Added to collection");
      onAdded?.(collectionId);
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.message || "Failed to add to collection");
    }
  };

  const handleCreateAndAdd = async () => {
    if (!newTitle.trim()) return;

    try {
      setIsCreating(true);
      const collection = await addCollectionMutation.mutateAsync({
        title: newTitle.trim(),
      });

      await addCollectionItemsMutation.mutateAsync({
        collectionId: collection.id,
        items: [{ characterId, lang }],
      });

      setNewTitle("");
      toast.success("Collection created and item added");
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
        <DialogHeader>
          <DialogTitle>Add to Collection</DialogTitle>
          <DialogDescription>
            Select an existing collection or create a new one.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Icons.spinner className="animate-spin text-xl" />
            </div>
          ) : collections.length === 0 ? (
            <p className="text-sm text-gray-500 py-2">No collections yet.</p>
          ) : (
            collections.map((collection) => (
              <button
                key={collection.id}
                className="w-full flex items-center justify-between px-4 py-3 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                disabled={addCollectionItemsMutation.isPending}
                onClick={() => handleAddToCollection(collection.id)}
              >
                <span className="text-sm font-medium">{collection.title}</span>
                <span className="text-xs text-gray-500">
                  {collection.totalItems} items
                </span>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
          <Input
            placeholder="New collection name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateAndAdd();
            }}
            className="flex-1"
          />
          <Button
            size="sm"
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
      </DialogContent>
    </Dialog>
  );
};
