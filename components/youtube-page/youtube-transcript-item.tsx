import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faLanguage, faRepeat } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { resolveLangCode } from "@/libs/openai/utils";
import { useParams } from "next/navigation";
import { Icons } from "../ui/icons.v2";

export const TranscriptItem = ({
  example,
  toggleLoops,
  setToggleLoops,
  currentTime,
  focusMode,
  isVideoHidden,
  playerRef,
  learnedCharacters,
  // components,
}: any) => {
  const params = useParams<{ "content-id": string }>();
  const contentId = params["content-id"];

  const { data: contents } = useListCharactersQuery();

  // const { data: grammars } = useListGrammarsQuery({ content: example?.input });

  // const grammarContent = (
  //   grammars as ListGrammarsResponse
  // )?.grammarAnalysis?.find((grammar) => grammar?.input === example?.input);

  const content =
    contents?.find(
      (contentItem: any) =>
        (contentItem?.input || contentItem?.hanzi) ===
        (example?.input || example?.hanzi)
    ) ||
    learnedCharacters?.find(
      (contentItem: any) =>
        (contentItem?.input || contentItem?.hanzi) ===
        (example?.input || example?.hanzi)
    );

  const setRepeatHistories = useRepeatHistoryStore((state) => state.setHistory);

  const histories = useRepeatHistoryStore((state) => state.history);
  const totalRepeats = histories?.filter((history: any) => {
    return (
      history?.contentId === contentId &&
      history?.input === (example?.input || example?.hanzi)
    );
  });

  const ConfigButtons = () => {
    return (
      <div className="space-x-2 flex flex-row items-center">
        <Link
          target="_blank"
          href={`https://translate.google.com/?tl=en&text=${encodeURIComponent(
            toggleLoops.length
              ? toggleLoops
                  ?.sort((a: any, b: any) => a?.end - b?.end)
                  ?.map((x: any) => x?.hanzi || x?.input)
                  ?.join("")
              : example?.hanzi || example?.input
          )}&op=translate`}
          className="text-gray-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faGoogle} />
        </Link>

        {example?.lang === "zh" && (
          <Link
            href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
              toggleLoops.length
                ? toggleLoops
                    ?.sort((a: any, b: any) => a?.end - b?.end)
                    ?.map((x: any) => x?.hanzi || x?.input)
                    ?.join("")
                : example?.hanzi || example?.input
            )}`}
            className="text-gray-500 hover:text-white"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLanguage} />
          </Link>
        )}

        <Link
          href={`/nmm/${encodeURIComponent(
            // toggleLoops.length
            //   ? toggleLoops
            //       ?.sort((a: any, b: any) => a?.end - b?.end)
            //       ?.map((x: any) => x?.hanzi || x?.input)
            //       ?.join("")
            // :
            example?.hanzi || example?.input
          )}${example?.lang ? `?lang=${resolveLangCode(example?.lang)}` : ""}`}
          className="text-gray-500 hover:text-white"
          target="_blank"
        >
          <Icons.mandarin />
        </Link>
        <button
          onClick={() => {
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
              toggleLoops?.find((item: any) => item?.end === example?.end)
                ? "text-white"
                : "text-gray-500"
            }
            icon={faRepeat}
          />
        </button>
      </div>
    );
  };

  const Explanations = () => {
    return (
      <>
        {/* {["zh-CN", "zh", "ml", "ne", "ja", "ko", "fa", "ar"]?.includes(
          example?.lang
        ) &&
          (content?.pinyin ||
            content?.roman ||
            example?.pinyin ||
            example?.roman) && (
            <p
              className={`${
                (example?.timestamp?.[0] || example?.start) < currentTime &&
                (example?.timestamp?.[1] || example?.end) > currentTime
                  ? "dark:text-white"
                  : " text-gray-400"
              } transition`}
            >
              {example?.pinyin ||
                example?.roman ||
                content?.pinyin ||
                content?.roman}
            </p>
          )} */}

        {(content?.en || example?.en) && (
          <p
            className={`${
              (example?.timestamp?.[0] || example?.start) < currentTime &&
              (example?.timestamp?.[1] || example?.end) > currentTime
                ? "dark:text-gray-400"
                : "dark:text-gray-500 text-gray-500"
            } transition`}
          >
            {example?.en || content?.en}
          </p>
        )}
      </>
    );
  };

  return (
    <div className="w-120 px-4">
      <div className="flex items-center space-x-4">
        <div
          className={`${
            focusMode ? "text-center" : "text-left"
          } w-full ${focusMode || isVideoHidden ? "" : ""}`}
          role="button"
          onClick={() => {
            setRepeatHistories({
              contentId: contentId,
              ...example,
              input: example?.input || example?.hanzi,
              roman: example?.roman || example?.pinyin,
              createdAt: Date.now(),
            });

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="px-0 transition">
                {(example?.pinyin || example?.roman) && (
                  <p
                    className={`${
                      (example?.timestamp?.[0] || example?.start) <
                        currentTime &&
                      (example?.timestamp?.[1] || example?.end) > currentTime
                        ? "text-rose-400"
                        : "dark:text-gray-400 text-gray-300"
                    } transition text-md text-left`}
                  >
                    {example?.pinyin || example?.roman}
                  </p>
                )}
                <div className="text-left">
                  {(example?.input || example?.hanzi || example?.nepali || "")
                    .split("")
                    .map((item: any, idx: any) => {
                      // const component = components?.find(
                      //   (char: any) => char?.hanzi === item
                      // );

                      return (
                        <span
                          key={`${JSON.stringify(item)}-${idx}-${Math.random()}`}
                          className={`${
                            (example?.timestamp?.[0] || example?.start) <
                              currentTime &&
                            (example?.timestamp?.[1] || example?.end) >
                              currentTime
                              ? "text-rose-400"
                              : learnedCharacters?.find(
                                    (char: any) => char?.hanzi === item
                                  )
                                ? "dark:text-gray-200"
                                : "dark:text-gray-300 text-gray-300"
                          } transition text-md`}
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>

                {/* <p
                  className={`${
                    (example?.timestamp?.[0] || example?.start) < currentTime &&
                    (example?.timestamp?.[1] || example?.end) > currentTime
                      ? "text-rose-400"
                      : "text-gray-500"
                  } transition text-md`}
                >
                  {" "}
                  {example?.en}
                </p> */}
              </TooltipTrigger>
              <TooltipContent className="bg-black border-gray-800 p-4">
                <Explanations />

                <div className="mt-4">
                  <ConfigButtons />
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* <div className="block sm:hidden"> */}
          <Explanations />
          {/* </div> */}
        </div>

        {/* <div className="invisible hover:visible active:visible"> */}

        <div>
          <ConfigButtons />
          <div className="flex text-gray-400 text-[12px] items-center justify-end space-x-2">
            <Icons.music />
            <p className="font-extralight">{totalRepeats?.length}</p>
          </div>
        </div>

        {/* </div> */}
      </div>
      <div className="mt-4"> </div>
    </div>
  );
};
