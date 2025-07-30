"use client";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";

import { ProductsListResponse } from "@polar-sh/sdk/models/operations/productslist.js";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { PricingSection } from "./pricing-section";
import { useListProductsQuery } from "./hooks/use-list-products-query";
import { formatPrice } from "./utils/format-price";
// import type { ProductsListResponse } from "@polar-sh/sdk/types/operations";

function useListUserPlansQuery() {
  const jwtToken = useJwtToken();
  return useQuery({
    queryKey: ["polar/list-user-plans"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    queryFn: async (): Promise<ProductsListResponse> => {
      const res = await fetch(`/api/list-user-plans`, {
        method: "GET",
        headers: {
          Authorization: jwtToken,
        },
      });

      return res.json();
    },
  });
}

export default function ProductsList() {
  const { data: products, isLoading } = useListProductsQuery();
  const { data: userPlans, isLoading: isPlansLoading } =
    useListUserPlansQuery();

  const { data: authUserProfile } = useGetAuthUserProfileQuery();

  if (isLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  return (
    <div className="">
      <PricingSection />
      <h1 className="text-3xl font-bold mb-8 text-center">Plans</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-32 max-w-5xl m-auto">
        {products?.result.items.map((product) => {
          return (
            <div
              key={product.id}
              className="h-80 flex flex-col justify-between border-gray-800 border-2 p-8"
            >
              <div>
                <h2 className="text-center font-bold text-2xl">
                  {product.name}
                </h2>

                <p className="text-center dark:text-gray-500 text-sm">
                  {product.description}
                </p>

                <p className="text-center text-7xl mt-12">
                  {formatPrice(
                    product.prices[0].amountType === "free"
                      ? 0
                      : (product.prices[0].amountType === "fixed" &&
                          product.prices[0].priceAmount) ||
                          0
                  )}
                </p>
              </div>

              <Link
                className="bg-green-500 w-full text-center py-2 uppercase"
                href={{
                  pathname: `/checkout`,
                  query: {
                    productId: product.id,
                    customerEmail: authUserProfile?.email,
                    products: [product.id],
                  },
                }}
              >
                Select
              </Link>
            </div>
          );
        })}
      </div>

      <div>
        <code>
          <pre>{JSON.stringify(userPlans, null, 4)}</pre>
        </code>
      </div>
      <div>
        <code>
          <pre>{JSON.stringify(products, null, 4)}</pre>
        </code>
      </div>
    </div>
  );
}
