// import { groupBy } from "lodash";

import { splitEvery } from "@/lib/utils";
import { groupBy } from "ramda";

export type IGroupBy = "time" | "length";

export const getActiveTranscriptions = ({
  groupBy: _groupBy,
  timeLimit,
  lengthLimit,
  currentTime,
  transcriptions,
}: {
  groupBy: IGroupBy;
  timeLimit: number;
  lengthLimit: number;
  currentTime: number;
  transcriptions: any;
}) => {
  const groupByMinute = groupBy(
    (timestamp: any) => `${Math.floor(timestamp?.end / timeLimit)}`
  );

  if (_groupBy === "length") {
    const grouped = splitEvery(transcriptions, lengthLimit);

    return grouped.find((group) => {
      const minStartTime = Math.min(...group?.map((item: any) => item.start));

      const maxEndTime = Math.max(...group?.map((item: any) => item?.end));

      // return minStartTime <= currentTime && maxEndTime >= currentTime;
      return maxEndTime >= currentTime;
    });
  }

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

  if (!res) {
    return [];
  }
  return res;
};
