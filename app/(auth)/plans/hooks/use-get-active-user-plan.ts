import { productNames, UserPlan } from "../plans.types";
import { useListUserPlansQuery } from "./use-list-user-plans-query";

export const useGetActiveUserPlan = (): {
  isLoading: boolean;
  data: UserPlan | null;
} => {
  const { data: userPlans, isLoading } = useListUserPlansQuery();

  const isPro = userPlans?.find(
    (plan) => plan.productName === productNames.pro
  );

  if (isPro) {
    return {
      isLoading,
      data: isPro,
    };
  }

  const isFree = userPlans?.find(
    (plan) => plan.productName === productNames.free
  );

  if (isFree) {
    return {
      isLoading,
      data: isFree,
    };
  }

  return {
    isLoading,
    data: null,
  };
};
