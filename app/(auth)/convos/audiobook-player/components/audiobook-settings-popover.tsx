"use client";

import { Icons } from "@/components/ui/icons.v2";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { ActiveButtons } from "./active-buttons";

function ViewTypeButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 rounded-lg flex  transition-colors",
        active ? "text-black dark:text-white" : "text-gray-500",
      )}
    >
      <Icon className="text-lg" />
    </button>
  );
}

export function AudioBookSettingsPopover({
  isYoutubeOrVideo,
  containsChinglish,
  showEn,
  isReaderView,
}: {
  isYoutubeOrVideo: boolean;
  showEn: boolean;
  containsChinglish: boolean;
  isReaderView: boolean;
}) {
  const viewMode = usePlayerViewModeStore((state) => state.viewMode);
  const setViewMode = usePlayerViewModeStore((state) => state.setViewMode);
  const isVideoHidden = usePlayerViewModeStore((state) => state.isVideoHidden);
  const setIsVideoHidden = usePlayerViewModeStore(
    (state) => state.setIsVideoHidden,
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-12 justify-self-end">
          <Icons.gear className="text-2xl" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 dark:border-gray-900 border-gray-100 dark:bg-[rgb(21,22,23)] bg-gray-100 rounded-2xl z-50">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-bold leading-none">Player Settings</h4>
          </div>
          <div className="mt-4 space-y-8 pb-4">
            <div className="flex items-center space-x-2 justify-between">
              <Label htmlFor="video-visible">T. Size</Label>
              <ActiveButtons isReaderView={isReaderView} />
            </div>

            <div className="flex items-center gap-2 justify-between mb-4">
              <Label>View Type</Label>
              <div className="flex gap-6">
                <ViewTypeButton
                  icon={Icons.karaoke}
                  label="Karaoke"
                  active={viewMode === "karaoke"}
                  onClick={() =>
                    setViewMode((prev: any) =>
                      prev === "karaoke" ? null : "karaoke",
                    )
                  }
                />
                <ViewTypeButton
                  icon={Icons.bookOpen}
                  label="Reader"
                  active={viewMode === "reader"}
                  onClick={() =>
                    setViewMode((prev: any) =>
                      prev === "reader" ? null : "reader",
                    )
                  }
                />
                <ViewTypeButton
                  icon={Icons.paragraph}
                  label="Paragraph"
                  active={viewMode === "para"}
                  onClick={() =>
                    setViewMode((prev: any) =>
                      prev === "para" ? null : "para",
                    )
                  }
                />
              </div>
            </div>
            {isYoutubeOrVideo && (
              <div className="flex items-center space-x-2 justify-between">
                <Label htmlFor="video-visible">Show Video</Label>
                <Switch
                  checked={!isVideoHidden}
                  onCheckedChange={() => {
                    setIsVideoHidden((isHidden: any) => !isHidden);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
