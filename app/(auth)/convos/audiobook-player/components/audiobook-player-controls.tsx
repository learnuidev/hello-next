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

  // The loop button. A tap is what it has always been — loop the line I am on —
  // and a one second hold is the only way into the dynamic loop, and the way out
  // of it again. Nothing a tap does may open that strip: it carries the section
  // picker, the saved loops and the naming, and none of that belongs on screen
  // for someone who just wanted to loop a line.
  //
  // A loop the reader starred with the repeat button beside a transcript is a
  // different thing entirely and keeps looping on its own, as it always has. The
  // tap leaves that selection alone either way.
  const handleLoopTap = () => {
    if (dynamicLoop?.mode === "selecting") {
      // Choosing a section: the tap is the "keep it" button.
      dynamicLoop.commit();
      return;
    }

    if (dynamicLoop?.mode === "active") {
      // Looping already: the tap reopens the picker.
      dynamicLoop.edit();
      return;
    }

    if (dynamicLoop?.mode === "quiet") {
      // A saved loop running quietly in the regular view: the tap switches it
      // off, and the playhead carries on from where it had got to.
      dynamicLoop.stop();
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
