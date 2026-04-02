import { Icons } from "@/components/ui/icons.v2";

import { ChinglishButton } from "@/components/chinglish-button";
import { EnButton } from "@/components/en-button";
import { PinyinButton } from "@/components/pinyin-button";
import { ReadModeButton } from "@/components/read-mode-button";

import { PreviewButton } from "@/components/settings-dialog/preview-button";
import { ContentEditButton } from "@/components/youtube-page/content-edit-button";
import { cn } from "@/lib/utils";

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
}: any) {
  return (
    <div className="flex items-center justify-center sm:gap-16 gap-4 bg-gray-50 dark:bg-black p-4 rounded-2xl shadow-sm mb-8">
      <div className="dark:bg-[rgb(21,22,23)] p-2 px-8 flex gap-4 rounded-full">
        <ContentEditButton />
      </div>

      <div className="dark:bg-[rgb(21,22,23)] p-2 px-8 flex gap-4 rounded-full">
        <button
          className={cn(
            "text-xl",
            loop
              ? "dark:text-white text-black font-bold"
              : "dark:text-gray-600 text-gray-300"
          )}
          onClick={() => {
            setLoop((loop: any) => {
              if (loop) {
                return null;
              }

              return currentTranscription;
            });
          }}
        >
          <Icons.loop />
        </button>

        <button onClick={handlePlayPause} className="rounded-full w-8">
          {playing ? (
            <Icons.pause className="text-2xl" />
          ) : (
            <Icons.play className="text-2xl" />
          )}
        </button>

        <button onClick={seekBefore} className="p-2 rounded-full ">
          <Icons.rotateLeft className="text-xl" />
        </button>

        <button onClick={seekAfter} className="rounded-full ">
          <Icons.rotateRight className="text-xl" />
        </button>
      </div>

      <div className="dark:bg-[rgb(21,22,23)] p-2 px-8 flex gap-4 rounded-full">
        <PinyinButton className="text-2xl" />

        <EnButton className="text-2xl" />

        <ReadModeButton className="text-2xl" />

        <ChinglishButton
          disabled={!(showEn && containsChinglish)}
          className={"text-2xl"}
        />

        <PreviewButton />
      </div>
    </div>
  );
}
