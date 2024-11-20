import { format } from "date-fns";

export function formatJournalDate(timestamp: number) {
  return format(new Date(timestamp), "MMMM do, yyyy, h:mma");
}
