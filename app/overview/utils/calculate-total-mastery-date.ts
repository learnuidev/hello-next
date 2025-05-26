import { differenceInDays } from "date-fns";

import { ICharacter } from "@/domain/lesson/character.queries";

export function calculateTotalMasteryDate(character: ICharacter) {
  const createdAt = character?.createdAt;
  // const updatedAt = character?.updatedAt;
  const reviewHistory =
    character?.reviewHistory?.map((item) => item?.createdAt) || [];

  const startDate = new Date(createdAt);
  // const startDate = new Date(Math.min(...reviewHistory));
  const endDate =
    reviewHistory?.length > 0
      ? new Date(Math.max(...reviewHistory))
      : new Date(Date.now());
  const totalDays = differenceInDays(endDate, startDate);

  if (isNaN(totalDays)) {
    return 0;
  }

  return totalDays;
}
