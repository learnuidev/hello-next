import { isSameDay as dfIsSameDay } from "date-fns";

/**
 * Checks if two UNIX timestamps (in milliseconds) are on the same day.
 * @param timestampA - The first timestamp (milliseconds).
 * @param timestampB - The second timestamp (milliseconds).
 * @returns True if both timestamps are on the same day.
 */
export function isSameDay(timestampA: number, timestampB: number): boolean {
  return dfIsSameDay(new Date(timestampA), new Date(timestampB));
}
