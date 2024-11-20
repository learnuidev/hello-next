import Link from "next/link";
import { JournalEntry } from "../hooks/journal-entry.types";
import { formatJournalDate } from "../utils/format-journal-date";
import { useDeleteJournalEntryMutation } from "../hooks/use-delete-journal-entry-mutatuon";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

export const JournalEntryTitle = ({
  journalEntry,
  className,
}: {
  journalEntry: JournalEntry;
  className?: string;
}) => {
  return (
    <Link
      href={`/diary/${journalEntry.id}`}
      className={cn("text-lg block", className)}
    >
      {journalEntry.title || "No title"}
    </Link>
  );
};
export const JournalEntryEmotions = ({
  journalEntry,
  showFull,
  className,
}: {
  journalEntry: JournalEntry;
  className?: string;
  showFull?: boolean;
}) => {
  return (
    <p className={cn("text-sm text-gray-500", className)}>
      {showFull
        ? journalEntry.emotions?.split(", ")?.join(", ")
        : journalEntry.emotions?.split(", ")?.slice(0, 4).join(", ")}
    </p>
  );
};
export const JournalEntryDate = ({
  journalEntry,

  className,
}: {
  journalEntry: JournalEntry;
  className?: string;
}) => {
  return (
    <p className={cn("text-gray-600 font-light", className)}>
      {formatJournalDate(journalEntry.createdAt)}
    </p>
  );
};

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
        <JournalEntryTitle journalEntry={journalEntry} />

        <JournalEntryEmotions journalEntry={journalEntry} showFull={showFull} />
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
        <JournalEntryDate journalEntry={journalEntry} />
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
