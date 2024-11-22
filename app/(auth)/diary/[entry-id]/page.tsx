"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { JournalEntryDetails } from "./journal-entry-details";
import { useEntryParams } from "./use-entry-params";
import { DiaryInsights } from "../../convos/diary-insights";
import { JournalEntryActionButtons } from "./journal-entry-action-buttons";

export default function DiaryItem() {
  const { view, entryId } = useEntryParams();
  return (
    <main>
      <div className="max-w-3xl m-auto">
        <NavBar />

        {view === "insights" ? (
          <div>
            <DiaryInsights entryId={entryId} />
            <JournalEntryActionButtons entryId={entryId} />
          </div>
        ) : (
          <JournalEntryDetails />
        )}
      </div>

      <FloatingNavbar />
    </main>
  );
}
