import { useCallback, useEffect, useRef, useState } from "react";
import { Header, NextIcon } from "@/components/ui/icons";

import ReactPlayer from "react-player";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { useSearchParams } from "@/hooks/use-search-params";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faRepeat } from "@fortawesome/pro-thin-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export function VideoPlayer({
  media: { url, scripts, title },
  mediaIndex,
  setMediaIndex,
}: any) {
  const [toggleLoop, setToggleLoop] = useState<any>(null);
  const [toggleLoops, setToggleLoops] = useState<any>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoHidden, setIsVideoHidden] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [currentTime, setTime] = useState(0);
  const playerRef = useRef() as any;

  const { data: learnedCharacters } = useListCharactersQuery();

  const onReady = useCallback(() => {
    const timeToStart = 7 * 60 + 12.6;
    // playerRef.current.seekTo(0, 'seconds')
  }, [playerRef.current]);

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

        if (currentTime > lastEnd) {
          playerRef.current.seekTo(firstStart, "seconds");

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
  }, [toggleLoops]);

  console.log("player ref", playerRef);

  const { data: contentsArr } = useListContentsQuery();

  const { lessonId } = useSearchParams();
  const lesson = contentsArr?.find((content: any) => content?.id === lessonId);

  const finalUrl = lesson?.audio || url;

  return (
    <div className="grow ml-4 md:ml-16 flex flex-col items-center">
      <div className="space-x-4 my-4">
        <button
          onClick={() => {
            setFocusMode((isHidden) => !isHidden);
          }}
        >
          {focusMode ? "show all" : "focus"}
        </button>
        <button
          onClick={() => {
            setIsVideoHidden((isHidden) => !isHidden);
          }}
        >
          {isVideoHidden ? "show video" : "hide video"}
        </button>
      </div>

      <div className="flex-col sm:flex-row flex justify-between w-full sm:space-x-4">
        <div
          className={`${isVideoHidden ? "hidden" : ""} ${
            lesson?.transcriptions?.length ? "sm:h-40" : "h-[800px]"
          } grow w-full`}
        >
          <ReactPlayer
            ref={playerRef}
            url={finalUrl}
            playing={isPlaying}
            width="100%"
            height={lesson?.transcriptions?.length ? "700px" : "600px"}
            controls={true}
            onReady={onReady}
          />

          <Header className="my-4 text-black text-center dark:text-gray-300 font-extralight">
            {lesson?.title || title}
          </Header>
        </div>

        {lesson?.transcriptions?.length ? (
          <div
            className={`text-center md:block grow w-full ${
              isVideoHidden ? "my-8" : ""
            }`}
          >
            <div className="space-y-4">
              {(lesson?.transcriptions || scripts)
                .filter((script: any) => {
                  if (focusMode) {
                    return (
                      (script?.timestamp?.[0] || script?.start) < currentTime &&
                      (script?.timestamp?.[1] || script?.end) > currentTime
                    );
                  }

                  return true;
                })
                .map((example: any, idx: any) => {
                  return (
                    <div
                      key={`${Math.random()}-${example?.hanzi}-${idx}`}
                      className="flex mx-4"
                      // className={`${
                      //   isVideoHidden || focusMode ? "text-2xl" : "md:text-lg"
                      // } text-center w-full font-extralight flex flex-col justify-center items-center`}
                    >
                      <div
                        className={`${
                          focusMode ? "text-center" : "text-left"
                        } w-full ${focusMode || isVideoHidden ? "" : ""}`}
                        role="button"
                        onClick={() => {
                          console.log("PLAYER REF", playerRef.current);
                          playerRef.current.seekTo(
                            example?.timestamp?.[0] || example?.start,
                            "seconds"
                          );

                          try {
                            playerRef.current?.player?.player?.play();
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <div>
                          {(example?.hanzi || example?.nepali)
                            .split("")
                            .map((item: any, idx: any) => {
                              return (
                                <span
                                  key={`${JSON.stringify(item)}-${idx}`}
                                  className={`${
                                    (example?.timestamp?.[0] ||
                                      example?.start) < currentTime &&
                                    (example?.timestamp?.[1] || example?.end) >
                                      currentTime
                                      ? "dark:text-white"
                                      : learnedCharacters?.find(
                                          (char: any) => char?.hanzi === item
                                        )
                                      ? "dark:text-gray-200"
                                      : "dark:text-gray-400 text-gray-300"
                                  } transition`}
                                >
                                  {item}
                                </span>
                              );
                            })}
                        </div>
                        {example?.pinyin && (
                          <p
                            className={`${
                              (example?.timestamp?.[0] || example?.start) <
                                currentTime &&
                              (example?.timestamp?.[1] || example?.end) >
                                currentTime
                                ? "dark:text-gray-300"
                                : "dark:text-gray-500 text-gray-400"
                            } transition`}
                          >
                            {example?.pinyin || example?.nepaliRoman}
                          </p>
                        )}
                        {example?.en && (
                          <p
                            className={`${
                              (example?.timestamp?.[0] || example?.start) <
                                currentTime &&
                              (example?.timestamp?.[1] || example?.end) >
                                currentTime
                                ? "dark:text-white"
                                : "dark:text-gray-400 text-gray-500"
                            } transition`}
                          >
                            {example?.en}
                          </p>
                        )}
                        {example?.lit && (
                          <p
                            className={`${
                              (example?.timestamp?.[0] || example?.start) <
                                currentTime &&
                              (example?.timestamp?.[1] || example?.end) >
                                currentTime
                                ? "dark:text-gray-500"
                                : "dark:text-gray-500 text-gray-500"
                            } transition`}
                          >
                            {example?.lit}
                          </p>
                        )}
                      </div>

                      <div className="space-x-4 flex flex-row items-center">
                        <Link
                          target="_blank"
                          href={`https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=en&text=${encodeURIComponent(
                            example?.hanzi
                          )}&op=translate`}
                          className="text-gray-500 hover:text-white"

                          // className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
                        >
                          <FontAwesomeIcon icon={faGoogle} />
                        </Link>

                        <Link
                          href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                            example?.hanzi
                          )}`}
                          className="text-gray-500 hover:text-white"
                          target="_blank"
                        >
                          <FontAwesomeIcon icon={faLanguage} />
                        </Link>
                        <button
                          onClick={() => {
                            // setToggleLoop((val: any) =>
                            //   val === example ? null : example
                            // );

                            setToggleLoops((val: any) => {
                              const exist = val?.find(
                                (item: any) => item?.end === example?.end
                              );
                              if (exist) {
                                return val?.filter((item: any) => {
                                  return item?.end !== example?.end;
                                });
                              }
                              return val.concat(example);
                            });
                          }}
                        >
                          <FontAwesomeIcon
                            className={
                              toggleLoops?.find(
                                (item: any) => item?.end === example?.end
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
                })}
            </div>
          </div>
        ) : null}

        <div className="hidden md:block relative">
          <button
            className="absolute right-0 top-1/2 dark:hover:text-white shadow-md px-4 py-1 rounded-full dark:text-gray-600"
            onClick={() => {
              setMediaIndex((idx: any) => idx + 1);

              setLessonIndex((idx) => idx + 1);
            }}
          >
            <NextIcon className="text-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
