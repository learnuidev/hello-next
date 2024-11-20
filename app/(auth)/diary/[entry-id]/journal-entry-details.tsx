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

function JournalDetailsBody({ entryId }: { entryId: string }) {
  const { data: journalDetails } = useGetJournalDetailsQuery(entryId);
  const showHanzi = useJournalDetailStore((state) => state.showHanzi);

  const { data: journalEntry } = useGetJournalEntryQuery(entryId);

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
                      key={JSON.stringify(transcription)}
                      className={cn("text-center h-24", "text-gray-300")}
                    >
                      {showHanzi ? transcription?.hanzi : transcription?.en}{" "}
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

  const { speak } = useSpeak();

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

      <section className="mt-8 mb-8 space-x-4 flex items-center">
        <button
          className={cn(
            showHanzi ? "dark:text-white text-black" : "text-gray-400"
          )}
          onClick={() => {
            setShowHanzi(!showHanzi);
          }}
        >
          <Icons.language className="text-2xl" />
        </button>
        {showHanzi && (
          <button
            className={cn(
              "mt-[-4px]",
              showHanzi ? "dark:text-white text-black" : "text-gray-400"
            )}
            onClick={() => {
              speak(hanzi);
            }}
          >
            <Icons.play />
          </button>
        )}
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
