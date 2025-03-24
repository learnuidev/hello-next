import { isToday as _isToday } from "date-fns";

/**
 * Determines if a given timestamp is today.
 * @param {number | Date} timestamp - The timestamp to check.
 * @returns {boolean} - Returns true if the timestamp is today, otherwise false.
 */
export function isToday(timestamp: number) {
  try {
    // Convert the input to a Date object if it's not already
    const date =
      typeof timestamp === "number" ? new Date(timestamp) : timestamp;

    // Use date-fns isToday function to check if the date is today
    return _isToday(date);
  } catch (error) {
    console.error("Invalid timestamp provided:", error);
    return false;
  }
}
