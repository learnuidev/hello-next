import { NarakeetVoicesList } from "@/app/(auth)/tita/narakeet-voices-list";
import { useGetAudioResourceQuery } from "@/app/(auth)/tita/use-get-audio-resource-query";
import { useStartGeneratingAudioMutation } from "@/app/(auth)/tita/use-start-generating-audio-mutation";
import { useTitaStore } from "@/app/(auth)/tita/use-tita-store";
import { useUploadAudioMutation } from "@/app/(auth)/tita/use-upload-audio-mutation";
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
import { getComponentQueryKey } from "@/domain/lesson/use-get-component-query";
import { listMeaningQueryKey } from "@/domain/sentence/meaning.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { IGetAudioResourceResponse } from "@/libs/narakeet/narakeet";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSound from "use-sound";

const PlayVoice = ({ audioUrl }: { audioUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("AUDIO URL", audioUrl);

  const [play, { stop, duration, audio }] = useSound(audioUrl) as any;

  console.log("DURATION", duration);
  return (
    <button
      className="px-2"
      onClick={() => {
        if (!isPlaying) {
          setIsPlaying(true);
          play();
        } else {
          setIsPlaying(false);
          stop();
        }
      }}
    >
      {isPlaying ? (
        <Icons.pause className="text-2xl" />
      ) : (
        <Icons.play className="text-2xl" />
      )}
    </button>
  );
};

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
  meaningId,
  children,
}: {
  currentPhrase: IComponent;
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  meaningId: string;
  children?: React.ReactNode;
}) {
  const lang = useGetCurrentLang();
  const router = useRouter();
  const voiceItem = useTitaStore((state) => state?.voice);
  const setAudioResource = useTitaStore((state) => state.setAudioResource);
  const audioResource = useTitaStore((state) => state.audioResource) as any;
  const resourceStatus = useTitaStore((state) => state.resourceStatus);
  const setResourceStatus = useTitaStore((state) => state.setResourceStatus);
  const startGeneratingAudioMutation = useStartGeneratingAudioMutation();
  const queryClient = useQueryClient();

  const uploadAudioMutation = useUploadAudioMutation();
  const generateAudio = () => {
    return startGeneratingAudioMutation
      .mutateAsync({
        text: currentPhrase?.hanzi,
        voice: voiceItem,
        speed: 0.7,
        volume: "standard",
      })
      .then((res) => {
        setResourceStatus(null);
        setAudioResource(res);
      });
  };

  const searchParams = useSearchParams();
  const statusUrl = audioResource?.statusUrl || "";

  const {
    data,
    isLoading: isAudioLoading,
    isPaused,
  } = useGetAudioResourceQuery(
    {
      statusUrl: statusUrl,
    },
    {
      onSuccess: (data: IGetAudioResourceResponse) => {
        setResourceStatus(data);
      },
    }
  );

  const audioUrl = (resourceStatus as any)?.result;

  return (
    <Dialog
      open={isOpen}
      // @ts-ignore
    >
      <DialogTrigger
        onClick={() => {
          openDialog();
        }}
      >
        <button>
          <Icons.ai /> {children || "Generate"}
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] bg-black"
        onClick={() => {
          closeDialog();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add audio</DialogTitle>
        </DialogHeader>

        <div>
          <NarakeetVoicesList />

          <div className="mt-8">
            {startGeneratingAudioMutation?.isLoading ? (
              <p>Generating...</p>
            ) : !data ? (
              <div> </div>
            ) : isAudioLoading ? (
              <p>Loading Audio..</p>
            ) : !audioUrl ? (
              <div> </div>
            ) : (
              <div>
                {audioUrl && (
                  <div>
                    <PlayVoice audioUrl={audioUrl} />

                    <button
                      disabled={!audioUrl}
                      onClick={() => {
                        uploadAudioMutation
                          .mutateAsync({
                            meaningId,
                            audioUrl,
                            component: currentPhrase?.hanzi,
                            componentId: currentPhrase?.id,
                          })
                          .then((resp) => {
                            // alert(JSON.stringify(resp));
                            setResourceStatus(null);
                            setAudioResource(null);
                            queryClient.invalidateQueries([
                              getComponentQueryKey,
                              currentPhrase?.hanzi,
                            ]);

                            closeDialog();
                          });
                      }}
                    >
                      Upload Audio{" "}
                    </button>
                  </div>
                )}
              </div>
            )}

            <div>
              {audioUrl && (
                <div className="flex justify-start space-x-4 items-center">
                  <PlayVoice audioUrl={audioUrl} />

                  <button
                    disabled={!audioUrl}
                    onClick={() => {
                      uploadAudioMutation
                        .mutateAsync({
                          meaningId,
                          audioUrl,
                          component: currentPhrase?.hanzi,
                          componentId: currentPhrase?.id,
                        })
                        .then((resp) => {
                          setResourceStatus(null);
                          setAudioResource(null);
                          queryClient.invalidateQueries([
                            listMeaningQueryKey,
                            currentPhrase?.hanzi,
                            lang,
                          ]);
                          // queryClient.invalidateQueries([
                          //   getComponentQueryKey,
                          //   currentPhrase?.hanzi,
                          // ]);

                          closeDialog();
                        });
                    }}
                  >
                    Upload Audio{" "}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* <div>{JSON.stringify(resourceStatus, null, 2)}</div> */}
        </div>

        <DialogFooter>
          <Button onClick={generateAudio}>Generate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
