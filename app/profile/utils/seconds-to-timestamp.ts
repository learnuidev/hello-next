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
    if (days <= 1) {
      timestamp += `${days} day`;
    } else {
      timestamp += `${days} days`;
    }

    timestamp += `${days} day`;
    // if (hours > 0 || minutes > 0) timestamp += " ";
    return timestamp.trim();
  }
  if (hours > 0) {
    if (hours <= 1) {
      timestamp += `${hours} hour`;
    } else {
      timestamp += `${hours} hours`;
    }

    // if (minutes > 0) timestamp += " ";
    return timestamp.trim();
  }
  if (minutes > 0 || (days === 0 && hours === 0)) {
    if (minutes <= 1) {
      timestamp += `${minutes} min`;
    } else {
      timestamp += `${minutes} mins`;
    }

    return timestamp.trim();
  }
  return timestamp.trim();
}
