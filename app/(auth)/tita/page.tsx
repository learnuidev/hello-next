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
import { NarakeetVoicesList } from "./narakeet-voices-list";

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

export default function Tita() {
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
    <div>
      <NavBar />
      <main className="px-4 md:px-12">
        <section className="flex mt-16 md:mt-32 justify-center">
          <h1 className="relative text-4xl text-center">
            <span> text to audio </span>
          </h1>

          <div className="mt-[-10px] text-[14px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Icons.circleInfo className="cursor-pointer transition text-gray-500 hover:text-white" />
                </TooltipTrigger>
                <TooltipContent className="text-xs my-4 bg-black opacity-90 w-[300px] space-y-4 p-4">
                  <p className="text-gray-100">
                    Type or paste the
                    <span className="">
                      <a
                        className="underline"
                        href="https://www.narakeet.com/docs/text-to-voice-over/"
                        target="_blank"
                      >
                        {" "}
                        narration script{"  "}
                      </a>
                      <sup>
                        <Icons.externalLink className="text-[6px] mx-[2px]" />
                      </sup>{" "}
                    </span>
                    below, or click Upload File to load the script from a
                    document.
                  </p>

                  <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

                  <div>
                    <p className="text-xs text-gray-300 text-center mt-4 font-bold">
                      You can upload
                    </p>
                    <div className="mt-2">
                      <p>1. Plain text (txt)</p>
                      <p>2. MS Word (doc, docx)</p>
                      <p>3. MS Excel (xls, xlsx)</p>
                      <p>4. PDF</p>
                      <p>5. EPUB</p>
                      <p>6. RTF</p>
                      <p>7. Open Document (odt, ods)</p>
                      <p>8. Subtitle (srt, vtt)</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>

        <section className="flex justify-center my-10 flex-row items-center space-x-4">
          <Select value={lang} onValueChange={handleChange}>
            <SelectTrigger className="w-[320px] text-gray-400 hover:text-white transition">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-black">
              <SelectGroup>
                {narakeetLangs?.map((feature) => {
                  return (
                    <SelectItem
                      className=""
                      key={feature.id}
                      value={feature.id}
                    >
                      {feature.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <NarakeetVoicesList />
        </section>

        <section className="flex justify-center">
          <textarea
            // onKeyDown={(event) => {
            //   if (event?.keyCode === 13) {
            //     if (newConvo.audio) {
            //       setConvo("mediaUrl", newConvo?.audio);
            //       setStep("title");
            //     }
            //   }
            // }}
            autoFocus
            rows={8}
            placeholder=""
            className="sm:w-[655px] w-full font-extralight focus:outline-0 p-2 border-0 border-none dark:text-gray-300"
          />
        </section>

        <section className="text-center my-8">
          <button className="bg-[rgb(11,12,13)] p-2 w-full sm:w-[200px]">
            {" "}
            Create{" "}
          </button>
        </section>
      </main>
    </div>
  );
}
