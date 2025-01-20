// import Image from 'next/image'
"use client";

import "@/libs/cognito/init";
// import Link from "next/link";

import { useState } from "react";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useConvosStore } from "@/stores/convos-store";
import { ConvoDetails } from "../convo-details";
import { ConvosNavBar } from "../convos-nav-bar";
import { useSelectedCharacter } from "../use-selected-character";

import ConvoItem from "./convo-item";
import { fa0 } from "@fortawesome/pro-thin-svg-icons";
import { ContentItemV2 } from "./content-item-v2/content-item-v2";
import { useViewModeStore } from "@/components/convos/useViewModeStore";

// useConvosStore

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
          {/* <ContentItemV2 /> */}
        </div>
      </div>

      {/* <FloatingNavbar /> */}
    </main>
  );

  // return <ContentItemV2 />;
}

function Convos_old() {
  const [isTocHidden, setIsTocHidden] = useState(false);
  // const lessonId = useConvosStore((state: any) => state?.convoId);

  const params = useParams() as {
    "content-id": string;
  };

  const lessonId = params["content-id"];
  const searchParams = useSearchParams();
  const viewType = useConvosStore((state: any) => state?.viewType);

  const viewMode = useViewModeStore((state: any) => state.viewMode);
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );

  const routeName = usePathname();

  const router = useRouter();

  // CONVOS
  // const lessonId = useConvosStore((state: any) => state?.convoId);
  const setLessonId = useConvosStore((state: any) => state?.setConvoId);

  // const router = useRouter();

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };

  const contentType = searchParams.get("type");

  if (contentType === "conversation") {
    return <ConvoItem />;
  }

  return (
    <main>
      <div className="px-4 md:px-32">
        <ConvosNavBar />

        <div className="mb-24">
          <ConvoDetails lessonId={lessonId} />
        </div>
      </div>

      {/* <FloatingNavbar /> */}
    </main>
  );
}
