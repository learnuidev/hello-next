import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { Icons } from "@/components/ui/icons.v2";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { groupBy } from "ramda";

export const TranscriptionsView = ({
  contentId,
  setSelected,
  textSize,
  viewPinyin,
  setIfExists,
  currentTime,
  activeSubtitle,
  brightMode,
  isCharactersLoading,
  learnedCharacters2,
  components,
  loop,
  setLoop,
  seek,
  editMode,
  setTimer,
}: any) => {
  const { data: content } = useGetContentQuery({ contentId });
  const groupBySectionId = groupBy((item: any) => item.sectionId);

  const times = useContentEditStore((state) => state.times);

  return Object.entries(groupBySectionId(content?.transcriptions) as any)?.map(
    (sectionAndTranscriptions: any) => {
      const transcriptions = sectionAndTranscriptions[1];

      return (
        <div key={JSON.stringify(sectionAndTranscriptions)}>
          {transcriptions?.map((subtitle: any) => {
            const timeStamp = times?.find(
              (time: any) => time?.id === subtitle?.id
            ) as any;

            return (
              <>
                <span
                  onMouseEnter={() => {
                    setSelected(subtitle);
                  }}
                  onMouseLeave={() => {
                    setSelected(null);
                  }}
                  key={JSON.stringify(subtitle)}
                  className={cn(
                    "inline-flex flex-col mt-2 items-start px-[2px]",
                    textSize?.[3]
                  )}
                >
                  {viewPinyin &&
                    ["zh", "zh-CN", "ur"].includes(subtitle.lang) && (
                      <Link
                        onClick={() => {
                          setIfExists({ ...subtitle, contentId });
                        }}
                        href={`/nmm/${encodeURIComponent(subtitle?.input || subtitle.hanzi)}?lang=${subtitle?.lang || "zh"}`}
                        target="_blank"
                        className={cn(
                          subtitle?.pinyin ? "text-gray-500" : "text-black",
                          "text-sm",
                          currentTime > subtitle?.start &&
                            currentTime < subtitle.end
                            ? "text-white "
                            : "text-gray-500",

                          textSize?.[0],
                          activeSubtitle?.sentence === subtitle?.sentence
                            ? "text-gray-400"
                            : "text-gray-600",
                          currentTime > subtitle?.start &&
                            currentTime < subtitle.end
                            ? "dark:text-white text-black"
                            : "",
                          currentTime === 0
                            ? "dark:text-gray-300 text-black"
                            : "",
                          "text-start"
                        )}
                      >
                        {subtitle?.roman || subtitle?.pinyin || ""}
                      </Link>
                    )}

                  {brightMode ? (
                    <div>
                      {(subtitle?.input || subtitle?.hanzi)
                        ?.split("")
                        ?.map((val: any, idx: any) => {
                          const learnedChar = learnedCharacters2?.find(
                            (char: any) => char?.hanzi === val
                          );
                          const comp = components?.find(
                            (char: any) => char?.hanzi === val
                          );

                          const color = calculateColor({
                            tone: learnedChar?.tone_level,
                          });

                          const hoverColor = calculateHoverColor({
                            tone: learnedChar?.tone_level || comp?.tone_level,
                          });

                          return (
                            <span
                              onClick={() => {
                                if (loop) {
                                  setLoop(subtitle.input);
                                }
                                seek(timeStamp?.start || subtitle?.start);
                              }}
                              key={`${val}-${idx}`}
                              className={cn(
                                `${
                                  currentTime > subtitle?.start &&
                                  currentTime < subtitle.end
                                    ? brightMode
                                      ? learnedChar?.status === "forgotten"
                                        ? "text-gray-200 dark:text-gray-600"
                                        : `${color} ${hoverColor}`
                                      : `dark:text-white text-black ${color} ${hoverColor}`
                                    : !brightMode || isCharactersLoading
                                      ? `dark:text-gray-300 text-gray-700 ${hoverColor}`
                                      : // learnedCharacters.includes(prop?.hanzi)
                                        learnedChar
                                        ? learnedChar?.status === "forgotten"
                                          ? `text-gray-200 dark:text-gray-600 ${hoverColor}`
                                          : // : lastAnswer?.totalCharacters?.includes(character?.hanzi)
                                            //   ? "text-rose-500"
                                            `${color} text-gray-300 ${hoverColor}`
                                        : `dark:text-gray-200 text-gray-800 ${hoverColor}`
                                } ${hoverColor} ${color} text-2xl transition lowercase font-light`,
                                textSize?.[1],
                                // TODO: Set learned view
                                true &&
                                  learnedChar?.status === "forgotten" &&
                                  "text-gray-300 dark:text-gray-600"
                              )}
                            >
                              {val}
                            </span>
                          );
                        })}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (loop) {
                          setLoop(subtitle.input);
                        }
                        seek(timeStamp?.start || subtitle?.start);
                      }}
                      className={cn(
                        "text-3xl font-light dark:text-gray-500 text-gray-700 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-black text-left",

                        textSize?.[1],
                        activeSubtitle?.sentence === subtitle?.sentence
                          ? "text-gray-400"
                          : " text-gray-600",
                        currentTime > subtitle?.start &&
                          currentTime < subtitle.end
                          ? "dark:text-white text-black"
                          : "0",
                        currentTime === 0
                          ? "dark:text-gray-400 text-gray-700"
                          : ""
                      )}
                    >
                      {subtitle?.input || subtitle?.hanzi}
                      {"   "}
                    </button>
                  )}
                </span>

                {viewPinyin && !["zh", "zh-CN"]?.includes(subtitle.lang) && (
                  <div className="mt-4 flex space-x-4">
                    <button
                      className={cn(
                        "sm:text-2xl text-[16px]",
                        loop === subtitle?.input
                          ? "text-white"
                          : "text-gray-600"
                      )}
                      onClick={() => {
                        setLoop((loop: any) => {
                          if (loop) {
                            return null;
                          }

                          return subtitle?.input;
                        });
                      }}
                    >
                      <Icons.loop />
                    </button>
                    <Link
                      href={`/nmm/${encodeURIComponent(subtitle?.input || subtitle.hanzi)}?lang=${subtitle?.lang || "zh"}`}
                      target="_blank"
                      className={cn(
                        "sm:text-2xl text-[16px] dark:hover:text-white hover:text-black text-gray-600"
                      )}
                    >
                      <Icons.magnifyingGlass />
                    </Link>
                  </div>
                )}

                {editMode && (
                  <div className="flex flex-col">
                    {(timeStamp?.roman || subtitle?.roman) &&
                      editMode &&
                      ["zh", "zh-CN"]?.includes(subtitle.lang) && (
                        <textarea
                          className=""
                          value={timeStamp?.roman || subtitle?.roman}
                          onChange={(event) => {
                            setTimer("roman", subtitle, event?.target?.value);
                          }}
                        />
                      )}

                    {(timeStamp?.input || subtitle?.input) && editMode && (
                      <textarea
                        className="my-4 focus-visible:outline-none focus-visible:ring-ring"
                        value={timeStamp?.input || subtitle?.input}
                        onChange={(event) => {
                          setTimer("input", subtitle, event?.target?.value);
                        }}
                      />
                    )}

                    {editMode && (
                      <textarea
                        className="w-full mt-4 focus-visible:outline-none focus-visible:ring-ring"
                        value={timeStamp?.en || subtitle?.en}
                        onChange={(event) => {
                          setTimer("en", subtitle, event?.target?.value);
                        }}
                      />
                    )}

                    {editMode && (
                      <div className="flex text-gray-400 text-[12px] items-center justify-start mt-4 space-x-2">
                        <div>
                          <input
                            value={timeStamp?.start || subtitle?.start}
                            onChange={(event) => {
                              setTimer("start", subtitle, event?.target?.value);
                            }}
                          />
                          <button
                            onClick={() => {
                              setTimer("start", subtitle);
                            }}
                          >
                            Set Start{" "}
                          </button>
                        </div>

                        <div>
                          <input
                            value={timeStamp?.end || subtitle?.end}
                            onChange={(event) => {
                              setTimer("end", subtitle, event?.target?.value);
                            }}
                          />

                          <button
                            onClick={() => {
                              setTimer("end", subtitle);
                            }}
                          >
                            {" "}
                            Set End{" "}
                          </button>
                        </div>
                      </div>
                    )}

                    {editMode && (
                      <div className="border-b-2 dark:border-gray-800 mt-4"></div>
                    )}
                  </div>
                )}
              </>
            );
          })}
        </div>
      );
    }
  );
};
