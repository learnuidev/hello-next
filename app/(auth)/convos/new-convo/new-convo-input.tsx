"use client";

// ts-ignore next
import { chineseConverter } from "mandarino/src/utils/chinese-converter";

import { useState } from "react";

import { StepTitle, useNewConvoStore } from "@/components/step";
import { Label } from "@/components/ui/label";

export function NewConvoInput() {
  const [showJSON, setShowJSON] = useState(false);

  const newConvo = useNewConvoStore((state) => state.convo) as any;
  const setConvo = useNewConvoStore((state) => state.setConvo);

  const listSections = (story: string, lang: string) => {
    // 1. Split the story by new line
    return (
      story
        ?.split("\n")
        // 2. Filter out the empty string
        ?.filter(Boolean)
        ?.map((section) => {
          // 3. Added a section id
          const sectionId = crypto.randomUUID();

          // 4. Split the sections by 。As well as filter out empty string
          const sectionItems = section.split("。").filter(Boolean);
          return {
            id: sectionId,
            text: section,
            // 5. Map the transcriptions
            transcriptions: sectionItems.map((transcription) => {
              return {
                id: crypto.randomUUID(),
                sectionId: sectionId,
                lang,
                input:
                  sectionItems?.length === 1
                    ? transcription
                    : `${transcription}。`,
              };
            }),
          };
        })
    );
  };

  const totalSentences = listSections(newConvo?.input, newConvo?.lang);

  return (
    <>
      <Label className=" text-gray-500 mb-4 block">Add text here</Label>
      <textarea
        value={newConvo?.input}
        onChange={(event) => {
          const sents = chineseConverter(event?.target?.value);

          const sections = listSections(sents, newConvo?.lang);

          setConvo("sections", sections);
          setConvo(
            "transcriptions",
            sections.map((section) => section.transcriptions)?.flat()
          );
          setConvo("input", event?.target?.value);
        }}
        // autoFocus
        placeholder=""
        className="p-4 max-w-8xl w-full h-[260px] sm:h-[600px] rounded-xl focus-visible:outline-none focus-visible:ring-ring"
        // className="w-full text-center font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
      />
      <div className="my-8">
        <button
          onClick={() => {
            setShowJSON(!showJSON);
          }}
        >
          {showJSON ? "Hide" : "Show"}
        </button>
      </div>
      {showJSON && totalSentences?.length > 0 && (
        <div>
          <code>
            <pre>{JSON.stringify(totalSentences, null, 2)}</pre>
          </code>
        </div>
      )}
    </>
  );
}
