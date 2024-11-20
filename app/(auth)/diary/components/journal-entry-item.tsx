import Link from "next/link";
import { JournalEntry } from "../hooks/journal-entry.types";
import { formatJournalDate } from "../utils/format-journal-date";
import { useDeleteJournalEntryMutation } from "../hooks/use-delete-journal-entry-mutatuon";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

export const JournalEntryItem = ({
  journalEntry,
  showFull,
}: {
  journalEntry: JournalEntry;
  showFull?: boolean;
}) => {
  const deleteJournalMutation = useDeleteJournalEntryMutation();
  return (
    <div key={journalEntry.id}>
      <div className="mb-4">
        <Link href={`/diary/${journalEntry.id}`} className="text-lg block">
          {journalEntry.title || "No title"}
        </Link>
        <p className="text-sm text-gray-500">
          {showFull
            ? journalEntry.emotions?.split(", ")?.join(", ")
            : journalEntry.emotions?.split(", ")?.slice(0, 4).join(", ")}
        </p>
      </div>

      <p
        className={cn(
          "text-gray-300 font-extralight text-[16px]",
          showFull ? "" : "line-clamp-2"
        )}
      >
        {journalEntry.text}
      </p>

      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600 font-light">
          {formatJournalDate(journalEntry.createdAt)}
        </p>
        <div className="flex justify-end space-x-4 items-center">
          <button className="text-gray-500">
            <Icons.bookmark />
          </button>
          <button
            onClick={() => {
              deleteJournalMutation.mutateAsync(journalEntry);
            }}
            className=" text-gray-500"
          >
            <Icons.trash />
          </button>
        </div>
      </div>
    </div>
  );
};
