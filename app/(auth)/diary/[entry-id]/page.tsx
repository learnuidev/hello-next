"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { JournalEntryDetails } from "./journal-entry-details";
import { useEntryParams } from "./use-entry-params";
import { DiaryInsights } from "../../convos/diary-insights";

export default function DiaryItem() {
  const { view, entryId } = useEntryParams();
  return (
    <main>
      <div className="max-w-3xl m-auto">
        <NavBar />

        {view === "insights" ? (
          <DiaryInsights entryId={entryId} />
        ) : (
          <JournalEntryDetails />
        )}
      </div>

      <FloatingNavbar />
    </main>
  );
}
