import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/ui/icons";

import ReactPlayer from "react-player";
import {
  useGetContentQuery,
  useListContentsQuery,
} from "@/domain/content/content.queries";
import { useSearchParams } from "@/hooks/use-search-params";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  faGlasses,
  faLanguage,
  faRepeat,
  faVideo,
  faVideoSlash,
} from "@fortawesome/pro-thin-svg-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { groupBy } from "@/lib/utils";
import { calculateColor } from "@/app/nmm/utils";
import { Icons } from "../ui/icons.v2";
import { resolveLangCode } from "@/libs/openai/utils";
import { TranscriptItem } from "./youtube-transcript-item";
import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";
import { useParams } from "next/navigation";
import { useSize } from "@/hooks/use-size";

export function YouTubePlayer({ lessonId }: { lessonId: string }) {
  const [viewMode, setViewMode] = useState<any>(null);
  const [toggleLoop, setToggleLoop] = useState<any>(null);
  const [toggleLoops, setToggleLoops] = useState<any>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoHidden, setIsVideoHidden] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [currentTime, setTime] = useState(0);
  const params = useParams<{ "content-id": string }>();
  const contentId = params["content-id"];
  const playerRef = useRef() as any;
  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );
  const size = useSize();

  const { data: learnedCharacters } = useListCharactersQuery();

  // const { data: components } = useListContentsQuery();

  const onReady = useCallback(() => {
    const timeToStart = 7 * 60 + 12.6;
    // playerRef.current.seekTo(0, 'seconds')
  }, []);

  const [lessonIndex, setLessonIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((seconds) => playerRef?.current?.getCurrentTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (toggleLoops?.length) {
      const interval = setInterval(() => {
        const currentTime = playerRef?.current?.getCurrentTime();

        const lastEnd = Math.max(...toggleLoops?.map((x: any) => x?.end));
        const firstStart = Math.min(...toggleLoops?.map((x: any) => x?.start));

        console.log("TOGGLE LOOPS", toggleLoops);

        if (currentTime > lastEnd) {
          playerRef.current.seekTo(firstStart, "seconds");

          // for (const example of toggleLoops) {
          //   setRepeatHistories({
          //     contentId: contentId,
          //     ...example,
          //     input: example?.input || example?.hanzi,
          //     roman: example?.roman || example?.pinyin,
          //     createdAt: Date.now(),
          //   });
          // }

          try {
            playerRef.current?.player?.player?.play();
          } catch (err) {
            console.error(err);
          }
        }
        // setTime((seconds) => playerRef?.current?.getCurrentTime());
      }, 5);
      return () => clearInterval(interval);
    }
  }, [contentId, setRepeatHistories, toggleLoops]);

  // const { data: contentsArr } = useListContentsQuery();

  // const { lessonId } = useSearchParams();
  const { data: lesson } = useGetContentQuery({ contentId: lessonId });
  // const lesson = contentsArr?.find((content: any) => content?.id === lessonId);

  const finalUrl = lesson?.audio;

  const groupedTranscriptions = groupBy(lesson?.transcriptions || []);

  const currentScriptIndex = lesson?.transcriptions?.findIndex(
    (example: any) =>
      (example?.timestamp?.[0] || example?.start) < currentTime &&
      (example?.timestamp?.[1] || example?.end) > currentTime
  );

  console.log("SIZE", size);

  const isSmall = size?.[0] < 600;

  return (
    <div className="grow flex flex-col items-center">
      <div className="space-x-4 my-4 hidden md:block">
        <button
          onClick={() => {
            setViewMode((prev: any) => (prev === "para" ? null : "para"));
          }}
        >
          <FontAwesomeIcon icon={faGlasses} />
        </button>
        <button
          onClick={() => {
            setIsVideoHidden((isHidden) => !isHidden);
          }}
        >
          {isVideoHidden ? (
            <FontAwesomeIcon icon={faVideo} />
          ) : (
            <FontAwesomeIcon icon={faVideoSlash} />
          )}
        </button>
      </div>

      <div className="grid grid-cols-12">
        <div
          className={` ${isVideoHidden ? "hidden" : ""} md:col-span-8 col-span-12`}
        >
          {/* <div className="block md:hidden">
            <ReactPlayer
              ref={playerRef}
              url={finalUrl}
              playing={isPlaying}
              width="100%"
              height={"320px"}
              controls={true}
              onReady={onReady}
            />
          </div> */}
          <div className="">
            <ReactPlayer
              ref={playerRef}
              url={finalUrl}
              playing={isPlaying}
              width="100%"
              height={isSmall ? "200px" : "450px"}
              controls={true}
              onReady={onReady}
            />
          </div>

          <Header className="my-4 text-black text-center dark:text-gray-300 font-extralight hidden md:block">
            {lesson?.title}
          </Header>
        </div>

        {viewMode === "para" ? (
          <div
            className={
              isVideoHidden
                ? "col-span-12 mx-12 md:mx-32"
                : "col-span-12 md:col-span-4"
            }
          >
            <div
              className={`${
                isVideoHidden
                  ? "md:col-span-8 col-span-12"
                  : "md:col-span-4 col-span-12"
              } w-full text-center`}
            >
              <ScrollArea className="space-y-4 h-[700px] rounded-md border border-gray-900 p-4 w-full">
                <div className="space-y-8">
                  {Object.values(groupedTranscriptions)?.map(
                    (transcriptions: any) => {
                      const hanzis = transcriptions
                        ?.map((t: any) => t?.hanzi)
                        ?.join("");
                      return (
                        <div key={JSON.stringify(transcriptions)}>
                          <div className="flex flex-wrap">
                            {transcriptions
                              // ?.slice(0, 100)
                              .map((transcription: any) => {
                                return (
                                  <span
                                    role="button"
                                    className={`${
                                      transcription?.start < currentTime &&
                                      transcription?.end > currentTime
                                        ? "dark:text-white"
                                        : "dark:text-gray-400 text-gray-300"
                                    } transition block py-1 px-1`}
                                    key={transcription?.hanzi}
                                    onClick={() => {
                                      playerRef.current.seekTo(
                                        transcription?.start,
                                        "seconds"
                                      );

                                      try {
                                        playerRef.current?.player?.player?.play();
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    {" "}
                                    {transcription?.hanzi}
                                    {"  "}
                                  </span>
                                );
                              })}
                          </div>

                          <div className="px-2 pt-2 space-x-4 flex flex-row items-center">
                            <Link
                              // href=""
                              target="_blank"
                              href={`https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=en&text=${encodeURIComponent(
                                hanzis
                              )}&op=translate`}
                              className="text-gray-500 hover:text-white"
                            >
                              <FontAwesomeIcon icon={faGoogle} />
                            </Link>

                            <Link
                              // href=""
                              href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                                hanzis
                              )}`}
                              className="text-gray-500 hover:text-white"
                              target="_blank"
                            >
                              <FontAwesomeIcon icon={faLanguage} />
                            </Link>

                            {/* <Link
                              href={`/nmm/${encodeURIComponent(hanzis)}${transcriptions?.[0]?.lang ? `?lang=${resolveLangCode(transcriptions?.[0]?.lang)}` : ""}`}
                              className="text-gray-500 hover:text-white"
                              target="_blank"
                            >
                              <Icons.mandarin />
                            </Link> */}
                            <button
                              onClick={() => {
                                setToggleLoops(transcriptions);
                              }}
                            >
                              <FontAwesomeIcon
                                className={
                                  toggleLoops?.find((item: any) =>
                                    transcriptions?.find(
                                      (x: any) => x.end === item?.end
                                    )
                                  )
                                    ? "text-white"
                                    : "text-gray-500"
                                }
                                icon={faRepeat}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        ) : lesson?.transcriptions?.length ? (
          <div
            className={`${isVideoHidden ? "col-span-12" : "md:col-span-4 col-span-12"} w-full`}
          >
            <ScrollArea className="space-y-4 h-[700px] w-full rounded-md border border-gray-900 p-0 pb-16">
              <div className="sm:space-y-8 mt-4 w-full">
                {(lesson?.transcriptions || [])
                  .filter((script: any) => {
                    if (focusMode) {
                      return (
                        (script?.timestamp?.[0] || script?.start) <
                          currentTime &&
                        (script?.timestamp?.[1] || script?.end) > currentTime
                      );
                    }

                    return true;
                  })
                  .map((example: any, idx: any) => {
                    return (
                      <TranscriptItem
                        example={example}
                        key={`${example?.hanzi}-${idx}`}
                        toggleLoops={toggleLoops}
                        setToggleLoops={setToggleLoops}
                        currentTime={currentTime}
                        focusMode={focusMode}
                        isVideoHidden={isVideoHidden}
                        playerRef={playerRef}
                        learnedCharacters={learnedCharacters}
                        // components={components}
                      />
                    );
                  })}
              </div>
            </ScrollArea>
          </div>
        ) : null}
      </div>
    </div>
  );
}
