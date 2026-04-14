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
}: any) {
  return (
    <div className="bg-gray-50 dark:bg-[rgb(11,12,13)] sm:dark:bg-black p-0 pb-2 sm:p-4 rounded-2xl shadow-sm mb-2 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-16">
        <div className="hidden sm:flex p-2 px-8 gap-4 rounded-full">
          <FontSizeControls />
          <PreviewButton className="text-2xl w-8" />
          <ContentEditButton className="text-2xl w-8" />
        </div>

        <div className="dark:bg-[rgb(21,22,23)] bg-gray-200 p-2 px-6 sm:px-8 flex items-center gap-4 rounded-full">
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
              loop ? "text-rose-500 font-bold" : "text-gray-600"
            )}
          >
            {loop ? (
              <Icons.loop className="text-rose-500" />
            ) : (
              <Icons.loop className="text-gray-600" />
            )}
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

          <button onClick={seekBefore} className="p-2 rounded-full">
            <Icons.rotateLeft className="text-xl" />
          </button>

          <button onClick={seekAfter} className="p-2 rounded-full">
            <Icons.rotateRight className="text-xl" />
          </button>

          <AudioBookSettingsPopover
            containsChinglish={containsChinglish}
            showEn={showEn}
            isYoutubeOrVideo={isYoutubeOrVideo}
          />
        </div>

        <div className="hidden sm:flex p-2 px-8 gap-4 rounded-full">
          <PinyinButton className="text-2xl" />
          <EnButton className="text-2xl" />
          <ReadModeButton className="text-2xl" />
          {containsChinglish && (
            <ChinglishButton disabled={!showEn} className={"text-2xl"} />
          )}
        </div>
      </div>
    </div>
  );
}
