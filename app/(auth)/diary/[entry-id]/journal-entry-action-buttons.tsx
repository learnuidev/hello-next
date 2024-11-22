"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSpeak } from "../../convos/_play/use-speak";
import { useGetJournalDetailsQuery } from "../hooks/use-get-journal-details-query";
import { useGetJournalEntryQuery } from "../hooks/use-get-journal-entry-query";
import { useJournalDetailStore } from "./use-journal-detail-store";
import { useEntryParams } from "./use-entry-params";

export function JournalEntryActionButtons({ entryId }: { entryId: string }) {
  const showHanzi = useJournalDetailStore((state) => state.showHanzi);
  const setShowHanzi = useJournalDetailStore((state) => state.setShowHanzi);
  const { data: journalDetails } = useGetJournalDetailsQuery(entryId);
  const { view } = useEntryParams();

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
    <section className="mt-8 mb-8  flex justify-between items-center">
      {view === "insights" ? (
        <div></div>
      ) : (
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
      )}
      {/* )} */}

      {view === "insights" ? (
        <Link
          href={`/diary/${entryId}`}
          className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-800"
        >
          <Icons.diary />
        </Link>
      ) : (
        <Link
          href={`/diary/${entryId}?view=insights`}
          className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-800"
        >
          <Icons.chartColumn />
        </Link>
      )}
    </section>
  );
}
