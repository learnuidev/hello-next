"use client";

import { NavBar } from "@/components/navbar";
import { Icons } from "@/components/ui/icons.v2";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { narakeetLangs } from "@/libs/narakeet/narakeet-langs";
import { useQuery } from "@tanstack/react-query";
import useSound from "use-sound";
import { useTitaStore } from "./use-tita-store";
import { useListNarakeetVoicesQuery } from "./use-list-narakeet-voices-query";
import { useState } from "react";

const PlayVoice = ({ voice }: { voice: string }) => {
  // const audioUrl = `https://www.narakeet.com/samples/voices/yifei.mp3`;

  const [isPlaying, setIsPlaying] = useState(false);

  const audioUrl = `https://www.narakeet.com/samples/voices/${voice}.mp3`;

  console.log("AUDIO URL", audioUrl);

  const [play, { stop, duration, audio }] = useSound(audioUrl) as any;
  // console.log("PROPS", props);
  // const [play, { stop }] = props;

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

export function NarakeetVoicesList() {
  const lang = useTitaStore((state) => state?.lang);
  const voiceItem = useTitaStore((state) => state?.voice);
  const setVoice = useTitaStore((state) => state?.setVoice);
  const setLang = useTitaStore((state) => state?.setLang);

  const handleChange = (language: any) => {
    setLang(language);
  };
  const handleVoiceChange = (voice: any) => {
    console.log("VOICE", voice);
    setVoice(voice);
  };

  const { data: voices } = useListNarakeetVoicesQuery({ lang });

  const voicesList = voices?.map((voice: any) => {
    return {
      id: voice?.name,
      label: voice?.name,
    };
  });

  const voice =
    voices?.find((voice: any) => voice?.name === voiceItem)?.name ||
    voices?.[0]?.name;

  return (
    <section className="flex justify-center flex-row items-center space-x-4">
      {voicesList?.length > 0 ? (
        <Select value={voice} onValueChange={handleVoiceChange}>
          <SelectTrigger className="w-[320px] text-gray-400 hover:text-white transition">
            <SelectValue placeholder="Voice" />
          </SelectTrigger>
          <SelectContent className="bg-black">
            <SelectGroup>
              {voicesList?.map((feature: any) => {
                return (
                  <SelectItem className="" key={feature.id} value={feature.id}>
                    {feature.label}
                  </SelectItem>
                );

                // return (
                //   <CustomSelectItem key={feature.id} id={feature.id}>
                //     {feature.label}
                //   </CustomSelectItem>
                // );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <div className="w-[320px] text-center"> Loading ...</div>
      )}

      {voice && <PlayVoice voice={voice} />}
    </section>
  );
}
