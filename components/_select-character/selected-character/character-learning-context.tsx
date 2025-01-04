import { isYoutube } from "@/app/(auth)/convos/utils/is-youtube";
import { formatDate } from "@/components/settings-dialog/utils/format-date";
import { useGetContentQuery } from "@/domain/content/content.queries";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export const CharacterLearningContext = ({ selectedComp }: any) => {
  const learnedCharacter = selectedComp;
  const playerRef = useRef() as any;
  const [currentTime, setTime] = useState(0);

  console.log("learnedChar", learnedCharacter);

  const contentSegment = learnedCharacter?.contentContext?.find(
    (content: any) => content?.contentId
  );

  const contentId = contentSegment?.contentId || "";

  const { data: relevantContent } = useGetContentQuery({ contentId });

  const isYoutubeMedia = isYoutube(relevantContent?.audio);

  useEffect(() => {
    if (contentSegment?.start) {
      playerRef?.current?.seekTo(Math.max(contentSegment?.start, 0));
    }
  }, [contentSegment?.start, isYoutubeMedia]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((seconds) => playerRef?.current?.getCurrentTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    relevantContent && (
      <article className="dark:bg-[rgb(11,12,13)] bg-gray-50 p-2 sm:px-8 rounded-2xl mt-8">
        <div className="mb-8">
          <h2 className="font-bold text-xl">Learning Context</h2>
          <p
            className="text-gray-400"
            onClick={() => {
              playerRef?.current?.seekTo(Math.max(contentSegment?.start, 0));
            }}
          >
            You learned this character on {formatDate(selectedComp?.createdAt)}
          </p>
        </div>

        <div>
          <button
            className="text-gray-400"
            onClick={() => {
              playerRef?.current?.seekTo(Math.max(contentSegment?.start, 0));
            }}
          >
            {contentSegment?.pinyin || contentSegment?.roman}
          </button>

          <Link
            href={`/convos/${contentId}?seek=${contentSegment?.start}`}
            target="_blank"
            className="block text-3xl font-extralight"
          >
            {contentSegment?.input || contentSegment?.hanzi}
          </Link>
          <button
            onClick={() => {
              playerRef?.current?.seekTo(
                Math.max(contentSegment?.start - 2, 0)
              );
            }}
            className="mb-4 text-gray-500"
          >
            {contentSegment?.en}
          </button>

          <ReactPlayer
            ref={playerRef}
            url={relevantContent?.audio}
            // playing={isPlaying}
            width="100%"
            height={isYoutubeMedia ? "400px" : "40px"}
            controls
            // onReady={onReady}
          />
        </div>
      </article>
    )
  );
};
