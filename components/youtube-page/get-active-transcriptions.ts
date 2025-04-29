// import { groupBy } from "lodash";

import { groupBy } from "ramda";

export const getActiveTranscriptions = ({
  limit,
  currentTime,
  transcriptions,
}: {
  limit: number;
  currentTime: number;
  transcriptions: any;
}) => {
  const groupByMinute = groupBy(
    (timestamp: any) => `${Math.floor(timestamp?.end / limit)}`
  );

  // console.log("CURRENT TIME", currentTime);
  // console.log("TRANSCRIPTIONS", transcriptions);

  const groupTranscriptions = groupByMinute(transcriptions);
  const groupTranscriptionValues = Object.values(groupTranscriptions);

  const res = groupTranscriptionValues?.filter((group: any, idx) => {
    const minStartTime = Math.min(...group?.map((item: any) => item.start));

    const maxEndTime = Math.max(...group?.map((item: any) => item?.end));

    if (!currentTime) {
      return idx === 0;
    }

    // return minStartTime <= currentTime && maxEndTime >= currentTime;
    return maxEndTime >= currentTime;
  })?.[0];

  console.log("");

  if (!res) {
    return [];
  }
  return res;
};
