import { GoogleLink } from "../google-link";
import { GoogleTranslateLink } from "../google-translate-link";
import { HanbookLink } from "../hanbook-link";
import { OwadLink } from "../owad-link";
import { YablaLink } from "../yabla-link";
import { YoutubeLink } from "../youtube-link";

export const AdvancedSearchView = ({
  lang,
  characterId,
}: {
  lang: string;
  characterId: string;
}) => {
  return (
    <div>
      <div className="space-x-4 flex items-center px-2 my-8">
        <GoogleLink hanzi={characterId} />
        <GoogleTranslateLink hanzi={characterId} />
        {lang === "zh" && <YablaLink hanzi={characterId} />}
        {lang === "zh" && <HanbookLink hanzi={characterId} />}

        <YoutubeLink characterId={characterId} />
        {lang === "zh" && <OwadLink hanzi={characterId} />}
      </div>
    </div>
  );
};
