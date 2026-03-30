"use client";

import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { ContentTranscription } from "@/domain/content/content.api";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { useState, useRef } from "react";
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

  const [activeTab, setActiveTab] = useState<"settings" | "suggestions">(
    "settings"
  );
  const [viewMode, setViewMode] = useState<"current" | "all">("current");

  const transcriptionRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
    {}
  );

  if (!content || !editMode) {
    return null;
  }

  const transcriptions: LocalTranscription[] =
    localTranscriptions || content.transcriptions || [];

  const updateLocalField = (index: number, field: string, value: any) => {
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
          [first.chinglish, second.chinglish].filter(Boolean).join(" ") ||
          undefined,
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
    const midTime = Math.round(((prevEnd + trans.start) / 2) * 10) / 10;

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
    const midTime = Math.round(((trans.end + nextStart) / 2) * 10) / 10;

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

  const scrollToTranscription = (index: number) => {
    const ref = transcriptionRefs.current[`trans-${index}`];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
      <div className="flex items-start gap-3">
        <label className="text-xs font-medium text-gray-600 dark:text-gray-400 w-16 shrink-0 pt-2">
          {label}
        </label>
        <textarea
          className="flex-1 text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 dark:bg-gray-900 resize-y min-h-[2.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          value={value || ""}
          onChange={(e) => updateLocalField(index, field, e.target.value)}
          placeholder={label}
        />
      </div>
    );
  };

  const problemTranscriptions = transcriptions.filter(
    (transcription) => transcription.start === 0 || transcription.end === 0
  );

  return (
    <div className="flex flex-col  mb-80 h-[75vh] overflow-hidden">
      <div className="flex gap-4 mb-6 sticky top-0 bg-white dark:bg-black z-10 py-3 px-4 border-b dark:border-gray-800">
        <button
          className="px-5 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-5 py-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={updateContentMutation.isPending}
        >
          {updateContentMutation.isPending ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="flex gap-6 h-full px-4">
        <div className="w-[50%] overflow-y-auto pr-4">
          <div className="flex flex-col gap-4">
            {transcriptions.map((transcription, index) => {
              return (
                <div
                  key={transcription.id + "-" + index}
                  ref={(el) => {
                    transcriptionRefs.current[`trans-${index}`] = el;
                  }}
                  className="flex flex-col gap-3 border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900/50 hover:shadow-md dark:hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400 w-10">
                        Start
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-28 text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="text-xs px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() =>
                          updateLocalField(index, "start", currentTime)
                        }
                        title="Set to current time"
                      >
                        Now
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400 w-10">
                        End
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-28 text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="text-xs px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() =>
                          updateLocalField(index, "end", currentTime)
                        }
                        title="Set to current time"
                      >
                        Now
                      </button>
                    </div>
                    <button
                      className="text-xs px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                      onClick={() => seekAndPlay(transcription.start)}
                      title="Play from this time"
                    >
                      Play
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-500 font-medium">
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

                  <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100 dark:border-gray-800">
                    <button
                      className="text-xs px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                      onClick={() => handleAddBefore(index)}
                      title="Add new transcription before"
                    >
                      + Before
                    </button>
                    <button
                      className="text-xs px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                      onClick={() => handleAddAfter(index)}
                      title="Add new transcription after"
                    >
                      + After
                    </button>
                    <button
                      className="text-xs px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                      onClick={() => handleSplit(index)}
                      title="Split at midpoint"
                    >
                      Split
                    </button>
                    {index > 0 && (
                      <button
                        className="text-xs px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                        onClick={() => handleMerge(index, "up")}
                        title="Merge with transcription above"
                      >
                        Merge Up
                      </button>
                    )}
                    {index < transcriptions.length - 1 && (
                      <button
                        className="text-xs px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                        onClick={() => handleMerge(index, "down")}
                        title="Merge with transcription below"
                      >
                        Merge Down
                      </button>
                    )}
                    <button
                      className="text-xs px-4 py-2 border border-red-200 dark:border-red-900 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors font-medium ml-auto"
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

        <div className="w-[30%] border-l border-gray-200 dark:border-gray-800 flex flex-col shrink-0 bg-gray-50 dark:bg-gray-900/30">
          <div className="flex border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <button
              className={`flex-1 py-3 px-5 text-sm font-medium transition-colors ${
                activeTab === "settings"
                  ? "border-b-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
            <button
              className={`flex-1 py-3 px-5 text-sm font-medium transition-colors ${
                activeTab === "suggestions"
                  ? "border-b-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("suggestions")}
            >
              Suggestions
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "settings" ? (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 block">
                    View Mode
                  </label>
                  <div className="flex gap-3">
                    <button
                      className={`flex-1 py-3 px-4 text-sm border rounded-lg transition-all ${
                        viewMode === "current"
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setViewMode("current")}
                    >
                      Current Transcription
                    </button>
                    <button
                      className={`flex-1 py-3 px-4 text-sm border rounded-lg transition-all ${
                        viewMode === "all"
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setViewMode("all")}
                    >
                      All Transcriptions
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-4">
                  <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                    You still have {problemTranscriptions.length} transcription
                    {problemTranscriptions.length !== 1 ? "s" : ""} with issues
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {problemTranscriptions.map((transcription, index) => {
                    const originalIndex = transcriptions.findIndex(
                      (t) => t.id === transcription.id
                    );
                    const issueType =
                      transcription.start === 0 && transcription.end === 0
                        ? "Start & End"
                        : transcription.start === 0
                          ? "Start"
                          : "End";
                    return (
                      <button
                        key={transcription.id}
                        className="text-left p-2 border dark:border-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                        onClick={() => scrollToTranscription(originalIndex)}
                      >
                        <div className="font-medium mb-1">
                          {formatTime(transcription.start)} -{" "}
                          {formatTime(transcription.end)}
                        </div>
                        <div className="text-xs text-red-600 dark:text-red-400">
                          Missing {issueType}
                        </div>
                      </button>
                    );
                  })}
                  {problemTranscriptions.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 text-center py-4">
                      No issues found
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
