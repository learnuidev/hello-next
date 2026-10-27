/**
 * A moment of a film as a subtitle file writes it, e.g. `4:07` or `1:04:07`.
 *
 * The hours are dropped below the hour mark: a subtitle's times are read as
 * "where in this are we", and `4:07` answers that faster than `00:04:07` does.
 * The leading zero on the seconds stays — `4:07` is four minutes and seven
 * seconds, and dropping the zero makes the number read as a different time.
 */
export const formatReaderCueTime = (milliseconds: number) => {
  const total = Math.max(Math.round((milliseconds || 0) / 1000), 0);
  const seconds = total % 60;
  const minutes = Math.floor(total / 60) % 60;
  const hours = Math.floor(total / 3600);

  const paddedSeconds = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${paddedSeconds}`;
  }

  return `${minutes}:${paddedSeconds}`;
};
