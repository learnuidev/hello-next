import { NarakeetVoicesList } from "@/app/(auth)/tita/narakeet-voices-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons.v2";

export function GenerateAudioDialog() {
  const generateAudio = () => {
    alert("generate audio");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Icons.ai /> Generate
        </button>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader>
          <DialogTitle>Add audio</DialogTitle>
        </DialogHeader>

        <div>
          <NarakeetVoicesList />
        </div>

        <DialogFooter>
          <Button onClick={generateAudio}>Generate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
