"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { JournalEntryDetails } from "./journal-entry-details";

export default function DiaryItem() {
  return (
    <main>
      <div className="max-w-3xl m-auto">
        <NavBar />

        <JournalEntryDetails />
      </div>

      <FloatingNavbar />
    </main>
  );
}
