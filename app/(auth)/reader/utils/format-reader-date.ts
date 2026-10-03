import { format } from "date-fns";

export function formatReaderDate(timestamp: number) {
  return format(new Date(timestamp), "MMMM do, yyyy, h:mma");
}

/** Short form for the list rows. */
export function formatReaderDateShort(timestamp: number) {
  return format(new Date(timestamp), "MMM do, yyyy");
}
