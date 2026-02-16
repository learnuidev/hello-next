import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { isYoutube } from "@/app/(auth)/convos/utils/is-youtube";
import { Nothing } from "@/app/nmm/nothing";
import { formatDate } from "@/components/settings-dialog/utils/format-date";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { resolveLangCode } from "@/libs/openai/utils";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { SentenceItem } from "../sentence-item";
import { useGetCharacterLearningContext } from "./use-get-character-learning-context";
import { useRecentlyWatchedContent } from "@/app/(auth)/convos/use-recently-watched-content-store";

const CharacterLearningContextInner = ({ selectedComp }: any) => {
  const learnedCharacter = selectedComp;
  const playerRef = useRef(null) as any;
  const [currentTime, setTime] = useState(0);

  const contentSegment =
    learnedCharacter?.contentContext?.find(
      (content: any) => content?.contentId
    ) || learnedCharacter?.contentContext?.[0];

  const contentId = contentSegment?.contentId || "";

  const { data: relevantContent } = useGetContentQuery({ contentId });

  const isYoutubeMedia = isYoutube(relevantContent?.audio);

  const isSmall = useIsSmall();
  const height = isSmall ? "200px" : "450px";

  const setIfExists = useSetIfExists();

  useEffect(() => {
    const maxValue = Math.floor(Math.max(contentSegment?.start, 0));

    if (contentSegment?.start) {
      playerRef?.current?.seekTo(maxValue);
    }
  }, [contentSegment?.start, isYoutubeMedia]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((seconds) => playerRef?.current?.getCurrentTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  function playCurrentSegment() {
    const maxValue = Math.floor(Math.max(contentSegment?.start, 0));

    playerRef?.current?.seekTo(maxValue);

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  }

  const transcriptions = relevantContent?.transcriptions;

  const currentTranscription = transcriptions?.find(
    (trans: any) => trans?.start <= currentTime && trans?.end >= currentTime
  );

  const isAudioVideoOrYoutube =
    relevantContent?.audio?.includes("youtube") ||
    relevantContent?.audio?.includes("mp4") ||
    relevantContent?.audio?.includes("mp3") ||
    relevantContent?.audio?.includes("m4a") ||
    relevantContent?.audio?.includes("wav");

  return relevantContent && isAudioVideoOrYoutube ? (
    <article className="dark:bg-[rgb(14,15,16)] bg-gray-50 p-4 sm:p-8 rounded-2xl mt-2">
      <div className="mb-4">
        <Link
          className="font-bold text-xl"
          target="_blank"
          href={`/convos/${contentId}?seek=${contentSegment?.start}`}
        >
          Learning Context
        </Link>
        <p
          className="font-extralight text-gray-500 text-sm"
          onClick={playCurrentSegment}
        >
          You learned this character on {formatDate(selectedComp?.createdAt)}
        </p>
      </div>

      <div>
        <ReactPlayer
          ref={playerRef}
          url={relevantContent?.audio}
          // playing={isPlaying}
          width="100%"
          height={isYoutubeMedia ? height : "40px"}
          controls
          // onReady={onReady}
        />

        {contentSegment?.contentId ? (
          currentTranscription ? (
            <div className="text-center mt-4">
              <p className="text-gray-400">
                {currentTranscription?.pinyin || "..."}
              </p>

              <Link
                className="text-3xl font-extralight"
                onClick={() => {
                  setIfExists({ ...currentTranscription, contentId });
                }}
                href={`/nmm/${encodeURIComponent(
                  currentTranscription?.input || currentTranscription?.hanzi
                )}${currentTranscription?.lang ? `?lang=${resolveLangCode(currentTranscription?.lang)}` : ""}`}
                target="_blank"
              >
                {currentTranscription?.input || currentTranscription?.hanzi}
              </Link>

              <p className="text-gray-500">{currentTranscription?.en}</p>
            </div>
          ) : (
            <div className="text-center mt-4">
              <p className="text-gray-100 dark:text-gray-900">...</p>

              <Link
                className="text-3xl font-extralight dark:text-gray-900 text-gray-100"
                href={``}
                target="_blank"
              >
                ...
              </Link>

              <p className="dark:text-gray-900 text-gray-100">...</p>
            </div>
          )
        ) : null}
      </div>
    </article>
  ) : (
    selectedComp?.createdAt && (
      <article className="dark:bg-[rgb(14,15,16)] bg-gray-50 p-4 sm:p-8 rounded-2xl mt-4">
        <div className="mb-4">
          <Link
            className="font-bold text-xl"
            target="_blank"
            href={`/nmm/${contentSegment?.input || contentSegment?.hanzi}${contentSegment?.lang ? `?lang=${contentSegment?.lang}` : ""}`}
          >
            Learning Context
          </Link>
          <p
            className="font-extralight text-gray-500 text-sm"
            onClick={playCurrentSegment}
          >
            You learned this character on {formatDate(selectedComp?.createdAt)}
          </p>
        </div>

        <div>
          <p className=" text-gray-600 dark:text-gray-400">
            {contentSegment?.pinyin || contentSegment?.roman}
          </p>

          <Link
            href={`/nmm/${contentSegment?.input || contentSegment?.hanzi}${contentSegment?.lang ? `?lang=${contentSegment?.lang}` : ""}`}
            target="_blank"
            className="font-extralight block text-2xl"
          >
            {contentSegment?.input || contentSegment?.hanzi}
          </Link>
          <p className="font-light dark:text-gray-500">{contentSegment?.en}</p>
        </div>
      </article>
    )
  );
};

export const CharacterLearningContext = ({
  selectedComp,

  characterId,
}: any) => {
  const lang = useGetCurrentLang();

  const items = useGetCharacterLearningContext({ lang, characterId });

  const learnedCharacter = selectedComp;

  const contentContext = [
    ...new Set(
      (learnedCharacter?.contentContext || []).map((item: any) =>
        JSON.stringify(item)
      )
    ),
  ]?.map((item: any) => JSON.parse(item));

  const slicedItems = useMemo(() => {
    if (contentContext?.length > 0) {
      return contentContext;
    }
    return items?.slice(0, 10);
  }, [items, contentContext]);

  if (!slicedItems?.length) {
    return <Nothing message="Nothing found" />;
  }

  if (slicedItems?.length) {
    return (
      <div>
        {/* <h1>TODO: {characterId}</h1> */}

        {slicedItems?.map((item: any) => {
          return (
            <SentenceItem
              key={JSON.stringify(item)}
              currentPhrase={item}
              selectedComp={selectedComp}
              selectedChar={characterId}
              lang={item?.lang}
            />
          );
        })}
      </div>
    );
  }

  if (!learnedCharacter || !learnedCharacter?.contentContext?.length) {
    return <Nothing message="Nothing found" />;
  }

  return <CharacterLearningContextInner selectedComp={selectedComp} />;
};
