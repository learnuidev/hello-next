import Link from "next/link";
import { JournalEntry } from "../hooks/journal-entry.types";
import { formatJournalDate } from "../utils/format-journal-date";
import { useDeleteJournalEntryMutation } from "../hooks/use-delete-journal-entry-mutatuon";
import { Icons } from "@/components/ui/icons.v2";

export const JournalEntryItem = ({
  journalEntry,
}: {
  journalEntry: JournalEntry;
}) => {
  const deleteJournalMutation = useDeleteJournalEntryMutation();
  return (
    <div key={journalEntry.id}>
      <div className="mb-4">
        <Link href={`/diary/${journalEntry.id}`} className="text-lg mb-2 block">
          {journalEntry.title || "No title"}
        </Link>
        <p className="text-gray-400 font-light">
          {formatJournalDate(journalEntry.createdAt)}
        </p>
      </div>

      <p className="line-clamp-3 text-gray-300 font-extralight">
        {journalEntry.text}
      </p>

      <div className="flex justify-end space-x-4">
        <button className="mt-8 text-gray-500">
          <Icons.bookmark />
        </button>
        <button
          onClick={() => {
            deleteJournalMutation.mutateAsync(journalEntry);
          }}
          className="mt-8 text-gray-500"
        >
          <Icons.trash />
        </button>
      </div>
    </div>
  );
};
