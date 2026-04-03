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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash } from "@fortawesome/pro-thin-svg-icons";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { FontSizeControls } from "./font-size-controls";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="bg-gray-50 dark:bg-black p-3 sm:p-4 rounded-2xl shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-16">
        <div className="hidden sm:flex p-2 px-8 gap-4 rounded-full">
          <FontSizeControls />
          <PreviewButton className="text-2xl w-8" />
          <ContentEditButton className="text-2xl w-8" />
        </div>

        <div className="dark:bg-[rgb(21,22,23)] bg-gray-200 p-2 px-6 sm:px-8 flex items-center gap-4 rounded-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-xl font-bold p-2">
                {loop ? (
                  <Icons.loop className="text-rose-500" />
                ) : (
                  <Icons.loop className="text-gray-600" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem
                onClick={() => {
                  setLoop((loop: any) => {
                    if (loop) {
                      return null;
                    }
                    return currentTranscription;
                  });
                }}
                className={cn(
                  "cursor-pointer",
                  loop ? "text-rose-500 font-bold" : "text-gray-600"
                )}
              >
                Loop Current
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLoop(null)}
                className="cursor-pointer text-gray-600"
              >
                Clear Loop
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button onClick={handlePlayPause} className="rounded-full w-10 sm:w-8">
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

          <div className="hidden sm:block">
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
                    setViewMode((prev: any) =>
                      prev === "reader" ? null : "reader"
                    )
                  }
                  className={cn(
                    "cursor-pointer",
                    viewMode === "reader"
                      ? "text-rose-500 font-bold"
                      : "text-gray-600"
                  )}
                >
                  Reader View
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="sm:hidden p-2 h-10 w-10 hover:bg-transparent">
                <Icons.gear className="text-xl" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72">
              <ScrollArea className="max-h-96">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Tools</p>
                    <div className="flex gap-2">
                      <FontSizeControls />
                      <PreviewButton className="text-xl w-7" />
                      <ContentEditButton className="text-xl w-7" />
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Language</p>
                    <div className="flex gap-2">
                      <PinyinButton className="text-xl" />
                      <EnButton className="text-xl" />
                      <ReadModeButton className="text-xl" />
                    </div>
                    {containsChinglish && (
                      <div className="mt-2">
                        <ChinglishButton disabled={!showEn} className={"text-xl"} />
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">View Mode</p>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start",
                          viewMode === "karaoke"
                            ? "text-rose-500 font-bold"
                            : "text-gray-600"
                        )}
                        onClick={() => toggleKaraokeMode()}
                      >
                        Karaoke View
                      </Button>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start",
                          viewMode === "reader"
                            ? "text-rose-500 font-bold"
                            : "text-gray-600"
                        )}
                        onClick={() =>
                          setViewMode((prev: any) =>
                            prev === "reader" ? null : "reader"
                          )
                        }
                      >
                        Reader View
                      </Button>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start",
                          viewMode === "para"
                            ? "text-rose-500 font-bold"
                            : "text-gray-600"
                        )}
                        onClick={() =>
                          setViewMode((prev: any) => (prev === "para" ? null : "para"))
                        }
                      >
                        Paragraph View
                      </Button>
                    </div>
                  </div>
                  {isYoutubeOrVideo && (
                    <div className="border-t pt-4">
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start",
                          isVideoHidden ? "text-rose-500 font-bold" : "text-gray-600"
                        )}
                        onClick={() => setIsVideoHidden((isHidden: any) => !isHidden)}
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
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
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
