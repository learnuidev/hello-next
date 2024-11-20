"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useEntryParams } from "./use-entry-params";
import { useGetJournalDetailsQuery } from "../hooks/use-get-journal-details-query";
import { useGetJournalEntryQuery } from "../hooks/use-get-journal-entry-query";
import { JournalEntryItem } from "../components/journal-entry-item";
// import { useDiaryParams } from "./use-entry-params";

export default function DiaryItem() {
  const { entryId } = useEntryParams();

  const { data } = useGetJournalDetailsQuery(entryId);

  const { data: journalEntry } = useGetJournalEntryQuery(entryId);
  return (
    <main>
      <div className="max-w-3xl m-auto">
        <NavBar />

        <div className="px-4 md:px-12">
          {/* <section>Diary Item: {entryId}</section> */}

          <div className="mt-12">
            {journalEntry && (
              <JournalEntryItem showFull journalEntry={journalEntry} />
            )}
          </div>

          <section className="mt-8 text-gray-600">
            <code>
              <pre>{JSON.stringify(journalEntry, null, 4)}</pre>
            </code>
            <code>
              <pre>{JSON.stringify(data, null, 4)}</pre>
            </code>
          </section>
        </div>
      </div>

      <FloatingNavbar />
    </main>
  );
}
