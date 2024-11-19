"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useEntryParams } from "./use-entry-params";
import { useGetJournalDetailsQuery } from "../hooks/use-get-journal-details-query";
// import { useDiaryParams } from "./use-entry-params";

export default function DiaryItem() {
  const { entryId } = useEntryParams();

  const { data } = useGetJournalDetailsQuery(entryId);
  return (
    <main className="">
      <NavBar />

      <div className="px-4 md:px-12">
        <section>Diary Item: {entryId}</section>

        <section className="mt-8">
          <code>
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </code>
        </section>
      </div>

      <FloatingNavbar />
    </main>
  );
}
