import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { useGetContentPurchase } from "../../plans/hooks/use-get-content-purchase";
import { useGetContentId } from "./hooks/use-get-content-id";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useListProductsQuery } from "../../plans/hooks/use-list-products-query";
import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";
import { useMutation } from "@tanstack/react-query";
import { siteConfig } from "@/lib/config";
import { useIsContentAuthor } from "./hooks/use-is-content-author";

export const WithContentPurcase = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const contentId = useGetContentId();
  const { data: authUserProfile, isLoading: isProfileLoading } =
    useGetAuthUserProfileQuery();
  const isAuthor = useIsContentAuthor(contentId);

  const { data, isLoading, isError, error } = useGetContentPurchase(contentId);

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useListProductsQuery();

  const mandarinoGradedContent = products?.result?.items?.find(
    (item) => item.name === "Mando AI Graded Content",
  );

  const handleCheckoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: mandarinoGradedContent?.id,
          customerEmail: authUserProfile?.email,
          contentId,
          successUrl: window.location.href,
          // successUrl: `${siteConfig.appUrl}/convos/${contentId}`,
        }),
      });

      const { url } = await response.json();
      window.location.href = url; // Redirect to Polar Checkout
    },
  });

  if (isLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  if (isError && !isAuthor) {
    return (
      <div>
        <Nothing icon={Icons.cat} message={error?.message}>
          <div className="mt-12 flex gap-8 justify-center">
            <button
              disabled={handleCheckoutMutation.isPending}
              onClick={() => {
                handleCheckoutMutation.mutateAsync();
              }}
            >
              Purchase
            </button>
          </div>
        </Nothing>
      </div>
    );
  }

  return children;
};
