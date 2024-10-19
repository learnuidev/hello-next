import { format } from "date-fns";

export function formatDate(timestamp: number) {
  const formattedDate = format(timestamp, "MMM d, yyyy");
  return formattedDate;
}
