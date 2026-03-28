"use client";

import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { ContentTranscription } from "@/domain/content/content.api";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { useState } from "react";
import { formatTime } from "../../_play/utils";

type LocalTranscription = ContentTranscription & { _isNew?: boolean };

export const AllTranscriptionsEditor = ({
  contentId,
  currentTime,
  seekAndPlay,
}: {
  contentId: string;
  currentTime: number;
  seekAndPlay: (time: number) => void;
}) => {
  const { data: content } = useGetContentQuery({ contentId });
  const editMode = useContentEditStore((state) => state.editMode);
  const setEditMode = useContentEditStore((state) => state.setEditMode);
  const setTimes = useContentEditStore((state) => state.setTimes);

  const updateContentMutation = useUpdateContentMutation();

  const [localTranscriptions, setLocalTranscriptions] = useState<
    LocalTranscription[] | null
  >(null);

  if (!content || !editMode) {
    return null;
  }

  const transcriptions: LocalTranscription[] =
    localTranscriptions || content.transcriptions || [];

  const updateLocalField = (
    index: number,
    field: string,
    value: any
  ) => {
    setLocalTranscriptions((prev) => {
      const current = prev || content.transcriptions || [];
      return current.map((item: LocalTranscription, i: number) =>
        i === index ? { ...item, [field]: value } : item
      );
    });
  };

  const handleSplit = (index: number) => {
    const trans = transcriptions[index];
    const midTime = Math.round(((trans.start + trans.end) / 2) * 10) / 10;
    const newId = `new-${Date.now()}`;

    const firstHalf: LocalTranscription = {
      ...trans,
      end: midTime,
    };
    const secondHalf: LocalTranscription = {
      ...trans,
      id: newId,
      start: midTime,
      _isNew: true,
      input: "",
      en: "",
      pinyin: "",
      roman: "",
      hanzi: "",
      chinglish: "",
    };

    setLocalTranscriptions((prev) => {
      const current = prev || content.transcriptions || [];
      return [
        ...current.slice(0, index),
        firstHalf,
        secondHalf,
        ...current.slice(index + 1),
      ];
    });
  };

  const handleMerge = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index;
    if (targetIndex < 0 || targetIndex + 1 >= transcriptions.length) return;

    setLocalTranscriptions((prev) => {
      const current = prev || content.transcriptions || [];
      const first = current[targetIndex];
      const second = current[targetIndex + 1];

      const merged: LocalTranscription = {
        ...first,
        end: second.end,
        input: [first.input, second.input].filter(Boolean).join(" "),
        en: [first.en, second.en].filter(Boolean).join(" "),
        pinyin: [first.pinyin, second.pinyin].filter(Boolean).join(" "),
        roman: [first.roman, second.roman].filter(Boolean).join(" "),
        hanzi: [first.hanzi, second.hanzi].filter(Boolean).join(""),
        chinglish:
          [first.chinglish, second.chinglish]
            .filter(Boolean)
            .join(" ") || undefined,
      };

      return [
        ...current.slice(0, targetIndex),
        merged,
        ...current.slice(targetIndex + 2),
      ];
    });
  };

  const handleAddBefore = (index: number) => {
    const trans = transcriptions[index];
    const prevEnd = index > 0 ? transcriptions[index - 1].end : 0;
    const midTime =
      Math.round(((prevEnd + trans.start) / 2) * 10) / 10;

    const newId = `new-${Date.now()}`;
    const newTrans: LocalTranscription = {
      id: newId,
      start: prevEnd,
      end: trans.start,
      input: "",
      en: "",
      pinyin: "",
      roman: "",
      hanzi: "",
      lang: trans.lang,
      _isNew: true,
    };

    setLocalTranscriptions((prev) => {
      const current = prev || content.transcriptions || [];
      return [...current.slice(0, index), newTrans, ...current.slice(index)];
    });
  };

  const handleAddAfter = (index: number) => {
    const trans = transcriptions[index];
    const nextStart =
      index < transcriptions.length - 1
        ? transcriptions[index + 1].start
        : trans.end + 5;
    const midTime =
      Math.round(((trans.end + nextStart) / 2) * 10) / 10;

    const newId = `new-${Date.now()}`;
    const newTrans: LocalTranscription = {
      id: newId,
      start: trans.end,
      end: nextStart,
      input: "",
      en: "",
      pinyin: "",
      roman: "",
      hanzi: "",
      lang: trans.lang,
      _isNew: true,
    };

    setLocalTranscriptions((prev) => {
      const current = prev || content.transcriptions || [];
      return [
        ...current.slice(0, index + 1),
        newTrans,
        ...current.slice(index + 1),
      ];
    });
  };

  const handleDelete = (index: number) => {
    setLocalTranscriptions((prev) => {
      const current = prev || content.transcriptions || [];
      return current.filter((_: LocalTranscription, i: number) => i !== index);
    });
  };

  const handleSave = () => {
    const editedTranscriptions = {
      id: content?.id,
      transcriptions: transcriptions.map((transcription: any) => {
        const { _isNew, ...rest } = transcription;
        return rest;
      }),
    };

    setTimes([]);
    updateContentMutation
      .mutateAsync({
        ...editedTranscriptions,
      } as any)
      .then(() => {
        setLocalTranscriptions(null);
        setEditMode();
      });
  };

  const handleCancel = () => {
    setLocalTranscriptions(null);
    setEditMode(false);
  };

  const TextField = ({
    label,
    field,
    value,
    index,
  }: {
    label: string;
    field: string;
    value: string | undefined;
    index: number;
  }) => {
    if (!value && !transcriptions[index]?._isNew) return null;
    return (
      <div className="flex items-center gap-2">
        <label className="text-xs dark:text-gray-500 text-gray-400 w-14 shrink-0">
          {label}
        </label>
        <input
          type="text"
          className="flex-1 text-sm border rounded px-2 py-1 dark:bg-black dark:border-gray-700"
          value={value || ""}
          onChange={(e) => updateLocalField(index, field, e.target.value)}
          placeholder={label}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:mt-16 mt-8 mb-80 max-h-[70vh] overflow-y-auto">
      <div className="flex gap-4 mb-4 sticky top-0 bg-white dark:bg-black z-10 py-2">
        <button
          className="px-4 py-1 border rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-1 border rounded bg-blue-600 text-white"
          onClick={handleSave}
          disabled={updateContentMutation.isPending}
        >
          {updateContentMutation.isPending ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {transcriptions.map((transcription, index) => {
          return (
            <div
              key={transcription.id + "-" + index}
              className="flex flex-col gap-1.5 border dark:border-gray-800 rounded-lg p-3"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <label className="text-xs dark:text-gray-500 text-gray-400 w-8">
                    Start
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-24 text-sm border rounded px-2 py-1 dark:bg-black dark:border-gray-700"
                    value={transcription.start}
                    onChange={(e) =>
                      updateLocalField(
                        index,
                        "start",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                  <button
                    className="text-xs px-2 py-1 border rounded dark:border-gray-700 dark:text-gray-400 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() =>
                      updateLocalField(index, "start", currentTime)
                    }
                    title="Set to current time"
                  >
                    Now
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <label className="text-xs dark:text-gray-500 text-gray-400 w-8">
                    End
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-24 text-sm border rounded px-2 py-1 dark:bg-black dark:border-gray-700"
                    value={transcription.end}
                    onChange={(e) =>
                      updateLocalField(
                        index,
                        "end",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                  <button
                    className="text-xs px-2 py-1 border rounded dark:border-gray-700 dark:text-gray-400 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() =>
                      updateLocalField(index, "end", currentTime)
                    }
                    title="Set to current time"
                  >
                    Now
                  </button>
                </div>
                <button
                  className="text-xs px-2 py-1 border rounded dark:border-gray-700 dark:text-gray-400 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => seekAndPlay(transcription.start)}
                  title="Play from this time"
                >
                  Play
                </button>
                <span className="text-xs dark:text-gray-600 text-gray-400">
                  {formatTime(transcription.start)} -{" "}
                  {formatTime(transcription.end)}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <TextField
                  label="Input"
                  field="input"
                  value={transcription.input}
                  index={index}
                />
                <TextField
                  label="English"
                  field="en"
                  value={transcription.en}
                  index={index}
                />
                <TextField
                  label="Pinyin"
                  field="pinyin"
                  value={transcription.pinyin}
                  index={index}
                />
                <TextField
                  label="Roman"
                  field="roman"
                  value={transcription.roman}
                  index={index}
                />
                <TextField
                  label="Hanzi"
                  field="hanzi"
                  value={transcription.hanzi}
                  index={index}
                />
                <TextField
                  label="Chinglish"
                  field="chinglish"
                  value={transcription.chinglish}
                  index={index}
                />
              </div>

              <div className="flex items-center gap-1 flex-wrap mt-1">
                <button
                  className="text-xs px-2 py-1 border rounded dark:border-gray-700 dark:text-gray-400 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleAddBefore(index)}
                  title="Add new transcription before"
                >
                  + Before
                </button>
                <button
                  className="text-xs px-2 py-1 border rounded dark:border-gray-700 dark:text-gray-400 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleAddAfter(index)}
                  title="Add new transcription after"
                >
                  + After
                </button>
                <button
                  className="text-xs px-2 py-1 border rounded dark:border-gray-700 dark:text-gray-400 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleSplit(index)}
                  title="Split at midpoint"
                >
                  Split
                </button>
                {index > 0 && (
                  <button
                    className="text-xs px-2 py-1 border rounded dark:border-gray-700 dark:text-gray-400 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleMerge(index, "up")}
                    title="Merge with transcription above"
                  >
                    Merge Up
                  </button>
                )}
                {index < transcriptions.length - 1 && (
                  <button
                    className="text-xs px-2 py-1 border rounded dark:border-gray-700 dark:text-gray-400 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleMerge(index, "down")}
                    title="Merge with transcription below"
                  >
                    Merge Down
                  </button>
                )}
                <button
                  className="text-xs px-2 py-1 border rounded dark:border-red-800 dark:text-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={() => handleDelete(index)}
                  title="Delete this transcription"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
