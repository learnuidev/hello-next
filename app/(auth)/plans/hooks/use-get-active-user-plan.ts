import { UserPlan } from "../plans.types";
import { useListUserPlansQuery } from "./use-list-user-plans-query";

export const useGetActiveUserPlan = (): UserPlan | null => {
  const { data: userPlans } = useListUserPlansQuery();

  const isPro = userPlans?.find((plan) => plan.productName === "Mandarino Pro");

  if (isPro) {
    return isPro;
  }

  const isFree = userPlans?.find(
    (plan) => plan.productName === "Mandarino Free"
  );

  if (isFree) {
    return isFree;
  }

  return null;
};
