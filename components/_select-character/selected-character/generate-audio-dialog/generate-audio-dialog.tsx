import { NarakeetVoicesList } from "@/app/(auth)/tita/narakeet-voices-list";
import { useGetAudioResourceQuery } from "@/app/(auth)/tita/use-get-audio-resource-query";
import { useStartGeneratingAudioMutation } from "@/app/(auth)/tita/use-start-generating-audio-mutation";
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
import { IGetAudioResourceResponse } from "@/libs/narakeet/narakeet";
import { useRouter, useSearchParams } from "next/navigation";

// Todos:

// 1. Generate text to audio -> DONE
// 2. Check if the status has succeeded -> DONE
// 3. Once the status has succeeded save the audio in s3 -> TODO
// 4. Once the file has saved in s3, update user assets table
// 5. Once it has been saved in user assets, update the component to include audio url

export function GenerateAudioDialog({
  currentPhrase,
  isOpen,
  openDialog,
  closeDialog,
}: {
  currentPhrase: IComponent;
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}) {
  const router = useRouter();
  const voiceItem = useTitaStore((state) => state?.voice);
  const setAudioResource = useTitaStore((state) => state.setAudioResource);
  const audioResource = useTitaStore((state) => state.audioResource) as any;
  const resourceStatus = useTitaStore((state) => state.resourceStatus);
  const setResourceStatus = useTitaStore((state) => state.setResourceStatus);
  const startGeneratingAudioMutation = useStartGeneratingAudioMutation();
  const generateAudio = () => {
    return startGeneratingAudioMutation
      .mutateAsync({
        text: currentPhrase?.hanzi,
        voice: voiceItem,
        speed: 0.7,
        volume: "soft",
      })
      .then((res) => {
        setAudioResource(res);
        // router.push(
        //   `/nmm/${currentPhrase.hanzi}?lang=zh&status-url=${res.statusUrl}`
        // );
      });
  };

  const searchParams = useSearchParams();
  const statusUrl = audioResource?.statusUrl || "";

  const { data } = useGetAudioResourceQuery(
    {
      statusUrl: statusUrl,
    },
    {
      onSuccess: (data: IGetAudioResourceResponse) => {
        setResourceStatus(data);
        // console.log("DATA", data);
      },
    }
  );

  console.log("RESOURCE STATUS", resourceStatus);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        onClick={() => {
          openDialog();
        }}
      >
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

          <div>{JSON.stringify(data, null, 2)}</div>
        </div>

        <DialogFooter>
          <Button onClick={generateAudio}>Generate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
