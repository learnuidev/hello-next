import { Icons } from "@/components/ui/icons.v2";

import { ChinglishButton } from "@/components/chinglish-button";
import { EnButton } from "@/components/en-button";
import { PinyinButton } from "@/components/pinyin-button";
import { ReadModeButton } from "@/components/read-mode-button";

import { PreviewButton } from "@/components/settings-dialog/preview-button";
import { ContentEditButton } from "@/components/youtube-page/content-edit-button";
import { cn } from "@/lib/utils";
import { FontSizeControls } from "./font-size-controls";
import { AudioBookSettingsPopover } from "./audiobook-settings-popover";

// Improve player controls

// Group by following
// edit buttons - transcript editor
//

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
}: any) {
  return (
    <div className="p-0">
      <div className="flex flex-col sm:flex-row items-center justify-between sm:px-4 gap-3 sm:gap-16">
        <div></div>
        <div className="px-6 sm:px-8 flex items-center gap-4 rounded-full">
          <button
            onClick={() => {
              setLoop((loop: any) => {
                if (loop) {
                  return null;
                }
                return currentTranscription;
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

          <AudioBookSettingsPopover
            isReaderView={isReaderView}
            containsChinglish={containsChinglish}
            showEn={showEn}
            isYoutubeOrVideo={isYoutubeOrVideo}
          />
        </div>

        <div></div>
      </div>
    </div>
  );
}
