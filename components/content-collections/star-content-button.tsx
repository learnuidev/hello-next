"use client";

import { useState } from "react";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useListContentCollectionsByContentQuery } from "@/domain/content-collections/use-list-content-collections-by-content-query";
import { ContentToCollect } from "@/domain/content-collections/content-collections.types";
import { AddToContentCollectionDialog } from "./add-to-content-collection-dialog";

const sizeClasses = {
  none: "",
  sm: "w-8 h-8 text-sm",
  default: "w-10 h-10 text-lg",
  lg: "w-12 h-12 text-xl",
} as const;

type StarSize = keyof typeof sizeClasses;

/**
 * The star itself. Filled when the content is already part of a collection.
 *
 * Has no dialog of its own on purpose: inside popovers/drawers the dialog has
 * to be rendered by a parent that stays mounted, otherwise the popover
 * closing would unmount the dialog with it.
 */
export const StarIconButton = ({
  content,
  className,
  iconClassName,
  size = "default",
  onClick,
}: {
  content: ContentToCollect;
  className?: string;
  iconClassName?: string;
  size?: StarSize;
  onClick?: () => void;
}) => {
  const { data } = useListContentCollectionsByContentQuery({
    contentId: content?.contentId,
  });

  const isCollected = ((data as any)?.collectionIds || []).length > 0;

  return (
    <button
      type="button"
      title={isCollected ? "已在收藏集中" : "添加到收藏集"}
      aria-label={isCollected ? "已在收藏集中" : "添加到收藏集"}
      className={cn(
        "flex items-center justify-center rounded-full transition hover:scale-110",
        className || "bg-white/80 dark:bg-black/60 backdrop-blur",
        sizeClasses[size],
        isCollected ? "text-rose-400" : "text-gray-500 hover:text-rose-400",
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }}
    >
      {isCollected ? (
        <Icons.starSolid className={cn("text-rose-400", iconClassName)} />
      ) : (
        <Icons.star className={cn(iconClassName)} />
      )}
    </button>
  );
};

/**
 * Star + "add to collection" dialog, for places where it is safe for the
 * button to own the dialog.
 */
export const StarContentButton = ({
  content,
  className,
  iconClassName,
  size = "default",
  onOpenDialog,
}: {
  content: ContentToCollect;
  className?: string;
  iconClassName?: string;
  size?: StarSize;
  onOpenDialog?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StarIconButton
        content={content}
        className={className}
        iconClassName={iconClassName}
        size={size}
        onClick={() => {
          onOpenDialog?.();
          setOpen(true);
        }}
      />

      {content?.contentId ? (
        <AddToContentCollectionDialog
          open={open}
          onOpenChange={setOpen}
          content={content}
        />
      ) : null}
    </>
  );
};
