import { differenceInDays } from "date-fns";

import { ICharacter } from "@/domain/lesson/character.queries";

export function calculateTotalMasteryDate(character: ICharacter) {
  const createdAt = character?.createdAt;
  // const updatedAt = character?.updatedAt;
  const reviewHistory = character?.reviewHistory?.map(
    (item) => item?.createdAt
  );

  const startDate = new Date(createdAt);
  // const startDate = new Date(Math.min(...reviewHistory));
  const endDate = new Date(Math.max(...reviewHistory));
  const totalDays = differenceInDays(endDate, startDate);

  return totalDays;
}
