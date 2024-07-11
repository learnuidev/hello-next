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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { narakeetLangs } from "@/libs/narakeet/narakeet-langs";

export default function Tita() {
  const handleChange = () => {};
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
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[320px] text-gray-400 hover:text-white transition">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-black">
              <SelectGroup>
                {narakeetLangs?.map((feature) => {
                  return (
                    <SelectItem
                      className="px-2"
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
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[320px] text-gray-400 hover:text-white transition">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-black">
              <SelectGroup>
                {narakeetLangs?.map((feature) => {
                  return (
                    <SelectItem
                      className="px-2"
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
