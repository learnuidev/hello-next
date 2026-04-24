"use client";

import { useState, useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { ContentEpisode } from "@/domain/content-v2/content-v2.types";
import { defaultPic } from "@/data/default-image-urls";
import { cn } from "@/lib/utils";

function formatNumber(num = 0): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return `${num}`.toString();
}

interface SortableEpisodeItemProps {
  episode: ContentEpisode;
  index: number;
  disabled?: boolean;
}

function SortableEpisodeItem({ episode, index, disabled = false }: SortableEpisodeItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: episode.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "audio":
        return <Icons.music className="h-4 w-4 text-purple-500" />;
      case "video":
        return <Icons.contentSolid className="h-4 w-4 text-blue-500" />;
      case "text":
        return <Icons.book className="h-4 w-4 text-green-500" />;
      case "youtube":
        return <Icons.youtube className="h-4 w-4 text-red-500" />;
      default:
        return <Icons.content className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white dark:bg-[rgb(20,21,22)] rounded-xl shadow-sm border border-gray-100 dark:border-[rgb(31,33,35)] transition-all duration-200 hover:shadow-md",
        isDragging && "opacity-50 shadow-lg",
        disabled && "opacity-70",
      )}
    >
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div
            {...attributes}
            {...listeners}
            style={{ touchAction: 'none' }}
            className={cn(
              "flex-shrink-0 transition-colors select-none",
              disabled 
                ? "cursor-not-allowed text-gray-300 dark:text-gray-600 pointer-events-none" 
                : "cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            )}
          >
            <Icons.gripVertical className="h-5 w-5 pointer-events-none" />
          </div>

          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={episode.thumbnailUrl || defaultPic}
              alt={episode.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                #{index + 1}
              </span>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 truncate">
                {episode.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-sm">
              {getFormatIcon(episode.type)}
              <span className="text-gray-500 dark:text-gray-400">
                {episode.lang}
              </span>
              <span className="hidden sm:flex items-center gap-1 text-gray-500 dark:text-gray-400">
                {formatNumber(episode.stats?.totalCharacters)} 字
              </span>
              <span className="hidden sm:flex items-center gap-1 text-gray-500 dark:text-gray-400">
                {formatNumber(episode.stats?.totalWords)} 词
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              window.location.href = `/contents/${episode.id}`;
            }}
            className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-[rgb(31,33,35)] h-9 px-3"
          >
            <span>查看</span>
            <Icons.front className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DraggableEpisodeListProps {
  episodes: ContentEpisode[];
  onSave: (episodes: ContentEpisode[]) => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
}

export function DraggableEpisodeList({
  episodes,
  onSave,
  isLoading = false,
  disabled = false,
}: DraggableEpisodeListProps) {
  const [localEpisodes, setLocalEpisodes] = useState<ContentEpisode[]>(episodes);
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!active || !over) return;
    
    if (active.id !== over.id) {
      const oldIndex = localEpisodes.findIndex((item) => item.id === active.id);
      const newIndex = localEpisodes.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const newEpisodes = arrayMove(localEpisodes, oldIndex, newIndex);
      setLocalEpisodes(newEpisodes);
      setHasChanges(true);
    }
  };

  const handleSave = async () => {
    await onSave(localEpisodes);
    setHasChanges(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hasChanges && (
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-medium">
            <Icons.circleInfo className="h-4 w-4" />
            未保存的更改
          </div>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="gap-2 bg-green-500 hover:bg-green-600"
          >
            {isLoading ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              <Icons.check className="h-4 w-4" />
            )}
            保存排序
          </Button>
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localEpisodes.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {localEpisodes.map((episode, index) => (
              <SortableEpisodeItem
                key={episode.id}
                episode={episode}
                index={index}
                disabled={disabled}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
