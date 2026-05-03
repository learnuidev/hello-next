import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { useGetContentPurchase } from "../../plans/hooks/use-get-content-purchase";
import { useGetContentId } from "./hooks/use-get-content-id";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";

export const WithContentPurcase = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const contentId = useGetContentId();

  const { data, isLoading, isError, error } = useGetContentPurchase(contentId);

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
          {/* <div className="mt-12 flex gap-8 justify-center">
              <Link href="/convos"> Back</Link>
  
              <RemoveIfExistsButton contentId={contentId} />
            </div> */}
        </Nothing>
      </div>
    );
  }

  return children;
};
