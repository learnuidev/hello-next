"use client";

import "@/libs/cognito/init";

import { ConvoDetails } from "../convo-details";
import { ConvosNavBar } from "../convos-nav-bar";
import { useGetContentId } from "./hooks/use-get-content-id";

export default function ContentItem() {
  const lessonId = useGetContentId();

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
    </main>
  );
}
