import { intervalToDuration } from "date-fns";

type TimeParts = {
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export function msToTimeParts(ms: number): TimeParts {
  const start = 0;
  const end = ms;

  const duration = intervalToDuration({ start, end });

  const result: TimeParts = {};

  if (duration.hours && duration.hours > 0) {
    result.hours = duration.hours;
  }
  if (duration.minutes && duration.minutes > 0) {
    result.minutes = duration.minutes;
  }
  if (duration.seconds && duration.seconds > 0) {
    result.seconds = duration.seconds;
  }

  return result;
}

// Example usage:
console.log(msToTimeParts(3661000)); // { hours: 1, minutes: 1, seconds: 1 }
console.log(msToTimeParts(61000)); // { minutes: 1, seconds: 1 }
console.log(msToTimeParts(5000)); // { seconds: 5 }

export function formatLearnedDate(time: number) {
  const { hours, minutes, seconds } = msToTimeParts(time);
  let format = ``;

  if (hours) {
    format = format + `${hours}` + (hours > 1 ? "hrs" : "hr");
  }

  if (minutes) {
    format =
      format +
      (hours !== undefined && hours > 0 ? ", " : "") +
      minutes +
      (minutes > 1 ? " minutes" : " minute");
  }

  if (seconds) {
    format =
      format + " and " + seconds + (seconds > 1 ? " seconds" : " second");
  }

  return format;
}
