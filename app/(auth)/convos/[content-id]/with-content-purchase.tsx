import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { useGetContentPurchase } from "../../plans/hooks/use-get-content-purchase";
import { useGetContentId } from "./hooks/use-get-content-id";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useListProductsQuery } from "../../plans/hooks/use-list-products-query";
import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";

export const WithContentPurcase = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const contentId = useGetContentId();
  const { data: authUserProfile, isLoading: isProfileLoading } =
    useGetAuthUserProfileQuery();

  const { data, isLoading, isError, error } = useGetContentPurchase(contentId);

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useListProductsQuery();

  const mandarinoGradedContent = products?.result?.items?.find(
    (item) => item.name === "Mando AI Graded Content",
  );

  console.log("mandarinoGradedContent", mandarinoGradedContent);

  if (isLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Nothing icon={Icons.cat} message={error?.message}>
          <div className="mt-12 flex gap-8 justify-center">
            <Link
              href={{
                pathname: `/checkout`,
                query: {
                  productId: mandarinoGradedContent?.id,
                  customerEmail: authUserProfile?.email,
                  contentId,
                  products: [mandarinoGradedContent?.id || ""],
                },
              }}
            >
              {" "}
              Purchase
            </Link>
          </div>
        </Nothing>
      </div>
    );
  }

  return children;
};
