import { useCharacterContextStore } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { isYoutube } from "@/app/(auth)/convos/utils/is-youtube";
import { formatDate } from "@/components/settings-dialog/utils/format-date";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { resolveLangCode } from "@/libs/openai/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const CharacterLearningContextInner = ({ selectedComp }: any) => {
  const learnedCharacter = selectedComp;
  const playerRef = useRef() as any;
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

  const context = useCharacterContextStore((state) => state.context);
  const setContext = useCharacterContextStore((state) => state.setContext);

  const setIfExists = (evt: any) => {
    console.log("EVT", evt);
    const exists = context?.filter(
      (ctx: any) => (ctx?.input || ctx?.hanzi) === (evt?.input || evt?.hanzi)
    )?.[0];

    if (exists) {
      console.log("EXISTS", exists);
      // return setContext(context);
      return null;
    }
    setContext((prev: any) => prev?.concat(evt));
    return null;
  };

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

    console.log("seekTo", maxValue);
    playerRef?.current?.seekTo(maxValue);

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  }

  const transcriptions = relevantContent?.transcriptions;

  const currentTranscription = transcriptions?.find(
    (trans: any) => trans?.start < currentTime && trans?.end > currentTime
  );

  return relevantContent ? (
    <article className="dark:bg-[rgb(11,12,13)] bg-gray-50 p-2 sm:px-8 rounded-2xl mt-8">
      <div className="mb-4">
        <Link
          className="font-bold text-xl"
          target="_blank"
          href={`/convos/${contentId}?seek=${contentSegment?.start}`}
        >
          Learning Context
        </Link>
        <p
          className="font-extralight text-gray-500 dark:text-gray-400"
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
            <div className="text-center my-4">
              <p className="text-gray-400">
                {currentTranscription?.pinyin || "..."}
              </p>

              <Link
                className="text-3xl font-extralight"
                onClick={() => {
                  setIfExists({ ...currentTranscription, contentId });
                }}
                href={`/nmm/${encodeURIComponent(
                  currentTranscription?.input
                )}${currentTranscription?.lang ? `?lang=${resolveLangCode(currentTranscription?.lang)}` : ""}`}
                target="_blank"
              >
                {currentTranscription?.input}
              </Link>

              <p className="text-gray-500">{currentTranscription?.en}</p>
            </div>
          ) : (
            <div className="text-center my-4">
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
      <article className="dark:bg-[rgb(11,12,13)] bg-gray-50 p-2 sm:px-8 rounded-2xl mt-8">
        <div className="mb-4">
          <Link
            className="font-bold text-xl"
            target="_blank"
            href={`/nmm/${contentSegment?.input || contentSegment?.hanzi}${contentSegment?.lang ? `?lang=${contentSegment?.lang}` : ""}`}
          >
            Learning Context
          </Link>
          <p
            className="font-extralight dark:text-gray-400 text-gray-500"
            onClick={playCurrentSegment}
          >
            You learned this character on {formatDate(selectedComp?.createdAt)}
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            {contentSegment?.pinyin || contentSegment?.roman}
          </p>

          <Link
            href={`/nmm/${contentSegment?.input || contentSegment?.hanzi}${contentSegment?.lang ? `?lang=${contentSegment?.lang}` : ""}`}
            target="_blank"
            className="block text-3xl font-extralight"
          >
            {contentSegment?.input || contentSegment?.hanzi}
          </Link>
          <p className="mb-4 text-gray-500">{contentSegment?.en}</p>
        </div>
      </article>
    )
  );
};

export const CharacterLearningContext = ({ selectedComp }: any) => {
  const learnedCharacter = selectedComp;

  if (!learnedCharacter?.contentContext?.length) {
    return null;
  }

  return <CharacterLearningContextInner selectedComp={selectedComp} />;
};
