"use client";

import "@/libs/cognito/init";

import { useParams } from "next/navigation";

import { ConvoDetails } from "../convo-details";
import { ConvosNavBar } from "../convos-nav-bar";

export default function ContentItem() {
  const params = useParams() as {
    "content-id": string;
  };

  const lessonId = params["content-id"];

  return (
    <main>
      <div>
        <div className="px-4 md:px-32">
          <ConvosNavBar />
        </div>

        <div className="mb-24">
          <ConvoDetails lessonId={lessonId} />
        </div>
      </div>
    </main>
  );
}
