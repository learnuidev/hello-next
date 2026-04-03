import { differenceInDays } from "date-fns";

import { ICharacter } from "@/domain/character/character.types";

export function calculateTotalMasteryDate(character: ICharacter) {
  const createdAt = character?.createdAt;

  const reviewHistory =
    character?.reviewHistory?.map((item) => item?.createdAt) || [];

  const startDate = new Date(createdAt);

  const today = new Date(Date.now());
  const endDate =
    reviewHistory?.length > 0 ? new Date(Math.max(...reviewHistory)) : today;
  let totalDays = differenceInDays(endDate, startDate);

  if (isNaN(totalDays)) {
    return 0;
  }

  if (totalDays === 0) {
    totalDays = differenceInDays(today, startDate);
  }

  return totalDays;
}
