import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AudioBookSettingsPopover } from "./audiobook-settings-popover";
import { ContentSuggestionsDrawer } from "./content-suggestions-drawer";
import { AddToContentCollectionDialog } from "@/components/content-collections/add-to-content-collection-dialog";
import { ContentToCollect } from "@/domain/content-collections/content-collections.types";
import { LoopButton } from "./loop-button";

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
  contentId,
  content,
  dynamicLoop,
}: any) {
  const [contentDrawerOpen, setContentDrawerOpen] = useState(false);
  const [collectionDialogContent, setCollectionDialogContent] =
    useState<ContentToCollect | null>(null);

  // The loop button. Tapping it loops what the reader has chosen: the
  // transcripts they starred with the repeat button beside them, which is the
  // entire reason for starring them. Without a selection it keeps its old
  // meaning — loop the line I am on — and a one second hold opens the section
  // picker, or leaves the loop and takes the playhead back where it was.
  const handleLoopTap = () => {
    if (!dynamicLoop) {
      setLoop((current: any) => (current ? null : currentTranscription.id));
      return;
    }

    if (dynamicLoop.mode === "selecting") {
      // Choosing a section: the tap is the "keep it" button.
      dynamicLoop.commit();
      return;
    }

    if (dynamicLoop.mode === "active") {
      // Looping already: the tap reopens the picker.
      dynamicLoop.edit();
      return;
    }

    // The starred transcripts, as a section, right now. The selection is left
    // alone: it is the reader's, and it is what makes the loop repeatable.
    if (dynamicLoop.loopSelection()) {
      return;
    }

    setLoop((current: any) => (current ? null : currentTranscription.id));
  };

  return (
    <div className="p-0">
      <div className="flex flex-col sm:flex-row items-center justify-between sm:px-4 gap-3 sm:gap-16">
        <div></div>
        <div className="px-6 sm:px-8 flex items-center gap-4 rounded-full">
          {dynamicLoop ? (
            <LoopButton
              mode={dynamicLoop.mode}
              lineLoop={!!loop || dynamicLoop.selectionCount > 0}
              canLoop={dynamicLoop.canLoop}
              selectionCount={dynamicLoop.selectionCount}
              onTap={handleLoopTap}
              onEnter={dynamicLoop.begin}
              onExit={dynamicLoop.exit}
            />
          ) : (
            <button
              onClick={handleLoopTap}
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
          )}

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
            containsChinglish={containsChinglish}
            showEn={showEn}
            isYoutubeOrVideo={isYoutubeOrVideo}
            content={content}
            contentId={contentId}
            onAddToCollection={(contentToCollect: ContentToCollect) =>
              setCollectionDialogContent(contentToCollect)
            }
          />
        </div>

        <div></div>
      </div>

      <ContentSuggestionsDrawer
        open={contentDrawerOpen}
        onOpenChange={setContentDrawerOpen}
        contentId={contentId}
      />

      {/* Rendered here (not inside the popover) so closing the popover does not
          unmount the dialog. */}
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
