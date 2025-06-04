"use client";

import "@/libs/cognito/init";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { useGetContentQuery } from "@/domain/content/content.queries";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ConvoDetails } from "../convo-details";
import { ConvosNavBar } from "../convos-nav-bar";
import { useGetContentId } from "./hooks/use-get-content-id";

function WithContentItem({ children }: { children: React.ReactNode }) {
  const contentId = useGetContentId();

  const resp = useGetContentQuery({ contentId });
  const { data, isError, isLoading } = resp;
  const error: any = resp?.error;

  if (isLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  if (error?.message !== undefined) {
    return (
      <div>
        <Nothing icon={Icons.cat} message={error?.message}>
          <div className="mt-12">
            <Link href="/convos"> Back</Link>
          </div>
        </Nothing>
      </div>
    );
  }

  return children;
}

export default function ContentItem() {
  const lessonId = useGetContentId();

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(lessonId);
  const searchParams = useSearchParams();
  const router = useRouter();
  const startTimeParam = searchParams.get("start");
  const view = searchParams.get("view");

  useEffect(() => {
    if (currentTime && !startTimeParam) {
      router.push(
        `/convos/${lessonId}?start=${currentTime}${view ? `&view=${view}` : ``}`
      );
    }
  }, [currentTime, lessonId, router, startTimeParam, view]);

  return (
    <WithContentItem>
      <main>
        <div>
          <div className="px-4 md:px-12">
            <ConvosNavBar />
          </div>

          <div className="mb-24">
            <ConvoDetails lessonId={lessonId} />
          </div>
        </div>
      </main>
    </WithContentItem>
  );
}
