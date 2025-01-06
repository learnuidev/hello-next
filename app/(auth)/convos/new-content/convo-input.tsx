"use client";

import { convoContentStore } from "./use-convos-store";
import { chineseConverter } from "mandarino/src/utils/chinese-converter";
import { useState } from "react";
import { StepTitle, useNewConvoStore } from "@/components/step";

export function ConvoInput() {
  const [showJSON, setShowJSON] = useState(false);
  const newConvo = useNewConvoStore((state) => state.convo) as any;
  const setConvo = useNewConvoStore((state) => state.setConvo);

  const convoContent = convoContentStore((state) => state.content);
  const setConvoContent = convoContentStore((state) => state.setContent);

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

  const sents = chineseConverter(convoContent);

  const sections = listSections(sents, newConvo?.lang);
  const transcriptions = sections?.map((section) => section?.phrases).flat();

  const totalSentences = listSections(convoContent, newConvo?.lang);

  return (
    <>
      {" "}
      <StepTitle>add text here</StepTitle>
      <textarea
        value={convoContent}
        onChange={(event) => {
          setConvoContent(event?.target?.value);
        }}
        autoFocus
        placeholder="Add content here"
        className="p-4 w-full h-[260px] rounded-xl focus-visible:outline-none focus-visible:ring-ring"
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
        <div className="mt-8">
          <code>
            <pre>{JSON.stringify(totalSentences, null, 2)}</pre>
          </code>
        </div>
      )}
    </>
  );
}
