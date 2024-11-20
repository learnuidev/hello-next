"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useEntryParams } from "./use-entry-params";
import {
  JournalTranslation,
  useGetJournalDetailsQuery,
} from "../hooks/use-get-journal-details-query";
import { useGetJournalEntryQuery } from "../hooks/use-get-journal-entry-query";
import {
  JournalEntryDate,
  JournalEntryTitle,
} from "../components/journal-entry-item";
import { groupBy } from "ramda";
import { Icons } from "@/components/ui/icons.v2";
import { useJournalDetailStore } from "./use-journal-detail-store";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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

export default function DiaryItem() {
  const { entryId } = useEntryParams();
  const showHanzi = useJournalDetailStore((state) => state.showHanzi);
  const setShowHanzi = useJournalDetailStore((state) => state.setShowHanzi);

  const { data: journalEntry } = useGetJournalEntryQuery(entryId);

  if (!journalEntry) {
    return null;
  }

  return (
    <main>
      <div className="max-w-3xl m-auto">
        <NavBar />

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

          <section className="mt-8 mb-8">
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
      </div>

      <FloatingNavbar />
    </main>
  );
}
