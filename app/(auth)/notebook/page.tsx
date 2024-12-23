"use client";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Icons } from "@/components/ui/icons.v2";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { cn } from "@/lib/utils";
import { ElevenlabsVoice } from "@/libs/elevenlabs/voices/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useSound from "use-sound";

interface IListVoicesResponse {
  voices: ElevenlabsVoice[];
}
const useListVoices = () => {
  const { data: authUser } = useCurrentAuthUser();
  return useQuery<IListVoicesResponse, Error>({
    queryKey: ["elevenlabs/list-voices"],
    queryFn: async () => {
      const response = await fetch("/api/elevenlabs-voices-list-voices", {
        method: "POST",
        headers: {
          Authorization: `${authUser?.jwt}`,
        },
      });

      return response.json();
    },
  });
};

const useGetUserSubscription = () => {
  const { data: authUser } = useCurrentAuthUser();
  return useQuery<IListVoicesResponse, Error>({
    queryKey: ["elevenlabs/get-subscription"],
    queryFn: async () => {
      const response = await fetch("/api/elevenlabs-user-get-subscription", {
        method: "POST",
        headers: {
          Authorization: `${authUser?.jwt}`,
        },
      });

      return response.json();
    },
  });
};

const useListHistory = () => {
  const { data: authUser } = useCurrentAuthUser();
  return useQuery<IListVoicesResponse, Error>({
    queryKey: ["elevenlabs/list-history"],
    queryFn: async () => {
      const response = await fetch("/api/elevenlabs-history-get-all", {
        method: "POST",
        headers: {
          Authorization: `${authUser?.jwt}`,
        },
      });

      return response.json();
    },
  });
};

function VoiceItem({ voice }: { voice: ElevenlabsVoice }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop, duration, audio }] = useSound(voice?.preview_url) as any;

  if (!voice?.preview_url) {
    return null;
  }
  return (
    <div>
      <div className="flex justify-between items-center px-4">
        <div>
          <h2>{voice?.name}</h2>
          <p className="text-gray-400">{voice?.labels?.accent}</p>
        </div>
        <button
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
      </div>
    </div>
  );
}

export default function NotebookLM() {
  const { data: voices, isLoading } = useListVoices();
  const { data: subscription } = useGetUserSubscription();
  const { data: history } = useListHistory();
  const [selectedUseCase, setUseCase] = useState("conversational");

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  const conversationalVoices = voices?.voices?.filter(
    (voice) => voice?.labels?.use_case === selectedUseCase
  );

  const useCases = [
    ...new Set(voices?.voices?.map((voice) => voice?.labels?.use_case)),
  ];

  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mt-12 text-center font-bold text-4xl">
        Notebook LM Clone
      </h1>

      <div className="px-4 space-x-8 flex my-16 justify-center items-center">
        {useCases?.map((useCase) => {
          return (
            <button
              onClick={() => {
                setUseCase(useCase);
              }}
              className={cn(
                "text-gray-400 hover:text-white transition",
                useCase === selectedUseCase ? "text-white" : "text-gray-400"
              )}
              key={useCase}
            >
              {useCase}
            </button>
          );
        })}
      </div>

      <div className="space-y-4 mt-12 mb-24">
        {conversationalVoices?.map((voice) => {
          return <VoiceItem voice={voice} key={voice?.voice_id} />;
        })}
      </div>

      {/* <section>
        <code>
          <pre>{JSON.stringify(history, null, 4)}</pre>
        </code>
      </section> */}
      <section>
        <code>
          <pre>{JSON.stringify(subscription, null, 4)}</pre>
        </code>
      </section>
      <section>
        <code>
          <pre>{JSON.stringify(conversationalVoices, null, 4)}</pre>
        </code>
      </section>
    </div>
  );
}
