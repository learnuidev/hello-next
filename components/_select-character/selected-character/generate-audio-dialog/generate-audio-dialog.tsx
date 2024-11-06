import { NarakeetVoicesList } from "@/app/(auth)/tita/narakeet-voices-list";
import { useTitaStore } from "@/app/(auth)/tita/use-tita-store";
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
import { IComponent } from "@/domain/lesson/component.queries";

// Todos:

// 1. Generate text to audio

export function GenerateAudioDialog({
  currentPhrase,
}: {
  currentPhrase: IComponent;
}) {
  const generateAudio = () => {
    alert("generate audio");
  };

  const voiceItem = useTitaStore((state) => state?.voice);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Icons.ai /> Generate
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader>
          <DialogTitle>Add audio</DialogTitle>
        </DialogHeader>

        <div>{voiceItem}</div>

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
