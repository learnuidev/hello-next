"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useAddJournalEntryMutation } from "./hooks/use-add-journal-entry-mutatuon";
import { useListJournalEntriesQuery } from "./hooks/use-list-journal-entries.query";
import Link from "next/link";
import { useDeleteJournalEntryMutation } from "./hooks/use-delete-journal-entry-mutatuon";

const exampleEntry = {
  text: `It’s been 2 months and 15 days since I quit weed and alcohol. The first month was very hard. I had anxiety attacks, paranoia, insomnia, and so on. But after a month, things started to get much better.

Initially, I was taking medications, but I didn’t like the side effects. So, I did some research online and learned that saffron is a great natural alternative for treating anxiety and depression, and it’s also an excellent mood booster.

I’ve been taking saffron, and it has really helped me control my anxiety and depression. What’s more, my sleep quality has improved significantly, and I’ve started having vivid dreams, which I used to forget before.

I’m happy I quit drugs. I’m getting better, I’m getting stronger.

I will make more time to spend with my daughter and my wife.

I love them. I love life.
`,
};

export default function Diary() {
  const addJournalMutation = useAddJournalEntryMutation();
  const deleteJournalMutation = useDeleteJournalEntryMutation();

  const { data: journalEntries } = useListJournalEntriesQuery();
  return (
    <main className="">
      <NavBar />

      <div className="px-4 md:px-12">
        <section>Diary</section>

        <button
          onClick={() => {
            addJournalMutation.mutateAsync(exampleEntry);
          }}
        >
          Add
        </button>

        <section className="mt-8">
          {journalEntries?.map((journalEntry) => {
            return (
              <div key={journalEntry.id}>
                <Link href={`/diary/${journalEntry.id}`}>
                  <code>
                    <pre>{JSON.stringify(journalEntry, null, 4)}</pre>
                  </code>
                </Link>

                <button
                  onClick={() => {
                    deleteJournalMutation.mutateAsync(journalEntry);
                  }}
                >
                  {/* {deleteJournalMutation.isLoading ? "Deleting..." : "Delete"} */}
                  {"Delete"}
                </button>
              </div>
            );
          })}
        </section>
      </div>

      <FloatingNavbar />
    </main>
  );
}
