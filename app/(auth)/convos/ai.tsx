"use client";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { IContent } from "@/domain/content/content.api";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { InteractiveContentPlayer } from "./interactive-content-player";

export const AI = ({ contentId }: { contentId: string }) => {
  const { data, isLoading } = useGetContentQuery({ contentId });

  const content = data as IContent;

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  if (!content) {
    return (
      <Nothing
        icon={Icons.kiwi}
        message={"All the content has been uploaded to s3"}
      />
    );
  }

  return <InteractiveContentPlayer content={content} />;
};
