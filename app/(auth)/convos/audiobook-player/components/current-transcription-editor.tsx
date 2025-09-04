"use client";

import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { ContentTranscription } from "@/domain/content/content.api";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { europeanLangs } from "@/libs/constants/european-langs";

export const CurrentTranscriptionEditor = ({
  currentTranscription,
  contentId,
}: {
  currentTranscription: ContentTranscription;
  contentId: string;
}) => {
  const { data: content } = useGetContentQuery({ contentId });
  const editMode = useContentEditStore((state) => state.editMode);

  const setEditMode = useContentEditStore((state) => state.setEditMode);
  const resetTimes = useContentEditStore((state) => state.resetTimes);
  const times = useContentEditStore((state) => state.times);

  const setTimes = useContentEditStore((state) => state.setTimes);

  const { currentTime, setCurrentTime } = useCurrentTime(contentId);

  const updateContentMutation = useUpdateContentMutation();

  const setTimer = (
    type: "start" | "end" | "pinyin" | "hanzi" | "roman" | "en" | "input",
    newValue?: string
  ) => {
    const offset = newValue || currentTime - 0.2;

    setTimes((prev: any) => {
      const predicateFn = (item: any) => item?.id === currentTranscription?.id;
      const exists = prev?.find(predicateFn);

      let updated = prev;

      // const currIndex = prev?.findIndex(predicateFn);

      const currIndex = content?.transcriptions?.findIndex(predicateFn);
      const isLast = content?.transcriptions?.length - 1 === currIndex;

      if (!isLast && type === "end") {
        const nextIndex = currIndex + 1;
        const nextExample = content?.transcriptions?.[nextIndex];
        const nextExists = prev?.find(
          (item: any) => item?.id === nextExample?.id
        );

        if (nextExists) {
          updated = updated.map((item: any) => {
            if (item?.id === nextExample?.id) {
              return {
                ...nextExists,
                ["start"]: offset,
              };
            }

            return item;
          });
        } else {
          updated = updated.concat({
            id: nextExample?.id,
            start: offset,
          });
        }
      }

      if (exists) {
        updated = updated.map((item: any) => {
          if (item?.id === currentTranscription?.id) {
            return {
              ...exists,
              [type]: offset,
            };
          }

          return item;
        });
      }

      updated = updated.concat({
        id: currentTranscription?.id,
        [type]: offset,
      });

      return updated;
    });
  };

  if (!content) {
    return null;
  }

  const timeStamp = times?.find(
    (time: any) => time?.id === currentTranscription?.id
  ) as any;
  return (
    <div className="flex justify-center min-w-9xl mx-auto flex-col lg:mt-32 mt-16">
      <div className="w-full lg:w-[900px]">
        {currentTranscription?.lang !== "zh"
          ? null
          : editMode && (
              <textarea
                className="w-full"
                value={timeStamp?.["pinyin"] || currentTranscription?.pinyin}
                onChange={(event) => {
                  setTimer("pinyin", event?.target?.value);
                }}
              />
            )}
        {europeanLangs?.includes(currentTranscription?.lang) ||
        currentTranscription.lang === "zh"
          ? null
          : editMode && (
              <textarea
                className="w-full"
                value={timeStamp?.["roman"] || currentTranscription?.roman}
                onChange={(event) => {
                  setTimer("roman", event?.target?.value);
                }}
              />
            )}
        {europeanLangs?.includes(currentTranscription?.lang)
          ? null
          : (timeStamp?.hanzi || currentTranscription?.hanzi) &&
            editMode && (
              <textarea
                className="w-full"
                value={timeStamp?.hanzi || currentTranscription?.hanzi}
                onChange={(event) => {
                  setTimer("hanzi", event?.target?.value);
                }}
              />
            )}
        {(timeStamp?.input || currentTranscription?.input) && editMode && (
          <textarea
            className="w-full"
            value={timeStamp?.input || currentTranscription?.input}
            onChange={(event) => {
              setTimer("input", event?.target?.value);
            }}
          />
        )}
        {(timeStamp?.en || currentTranscription?.en) && editMode && (
          <textarea
            className="w-full"
            value={timeStamp?.en || currentTranscription?.en}
            onChange={(event) => {
              setTimer("en", event?.target?.value);
            }}
          />
        )}
      </div>
      <div className="mt-4 flex gap-8">
        <button
          onClick={() => {
            setEditMode(false);
          }}
        >
          Cancel
        </button>

        {editMode && (
          <button
            onClick={() => {
              const editedTranscriptions = {
                id: content?.id,
                transcriptions: content?.transcriptions?.map(
                  (transcription: any) => {
                    const time = times?.find(
                      (t: any) => t?.id === transcription?.id
                    ) as any;
                    return {
                      ...transcription,
                      ...time,
                    };
                  }
                ),
              };

              updateContentMutation
                .mutateAsync({
                  ...editedTranscriptions,
                } as any)
                .then((resp) => {
                  setEditMode();
                });
            }}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};
