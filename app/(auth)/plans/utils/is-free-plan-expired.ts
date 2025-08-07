import { addDays, isAfter, differenceInDays } from "date-fns";
import { UserPlan, userPlanStatus } from "../plans.types";

type FreePlanStatus = {
  isExpired: boolean;
  daysTillExpiry: number;
};

export function isFreePlanExpired(plan: UserPlan): FreePlanStatus | null {
  if (plan.userStatus !== userPlanStatus.free) {
    return null;
  }

  const createdDate = new Date(plan.createdAt);
  const expiryDate = addDays(createdDate, 30);
  const currentDate = new Date();
  const isExpired = isAfter(currentDate, expiryDate);

  if (isExpired) {
    return {
      isExpired: true,
      daysTillExpiry: 0,
    };
  }

  const daysTillExpiry = differenceInDays(expiryDate, currentDate);

  return {
    isExpired,
    daysTillExpiry,
  };
}
