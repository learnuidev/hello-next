"use client";

import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { groupBy } from "ramda";
import {
  JournalEntryDate,
  JournalEntryTitle,
} from "../components/journal-entry-item";
import {
  JournalTranslation,
  useGetJournalDetailsQuery,
} from "../hooks/use-get-journal-details-query";
import { useGetJournalEntryQuery } from "../hooks/use-get-journal-entry-query";
import { useEntryParams } from "./use-entry-params";
import { useJournalDetailStore } from "./use-journal-detail-store";
import { useSpeak } from "../../convos/_play/use-speak";
import { useGetCharacterAnalytics } from "@/components/_select-character/use-get-character-analytics";

function JournalDetailsBody({ entryId }: { entryId: string }) {
  const { data: journalDetails } = useGetJournalDetailsQuery(entryId);
  const showHanzi = useJournalDetailStore((state) => state.showHanzi);
  const { speak, isSpeaking, currentString, charStartIndex, charEndIndex } =
    useSpeak();

  const { data: journalEntry } = useGetJournalEntryQuery(entryId);

  const hanzis =
    journalDetails?.translations?.map((item) => item?.hanzi).join(" ") || "";

  const characterAnalytics = useGetCharacterAnalytics({
    characterId: hanzis,
    lang: "zh",
  });

  // console.log("CHARACTER ANALYTICS", characterAnalytics);

  if (!journalDetails) {
    return <div className="text-lg">{journalEntry?.text}</div>;
  }

  const groupBySectionId = groupBy(
    (item: JournalTranslation) => item.sectionId
  );

  return (
    <div>
      {Object.entries(
        groupBySectionId(journalDetails.translations) as any
      )?.map((val) => {
        const transcriptions = val[1] as JournalTranslation[];
        return (
          <div key={JSON.stringify(val)}>
            <div className="text-[16px] sm:text-lg gap-4">
              <div className="py-2">
                {transcriptions?.map((transcription: JournalTranslation) => {
                  return (
                    <span
                      onClick={() => {
                        // if (showHanzi) {
                        speak(transcription?.hanzi);
                        // }
                      }}
                      key={JSON.stringify(transcription)}
                      className={cn(
                        "text-center h-24",
                        "text-gray-300",
                        currentString
                          ? currentString === transcription?.hanzi
                            ? "dark:text-white"
                            : "dark:text-gray-600"
                          : ""
                      )}
                    >
                      {showHanzi
                        ? transcription?.hanzi?.split("").map((char, i) => {
                            return (
                              <span
                                key={`${char}-${i}`}
                                className={
                                  currentString &&
                                  currentString === transcription?.hanzi
                                    ? i >= charStartIndex && i <= charEndIndex
                                      ? "bg-rose-600"
                                      : ""
                                    : ""
                                }
                              >
                                {char}
                              </span>
                            );
                          })
                        : transcription?.en}{" "}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* <section className="mt-8 text-gray-600">
        <code>
          <pre>{JSON.stringify(journalEntry, null, 4)}</pre>
        </code>
        <code>
          <pre>{JSON.stringify(journalDetails, null, 4)}</pre>
        </code>
      </section> */}
    </div>
  );
}

export function JournalEntryDetails() {
  const { entryId } = useEntryParams();
  const showHanzi = useJournalDetailStore((state) => state.showHanzi);
  const setShowHanzi = useJournalDetailStore((state) => state.setShowHanzi);
  const { data: journalDetails } = useGetJournalDetailsQuery(entryId);

  const { data: journalEntry } = useGetJournalEntryQuery(entryId);

  const { speak, isSpeaking, currentString, stopSpeaking, voicesList } =
    useSpeak();

  if (!journalEntry) {
    return null;
  }

  const hanzi =
    journalDetails?.translations
      ?.map((translation) => translation?.hanzi)
      ?.join(" ") || "";

  return (
    <div className="px-4 md:px-12">
      <div className="mt-12 flex justify-between items-center">
        <div>
          <JournalEntryDate
            className="text-sm sm:text-[16px]"
            journalEntry={journalEntry}
          />
          <JournalEntryTitle
            className="sm:text-2xl text-xl"
            journalEntry={journalEntry}
          />
        </div>

        <Link href="/diary">
          <Icons.xMark className="text-2xl" />
        </Link>
      </div>

      <div className="mt-8">
        <JournalDetailsBody entryId={entryId} />
      </div>

      <section className="mt-8 mb-8  flex justify-between items-center">
        <div className="space-x-4 flex items-center">
          <button
            className={cn(
              "dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-800",
              showHanzi ? "dark:text-white text-black" : "text-gray-400"
            )}
            // className={cn(
            //   showHanzi ? "dark:text-white text-black" : "text-gray-400"
            // )}
            onClick={() => {
              setShowHanzi(!showHanzi);
            }}
          >
            <Icons.language className="text-2xl" />
          </button>
          {/* {showHanzi && ( */}
          <button
            className={cn(
              "mt-[-4px]",
              "dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-800"
            )}
            onClick={() => {
              if (isSpeaking) {
                stopSpeaking();
              } else {
                speak(hanzi);
              }
            }}
          >
            {isSpeaking ? <Icons.pause /> : <Icons.play />}
          </button>
        </div>
        {/* )} */}

        <Link
          href={`/diary/${entryId}?view=insights`}
          className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-800"
        >
          <Icons.chartColumn />
        </Link>
      </section>

      <div className="">
        {journalEntry?.emotions?.split(", ").map((emotion) => {
          return (
            <Link key={emotion} href={`/diary?emotion=${emotion}`}>
              <Badge
                variant="outline"
                className="mr-2 my-[4px] border-gray-600 text-gray-500"
              >
                {emotion}
              </Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
