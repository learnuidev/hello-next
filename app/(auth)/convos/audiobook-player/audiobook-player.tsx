import { useGetContentQuery } from "@/domain/content/content.queries";
import { AudiobookPlayerCore } from "./audiobook-player.core";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";

export const AudiobookPlayer = ({ contentId }: { contentId: string }) => {
  const { data: content, isLoading } = useGetContentQuery({ contentId });

  if (isLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return <AudiobookPlayerCore content={content} />;
};
