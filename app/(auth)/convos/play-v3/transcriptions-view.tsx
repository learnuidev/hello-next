import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { Icons } from "@/components/ui/icons.v2";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { groupBy } from "ramda";
import { SubtitleInputEditor } from "./subtitle-input-editor";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { CharacterItem } from "@/components/_select-character/character-item";

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
              (time: any) => time?.id === subtitle?.id,
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
                    textSize?.[3],
                  )}
                >
                  <span
                    onClick={() => {
                      if (loop) {
                        setLoop(subtitle.id);
                      }
                      seek(timeStamp?.start || subtitle?.start);
                    }}
                    className={cn(
                      "text-[16px]",
                      currentTime > subtitle?.start &&
                        currentTime < subtitle.end
                        ? "text-red-400 dark:text-white"
                        : "text-gray-500",
                    )}
                  >
                    {smartSplit({
                      input: subtitle?.input || subtitle?.hanzi,
                      lang: subtitle?.lang,
                    })?.map((character: any, idx: number) => {
                      return (
                        <CharacterItem
                          className={cn(
                            "text-[16px]",
                            currentTime > subtitle?.start &&
                              currentTime < subtitle.end
                              ? "text-red-400 dark:text-white"
                              : "",
                          )}
                          character={character}
                          key={`timeline-tab-${idx}-${character}-transcriptions-view`}
                        />
                      );
                    })}
                  </span>
                </span>

                {viewPinyin && !["zh", "zh-CN"]?.includes(subtitle.lang) && (
                  <div className="mt-4 flex space-x-4">
                    <button
                      className={cn(
                        "sm:text-2xl text-[16px]",
                        loop === subtitle?.input
                          ? "text-white"
                          : "text-gray-600",
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
                        "sm:text-2xl text-[16px] dark:hover:text-white hover:text-black text-gray-600",
                      )}
                    >
                      <Icons.magnifyingGlass />
                    </Link>
                  </div>
                )}

                {editMode && (
                  <div className="flex flex-col">
                    {editMode && (
                      <div className="w-full">
                        <p>pinyin</p>
                        <input
                          className="w-full mb-4 focus-visible:outline-none focus-visible:ring-ring"
                          value={timeStamp?.pinyin || subtitle?.pinyin}
                          onChange={(event) => {
                            setTimer("pinyin", event?.target?.value);
                          }}
                        />
                      </div>
                    )}
                    {subtitle?.lang === "zh"
                      ? null
                      : editMode && (
                          <div>
                            <p>roman</p>
                            <input
                              className="w-full mb-4 focus-visible:outline-none focus-visible:ring-ring"
                              value={timeStamp?.roman || subtitle?.roman}
                              onChange={(event) => {
                                setTimer("roman", event?.target?.value);
                              }}
                            />
                          </div>
                        )}

                    {(timeStamp?.hanzi || subtitle?.hanzi) && editMode && (
                      <SubtitleInputEditor
                        attribute="hanzi"
                        title="hanzi"
                        setTimer={setTimer}
                        subtitle={timeStamp || subtitle}
                      />
                    )}

                    {(timeStamp?.input || subtitle?.input) && editMode && (
                      <SubtitleInputEditor
                        attribute="input"
                        title="input"
                        setTimer={setTimer}
                        subtitle={timeStamp || subtitle}
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
    },
  );
};
