"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/ui/icons.v2";
import { Button } from "@/components/ui/button";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Nothing } from "@/app/nmm/nothing";
import { defaultPic } from "@/data/default-image-urls";
import { toWidescreenThumbnailUrl } from "@/libs/utils/to-widescreen-thumbnail-url";
import { toast } from "sonner";
import { useListContentCollectionsQuery } from "@/domain/content-collections/use-list-content-collections-query";
import { useAddContentCollectionMutation } from "@/domain/content-collections/use-add-content-collection-mutation";
import { useGetContentCollectionQuery } from "@/domain/content-collections/use-get-content-collection-query";
import { useRemoveContentCollectionItemsMutation } from "@/domain/content-collections/use-remove-content-collection-items-mutation";
import { useUpdateContentCollectionMutation } from "@/domain/content-collections/use-update-content-collection-mutation";
import {
  ContentCollection,
  ContentCollectionItem,
  ContentToCollect,
} from "@/domain/content-collections/content-collections.types";
import { StarIconButton } from "./star-content-button";
import { AddToContentCollectionDialog } from "./add-to-content-collection-dialog";
import {
  CollectionCardsSkeleton,
  ContentCollectionsSkeleton,
  collectionCardWidthClassName,
} from "./content-collections-skeletons";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17,
};

/** The bits of a saved item that the add-to-collection dialog needs. */
const toCollectPayload = (item: ContentCollectionItem): ContentToCollect => ({
  contentId: item.contentId,
  title: item.title,
  subtitle: item.subtitle,
  description: item.description,
  thumbnailUrl: item.thumbnailUrl,
  format: item.format,
  lang: item.lang,
  author: item.author,
  seriesId: item.seriesId,
});

/**
 * Overlay text and icons stay hidden on pointer devices until the card is
 * hovered (or focused from the keyboard). Touch screens have no hover, so the
 * overlay is always visible there.
 */
const revealOnHover =
  "opacity-100 md:opacity-0 md:group-hover/card:opacity-100 md:group-focus-within/card:opacity-100";

/**
 * The overlay is transparent on desktop at rest, so its buttons must also be
 * unclickable then — otherwise an invisible "remove" button would sit on top
 * of every cover.
 */
const revealInteractiveOnHover =
  "pointer-events-auto md:pointer-events-none md:group-hover/card:pointer-events-auto md:group-focus-within/card:pointer-events-auto";

/**
 * A saved content, shown as a square cover. The title, metadata and the
 * collection actions appear over the image on hover.
 */
function CollectionContentCard({
  item,
  onRemove,
  isRemoving,
  onStarClick,
}: {
  item: ContentCollectionItem;
  onRemove: () => void;
  isRemoving: boolean;
  onStarClick: (content: ContentToCollect) => void;
}) {
  const title = item.title || item.contentId;
  // YouTube's default thumbnails carry black letterbox bars; crop them at the
  // source so the square cover is filled edge to edge.
  const coverUrl = toWidescreenThumbnailUrl(item.thumbnailUrl) || defaultPic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={springTransition}
      className={cn(
        "group/card relative aspect-square snap-start overflow-hidden rounded-lg shadow",
        collectionCardWidthClassName,
        "bg-gray-50 dark:bg-[rgb(16,17,21)]",
      )}
    >
      {/* Thumbnail: always visible, slightly scaled up on hover. */}
      <div
        aria-hidden
        className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-300 group-hover/card:scale-[1.04]"
        style={{ backgroundImage: `url(${coverUrl})` }}
      />

      {/* Scrim behind the text so it stays readable over bright covers. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/0 transition-opacity duration-200",
          revealOnHover,
        )}
      />

      <Link
        href={`/convos/${item.contentId}`}
        aria-label={title}
        className="absolute inset-0 flex flex-col justify-end p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-500/70"
      >
        <div
          className={cn(
            "pointer-events-none transition-opacity duration-200",
            revealOnHover,
          )}
        >
          <h3 className="truncate pr-12 text-sm font-semibold text-white">
            {title}
          </h3>

          <div className="mt-0.5 flex items-center gap-2 pr-12 text-xs text-white/80">
            {item.lang && <span className="capitalize">{item.lang}</span>}
            {item.author && (
              <>
                <span>•</span>
                <span className="truncate">{item.author}</span>
              </>
            )}
            {!item.author && item.format && (
              <>
                <span>•</span>
                <span className="capitalize">{item.format}</span>
              </>
            )}
          </div>
        </div>
      </Link>

      {/* Siblings of the link, never nested inside the anchor. */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-2 right-2 z-10 transition-opacity duration-200",
          revealOnHover,
        )}
      >
        <StarIconButton
          content={toCollectPayload(item)}
          initialIsCollected
          className={cn(
            "bg-white/85 text-rose-500 shadow-sm backdrop-blur hover:bg-white",
            revealInteractiveOnHover,
          )}
          onClick={() => onStarClick(toCollectPayload(item))}
        />
      </div>

      <button
        title="从收藏集移除"
        aria-label="从收藏集移除"
        disabled={isRemoving}
        className={cn(
          "absolute right-1.5 top-1.5 z-10 rounded-full bg-black/55 p-1.5 text-white/90 backdrop-blur",
          "transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          revealOnHover,
          revealInteractiveOnHover,
        )}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onRemove();
        }}
      >
        {isRemoving ? (
          <Icons.spinner className="text-xs animate-spin" />
        ) : (
          <Icons.xMark className="text-xs" />
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
  onStarClick,
}: {
  collection: ContentCollection;
  onStarClick: (content: ContentToCollect) => void;
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
        <CollectionCardsSkeleton
          count={Math.min(Math.max(collection.totalItems || 4, 1), 6)}
          label={`正在加载「${collection.title}」的内容…`}
        />
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 dark:border-gray-800 px-6 py-8 text-center">
          <p className="text-sm text-gray-500">
            还没有内容，点击任意内容上的星标即可加入
          </p>
        </div>
      ) : (
        <HorizontalScroller
          label={`${collection.title} 的内容`}
          scrollLeftLabel={`向左浏览「${collection.title}」`}
          scrollRightLabel={`向右浏览「${collection.title}」`}
        >
          {items.map((item) => (
            <CollectionContentCard
              key={item.id}
              item={item}
              isRemoving={removeItemsMutation.isPending}
              onRemove={() => handleRemoveItem(item.id)}
              onStarClick={onStarClick}
            />
          ))}
        </HorizontalScroller>
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
  const [collectionDialogContent, setCollectionDialogContent] =
    useState<ContentToCollect | null>(null);

  const { data: collectionsData, isLoading } = useListContentCollectionsQuery();
  const addCollectionMutation = useAddContentCollectionMutation();

  // Biggest collections first, so the fullest shelves lead the page. Newest
  // wins when two collections hold the same number of items.
  const collections: ContentCollection[] = ((collectionsData as any)?.items || [])
    .slice()
    .sort(
      (a: ContentCollection, b: ContentCollection) =>
        (b.totalItems || 0) - (a.totalItems || 0) ||
        b.createdAt - a.createdAt,
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
        <ContentCollectionsSkeleton />
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
            onStarClick={setCollectionDialogContent}
          />
        ))
      )}

      {/* Kept out of the card links: React events bubble through the component
          tree, so a dialog nested in a <Link> would navigate when clicked. */}
      {collectionDialogContent && (
        <AddToContentCollectionDialog
          open={!!collectionDialogContent}
          onOpenChange={(open: boolean) => {
            if (!open) setCollectionDialogContent(null);
          }}
          content={collectionDialogContent}
        />
      )}
    </div>
  );
}
