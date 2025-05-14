"use client";

import "@/libs/cognito/init";

import { ConvoDetails } from "../convo-details";
import { ConvosNavBar } from "../convos-nav-bar";
import { useGetContentId } from "./hooks/use-get-content-id";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FloatingNavbar } from "@/components/floating-navbar";

export default function ContentItem() {
  const lessonId = useGetContentId();

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(lessonId);
  const searchParams = useSearchParams();
  const router = useRouter();
  const startTimeParam = searchParams.get("start");

  useEffect(() => {
    if (currentTime && !startTimeParam) {
      router.push(`/convos/${lessonId}?start=${currentTime}`);
    }
  }, [currentTime, lessonId, router, startTimeParam]);

  return (
    <main>
      <div>
        <div className="px-4 md:px-12">
          <ConvosNavBar />
        </div>

        <div className="mb-24">
          <ConvoDetails lessonId={lessonId} />
        </div>
      </div>

      <FloatingNavbar />
    </main>
  );
}
