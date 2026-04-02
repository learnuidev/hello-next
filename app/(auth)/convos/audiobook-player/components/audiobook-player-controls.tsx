import { Icons } from "@/components/ui/icons.v2";

import { ChinglishButton } from "@/components/chinglish-button";
import { EnButton } from "@/components/en-button";
import { PinyinButton } from "@/components/pinyin-button";
import { ReadModeButton } from "@/components/read-mode-button";

import { PreviewButton } from "@/components/settings-dialog/preview-button";
import { ContentEditButton } from "@/components/youtube-page/content-edit-button";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash } from "@fortawesome/pro-thin-svg-icons";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";

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
  const viewMode = usePlayerViewModeStore((state) => state.viewMode);
  const setViewMode = usePlayerViewModeStore((state) => state.setViewMode);
  const isVideoHidden = usePlayerViewModeStore((state) => state.isVideoHidden);
  const setIsVideoHidden = usePlayerViewModeStore(
    (state) => state.setIsVideoHidden
  );

  const toggleKaraokeMode = () => {
    setViewMode((prev: any) => (prev === "karaoke" ? null : "karaoke"));
  };

  return (
    <div className="flex items-center justify-center sm:gap-16 gap-4 bg-gray-50 dark:bg-black p-4 rounded-2xl shadow-sm mb-8">
      <div className="p-2 px-8 flex gap-8 rounded-full">
        <PreviewButton className="text-2xl w-8" />
        <ContentEditButton className="text-2xl w-8" />
      </div>

      <div className="dark:bg-[rgb(21,22,23)] bg-gray-200 p-2 px-8 flex gap-4 rounded-full">
        <button
          className={cn(
            "text-xl",
            loop ? "text-rose-500 font-bold" : "text-gray-600 font-bold"
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

      <div className="p-2 px-8 flex gap-4 rounded-full">
        <PinyinButton className="text-2xl" />

        <EnButton className="text-2xl" />

        <ReadModeButton className="text-2xl" />

        {containsChinglish && (
          <ChinglishButton disabled={!showEn} className={"text-2xl"} />
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-2xl mx-8">
              <Icons.gear />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={() => toggleKaraokeMode()}
              className={cn(
                "cursor-pointer",
                viewMode === "karaoke"
                  ? "text-rose-500 font-bold"
                  : "text-gray-600"
              )}
            >
              Karaoke View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setViewMode((prev: any) => (prev === "para" ? null : "para"))
              }
              className={cn(
                "cursor-pointer",
                viewMode === "para"
                  ? "text-rose-500 font-bold"
                  : "text-gray-600"
              )}
            >
              Paragraph View
            </DropdownMenuItem>
            {isYoutubeOrVideo && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsVideoHidden((isHidden: any) => !isHidden)}
                  className={cn(
                    "cursor-pointer",
                    isVideoHidden ? "text-rose-500 font-bold" : "text-gray-600"
                  )}
                >
                  {isVideoHidden ? (
                    <>
                      <FontAwesomeIcon icon={faVideo} className="mr-2" />
                      Show Video
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faVideoSlash} className="mr-2" />
                      Hide Video
                    </>
                  )}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
