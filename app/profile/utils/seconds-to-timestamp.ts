export function secondsToTimestamp(milliseconds: number) {
  // Define time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  // Calculate days, hours, and minutes
  const days = Math.floor(milliseconds / day);
  const hours = Math.floor((milliseconds % day) / hour);
  const minutes = Math.floor((milliseconds % hour) / minute);
  // Build the timestamp string
  let timestamp = "";
  if (days > 0) {
    timestamp += `${days}d`;
    if (hours > 0 || minutes > 0) timestamp += " ";
  }
  if (hours > 0) {
    timestamp += `${hours}h`;
    if (minutes > 0) timestamp += " ";
  }
  if (minutes > 0 || (days === 0 && hours === 0)) {
    timestamp += `${minutes}min`;
  }
  return timestamp.trim();
}
