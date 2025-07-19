import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { MediaList } from "../../../components/media-list";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MediaSettingsDialog({
  isOpen,
  closeDialog,
}: {
  isOpen: boolean;
  closeDialog: () => void;
}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        onClick={() => {
          closeDialog();
        }}
        className="sm:max-w-2xl border-gray-900 bg-gray-50 dark:bg-black left-[50%] top-[50%] translate-x-[-50%] bottom-6 data-[state=closed]:slide-out-to-bottom-16 data-[state=open]:slide-in-from-bottom-16"
      >
        <ScrollArea>
          <MediaList />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
