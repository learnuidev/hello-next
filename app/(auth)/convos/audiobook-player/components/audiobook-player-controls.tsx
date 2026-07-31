import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AudioBookSettingsPopover } from "./audiobook-settings-popover";
import { ContentSuggestionsDrawer } from "./content-suggestions-drawer";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";

export function AudioBookPlayerControls({
  loop,
  setLoop,
  currentTranscription,
  seekBefore,
  seekAfter,
  handlePlayPause,
  playing,
  showEn,
  containsChinglish,
  isYoutubeOrVideo,
  isReaderView,
  contentId,
}: any) {
  const [contentDrawerOpen, setContentDrawerOpen] = useState(false);

  const setToggleLoops = usePlayerViewModeStore(
    (state) => state.setToggleLoops,
  );

  return (
    <div className="p-0">
      <div className="flex flex-col sm:flex-row items-center justify-between sm:px-4 gap-3 sm:gap-16">
        <div></div>
        <div className="px-6 sm:px-8 flex items-center gap-4 rounded-full">
          <button
            onClick={() => {
              setToggleLoops([]);
              setLoop((loop: any) => {
                if (loop) {
                  return null;
                }
                return currentTranscription.id;
              });
            }}
            className={cn(
              "text-xl font-bold p-2",
              "cursor-pointer",
              loop ? "text-rose-500 font-bold" : "text-gray-600",
            )}
          >
            {loop ? (
              <Icons.loop className="text-rose-500" />
            ) : (
              <Icons.loop className="text-gray-600" />
            )}
          </button>

          <button onClick={seekBefore} className="p-2 rounded-full">
            <Icons.rotateLeft className="text-xl" />
          </button>

          <button
            onClick={handlePlayPause}
            className="rounded-full w-10 sm:w-8"
          >
            {playing ? (
              <Icons.pause className="text-2xl" />
            ) : (
              <Icons.play className="text-2xl" />
            )}
          </button>

          <button onClick={seekAfter} className="p-2 rounded-full">
            <Icons.rotateRight className="text-xl" />
          </button>

          <button
            onClick={() => setContentDrawerOpen(true)}
            className="p-2 rounded-full"
          >
            <Icons.list className="text-xl" />
          </button>

          <AudioBookSettingsPopover
            isReaderView={isReaderView}
            containsChinglish={containsChinglish}
            showEn={showEn}
            isYoutubeOrVideo={isYoutubeOrVideo}
          />
        </div>

        <div></div>
      </div>

      <ContentSuggestionsDrawer
        open={contentDrawerOpen}
        onOpenChange={setContentDrawerOpen}
        contentId={contentId}
      />
    </div>
  );
}
