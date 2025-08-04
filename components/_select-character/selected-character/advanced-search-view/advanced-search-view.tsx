import { BingLink } from "../../bing-link";
import { BibilliLink } from "../billibilli-link/billibilli-link";
import { GoogleLink } from "../google-link";
import { GoogleTranslateLink } from "../google-translate-link";
import { HanbookLink } from "../hanbook-link";
// import { OwadLink } from "../billibilli-link";
import { YablaLink } from "../yabla-link";
import { YoutubeLink } from "../youtube-link";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";

export const AdvancedSearchView = ({
  lang,
  characterId,
}: {
  lang: string;
  characterId: string;
}) => {
  return (
    <div>
      <div className="space-x-12 flex items-center px-2 my-8">
        <GoogleLink hanzi={characterId} />
        <BingLink query={characterId} />
        {/* <GoogleTranslateLink hanzi={characterId} /> */}
        {lang === "zh" && (
          <YablaLink className="text-4xl" hanzi={characterId} />
        )}
        {lang === "zh" && <HanbookLink hanzi={characterId} />}

        <YoutubeLink className="text-2xl" characterId={characterId} />
        <BibilliLink className="text-2xl" hanzi={characterId} />
      </div>
    </div>
  );
};
