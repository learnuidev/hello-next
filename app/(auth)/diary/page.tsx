"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useListJournalEntriesQuery } from "./hooks/use-list-journal-entries.query";

import { Icons } from "@/components/ui/icons.v2";
import { AddEntry } from "./components/add-entry";
import { JournalEntryItem } from "./components/journal-entry-item";
import { useDiaryStore } from "./hooks/use-diary-store";
import { useDiaryParams } from "./hooks/use-diary-params";

export default function Diary() {
  const setCreateNew = useDiaryStore((state) => state.setCreateNew);
  const createNew = useDiaryStore((state) => state.createNew);

  const { data: journalEntries } = useListJournalEntriesQuery();
  const { emotion } = useDiaryParams();
  return (
    <main>
      <div className="max-w-3xl m-auto">
        <NavBar />

        {createNew ? (
          <div className="px-4 md:px-12">
            <AddEntry />
          </div>
        ) : (
          <div className="px-4 md:px-12 mt-12">
            <button
              onClick={() => {
                setCreateNew(true);
              }}
              className="uppercase text-gray-400 border-[1px] px-4 py-2 border-gray-800"
            >
              <Icons.plusIcon />
              <span> Add</span>
            </button>

            <section className="mt-8 space-y-12">
              {journalEntries
                ?.filter((journalEntry) => {
                  if (!emotion) {
                    return true;
                  }

                  return journalEntry.emotions?.includes(emotion);
                })
                ?.map((journalEntry) => {
                  return (
                    <JournalEntryItem
                      journalEntry={journalEntry}
                      key={journalEntry.id}
                    />
                  );
                })}
            </section>
          </div>
        )}
      </div>

      <FloatingNavbar />
    </main>
  );
}
