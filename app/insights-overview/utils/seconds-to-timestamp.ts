export function secondsToTimestamp(milliseconds: number) {
  // Define time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  // Calculate days, hours, and minutes
  const days = Math.floor(milliseconds / day);
  const hours = Math.floor((milliseconds % day) / hour);
  // const hours = 12;
  const minutes = Math.floor((milliseconds % hour) / minute);
  // Build the timestamp string
  let timestamp = "";
  if (days > 0) {
    if (hours || minutes) {
      timestamp += `${days}d`;
    } else if (days <= 1) {
      timestamp += `${days} day`;
    } else {
      timestamp += `${days} days`;
    }

    // timestamp += `${days} day`;
    // if (hours > 0 || minutes > 0) timestamp += " ";
    // return timestamp.trim();
  }
  if (hours > 0) {
    if (days || minutes) {
      timestamp += ` ${hours}h`;
    } else {
      if (hours <= 1) {
        timestamp += ` ${hours} hour`;
      } else {
        timestamp += ` ${hours} hours`;
      }
    }

    // if (minutes > 0) timestamp += " ";
    // return timestamp.trim();
  }
  if (minutes > 0 || (days === 0 && hours === 0)) {
    if (days > 0 || hours > 0) {
      timestamp += ` ${minutes}m`;
    } else {
      if (minutes <= 1) {
        timestamp += ` ${minutes} min`;
      } else {
        timestamp += ` ${minutes} mins`;
      }
    }

    return timestamp.trim();
  }
  return timestamp.trim();
}

export function secondsToTimestampV2(milliseconds: number) {
  // Define time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const second = 1000;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(milliseconds / day);
  const hours = Math.floor((milliseconds % day) / hour);
  const minutes = Math.floor((milliseconds % hour) / minute);
  const seconds = Math.floor((milliseconds % minute) / second);

  // Build the timestamp string
  let timestamp = "";

  if (days > 0) {
    if (hours || minutes || seconds) {
      timestamp += `${days}d`;
    } else if (days === 1) {
      timestamp += `${days} day`;
    } else {
      timestamp += `${days} days`;
    }
  }

  if (hours > 0) {
    if (days || minutes || seconds) {
      timestamp += ` ${hours}h`;
    } else if (hours === 1) {
      timestamp += ` ${hours} hour`;
    } else {
      timestamp += ` ${hours} hours`;
    }
  }

  if (minutes > 0) {
    if (days > 0 || hours > 0 || seconds > 0) {
      timestamp += ` ${minutes}m`;
    } else if (minutes === 1) {
      timestamp += ` ${minutes} min`;
    } else {
      timestamp += ` ${minutes} mins`;
    }
  }

  // Always show seconds (unless everything else is zero)
  if (seconds > 0 || (days === 0 && hours === 0 && minutes === 0)) {
    if (days > 0 || hours > 0 || minutes > 0) {
      timestamp += ` ${seconds}s`;
    } else if (seconds === 1) {
      timestamp += ` ${seconds} sec`;
    } else {
      timestamp += ` ${seconds} secs`;
    }
  }

  return timestamp.trim();
}
