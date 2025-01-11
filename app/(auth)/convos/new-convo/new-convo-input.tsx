"use client";

// ts-ignore next
import { chineseConverter } from "mandarino/src/utils/chinese-converter";

import { useState } from "react";

import { StepTitle, useNewConvoStore } from "@/components/step";

export function NewConvoInput() {
  const [showJSON, setShowJSON] = useState(false);

  const newConvo = useNewConvoStore((state) => state.convo) as any;
  const setConvo = useNewConvoStore((state) => state.setConvo);

  const listSections = (txt: string, lang: string) => {
    if (lang === "zh") {
      return txt
        ?.replaceAll("–", "")
        .split("\n")
        .filter(Boolean)
        ?.map((x) => {
          const sectionId = crypto.randomUUID();
          return {
            id: sectionId,
            type: "section",
            text: x?.trim(),
            phrases: x
              .trim()
              .split("。")
              ?.filter(Boolean)
              ?.map((phrase) => {
                return {
                  id: crypto.randomUUID(),
                  sectionId,
                  lang: "zh",
                  input: phrase,
                };
              }),
          };
        })
        .flat();
    }
    // return txt?.replaceAll("–", "").split("\n").filter(Boolean);
    return txt
      ?.replaceAll("–", "")
      .split("\n")
      .filter(Boolean)
      ?.map((x) => {
        return {
          id: crypto.randomUUID(),
          type: "section",
          text: x?.trim(),
          phrases: x
            .trim()
            .split(".")
            ?.filter(Boolean)
            ?.map((phrase) => {
              return {
                id: crypto.randomUUID(),
                lang: lang,
                input: phrase,
              };
            }),
        };
      })
      .flat();
  };

  const totalSentences = listSections(newConvo?.input, newConvo?.lang);

  return (
    <>
      <StepTitle>add text here</StepTitle>
      <textarea
        value={newConvo?.input}
        onChange={(event) => {
          const sents = chineseConverter(event?.target?.value);

          const sections = listSections(sents, newConvo?.lang);

          setConvo("sections", sections);
          setConvo(
            "transcriptions",
            sections?.map((section) => section?.phrases).flat()
          );
          setConvo("input", event?.target?.value);
        }}
        autoFocus
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
