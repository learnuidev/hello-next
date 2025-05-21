import { differenceInHours } from "date-fns";

/**
 * Checks if a specified number of hours have passed since the given timestamp.
 *
 * @param params - An object containing:
 *   @param timestamp - The starting point in time to compare against. Can be a Date object, a numeric timestamp (milliseconds since epoch), or an ISO date string.
 *   @param hours - (Optional) The number of hours to check for. Defaults to 24 if not provided.
 * @returns Returns `true` if the specified number of hours or more have passed since the timestamp; otherwise, returns `false`.
 *
 * @example
 * // Check if 24 hours have passed since a given time
 * hasBeen({ timestamp: '2025-05-20T13:30:00Z' }); // true or false
 *
 * @example
 * // Check if 48 hours have passed since a given time
 * hasBeen({ timestamp: someDate, hours: 48 }); // true or false
 */
export function hasBeen({
  timestamp,
  hours = 24,
}: {
  timestamp: Date | number | string;
  hours?: number;
}): boolean {
  const date = new Date(timestamp);
  return differenceInHours(new Date(), date) >= hours;
}
