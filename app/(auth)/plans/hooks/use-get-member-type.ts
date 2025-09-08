import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";
import { useListProductsQuery } from "./use-list-products-query";
import { useListUserPlansQuery } from "./use-list-user-plans-query";
import { productNames } from "../plans.types";

export const useGetMemberType = (): "pro" | "free" => {
  const { data: products, isLoading } = useListProductsQuery();
  const { data: userPlans = [], isLoading: isPlansLoading } =
    useListUserPlansQuery();

  const proProduct = products?.result?.items?.find(
    (item) => item?.name === productNames.pro
  );
  const freeProduct = products?.result?.items?.find(
    (item) => item?.name === productNames.free
  );

  const isProMember = userPlans?.find(
    (plan: any) => plan?.productId === proProduct?.id
  );
  const isFreeMember = userPlans?.find(
    (plan: any) => plan?.productId === freeProduct?.id
  );

  if (isProMember) {
    return "pro";
  }

  if (isFreeMember) {
    return "free";
  }

  return "free";
};
