"use client";

import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { ContentTranscription } from "@/domain/content/content.api";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { useState, useRef, useEffect, useMemo } from "react";
import { formatTime } from "../../_play/utils";
import { useAutoScroll } from "@/components/settings-dialog/use-auto-scroll";

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
  const { autoScrollWhilePlaying, setAutoScrollWhilePlaying } = useAutoScroll();

  const transcriptionRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
    {}
  );

  useEffect(() => {
    if (!autoScrollWhilePlaying || !content) return;

    const transcriptions = localTranscriptions || content.transcriptions || [];
    const currentIndex = transcriptions.findIndex(
      (t: LocalTranscription) => currentTime >= t.start && currentTime < t.end
    );

    if (currentIndex !== -1) {
      const ref = transcriptionRefs.current[`trans-${currentIndex}`];
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentTime, autoScrollWhilePlaying, localTranscriptions, content]);

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
      <div className="flex items-start gap-4">
        <label className="text-xs font-medium text-gray-400 dark:text-[rgb(120,120,120)] w-20 shrink-0 pt-2.5">
          {label}
        </label>
        <textarea
          className="flex-1 text-sm border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl px-4 py-2.5 dark:bg-[rgb(9,10,11)] resize-y min-h-[2.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all leading-relaxed"
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
      <div className="flex gap-4 mb-8 sticky top-0 bg-white dark:bg-[rgb(9,10,11)] z-10 py-4 px-4 border-b border-gray-100 dark:border-[rgb(25,26,30)]">
        <button
          className="px-6 py-2.5 border border-gray-200 dark:border-[rgb(30,31,35)] rounded-xl hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] transition-all font-light text-sm"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2.5 border border-blue-500 bg-blue-500 text-white rounded-xl hover:bg-blue-600 hover:border-blue-600 transition-all font-light text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={updateContentMutation.isPending}
        >
          {updateContentMutation.isPending ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="flex gap-6 h-full px-4">
        <div className="w-[70%] overflow-y-auto pr-4">
          <div className="flex flex-col gap-6 pb-20">
            {transcriptions.map((transcription, index) => {
              return (
                <div
                  key={transcription.id + "-" + index}
                  ref={(el) => {
                    transcriptionRefs.current[`trans-${index}`] = el;
                  }}
                  className="flex flex-col gap-4 border border-gray-100 dark:border-[rgb(20,21,24)] rounded-2xl p-7 bg-white dark:bg-[rgb(12,13,15)]/50 hover:shadow-lg hover:border-gray-200 dark:hover:border-[rgb(25,26,30)] transition-all duration-300"
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-medium text-gray-400 dark:text-[rgb(120,120,120)] w-10">
                        Start
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-32 text-sm border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl px-4 py-2.5 dark:bg-[rgb(9,10,11)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                        className="text-xs px-4 py-2.5 border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl text-gray-500 dark:text-[rgb(140,140,140)] hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] hover:border-gray-300 dark:hover:border-[rgb(25,26,30)] transition-all"
                        onClick={() =>
                          updateLocalField(index, "start", currentTime)
                        }
                        title="Set to current time"
                      >
                        Now
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-medium text-gray-400 dark:text-[rgb(120,120,120)] w-10">
                        End
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-32 text-sm border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl px-4 py-2.5 dark:bg-[rgb(9,10,11)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                        className="text-xs px-4 py-2.5 border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl text-gray-500 dark:text-[rgb(140,140,140)] hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] hover:border-gray-300 dark:hover:border-[rgb(25,26,30)] transition-all"
                        onClick={() =>
                          updateLocalField(index, "end", currentTime)
                        }
                        title="Set to current time"
                      >
                        Now
                      </button>
                    </div>
                    <button
                      className="text-xs px-5 py-2.5 border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl text-gray-500 dark:text-[rgb(140,140,140)] hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] hover:border-gray-300 dark:hover:border-[rgb(25,26,30)] transition-all font-light"
                      onClick={() => seekAndPlay(transcription.start)}
                      title="Play from this time"
                    >
                      Play
                    </button>
                    <span className="text-sm text-gray-400 dark:text-[rgb(120,120,120)] font-light">
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

                  <div className="flex items-center gap-3 flex-wrap pt-4 border-t border-gray-100 dark:border-[rgb(20,21,24)]">
                    <button
                      className="text-xs px-5 py-2.5 border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl text-gray-500 dark:text-[rgb(140,140,140)] hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] hover:border-gray-300 dark:hover:border-[rgb(25,26,30)] transition-all font-light"
                      onClick={() => handleAddBefore(index)}
                      title="Add new transcription before"
                    >
                      + Before
                    </button>
                    <button
                      className="text-xs px-5 py-2.5 border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl text-gray-500 dark:text-[rgb(140,140,140)] hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] hover:border-gray-300 dark:hover:border-[rgb(25,26,30)] transition-all font-light"
                      onClick={() => handleAddAfter(index)}
                      title="Add new transcription after"
                    >
                      + After
                    </button>
                    <button
                      className="text-xs px-5 py-2.5 border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl text-gray-500 dark:text-[rgb(140,140,140)] hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] hover:border-gray-300 dark:hover:border-[rgb(25,26,30)] transition-all font-light"
                      onClick={() => handleSplit(index)}
                      title="Split at midpoint"
                    >
                      Split
                    </button>
                    {index > 0 && (
                      <button
                        className="text-xs px-5 py-2.5 border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl text-gray-500 dark:text-[rgb(140,140,140)] hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] hover:border-gray-300 dark:hover:border-[rgb(25,26,30)] transition-all font-light"
                        onClick={() => handleMerge(index, "up")}
                        title="Merge with transcription above"
                      >
                        Merge Up
                      </button>
                    )}
                    {index < transcriptions.length - 1 && (
                      <button
                        className="text-xs px-5 py-2.5 border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl text-gray-500 dark:text-[rgb(140,140,140)] hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] hover:border-gray-300 dark:hover:border-[rgb(25,26,30)] transition-all font-light"
                        onClick={() => handleMerge(index, "down")}
                        title="Merge with transcription below"
                      >
                        Merge Down
                      </button>
                    )}
                    <button
                      className="text-xs px-5 py-2.5 border border-red-200 dark:border-red-900/50 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-800/50 transition-all font-light ml-auto"
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

        <div className="w-[30%] border-l border-gray-100 dark:border-[rgb(25,26,30)] flex flex-col shrink-0 bg-white dark:bg-[rgb(9,10,11)] h-full overflow-hidden">
          <div className="flex gap-1 p-2 bg-gray-50 dark:bg-[rgb(12,13,15)] flex-shrink-0">
            <button
              className={`flex-1 py-3 px-6 text-sm font-light transition-all duration-300 rounded-xl ${
                activeTab === "settings"
                  ? "bg-white dark:bg-[rgb(9,10,11)] text-gray-900 dark:text-[rgb(230,230,230)] shadow-sm"
                  : "text-gray-500 dark:text-[rgb(140,140,140)] hover:text-gray-700 dark:hover:text-[rgb(200,200,200)]"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
            <button
              className={`flex-1 py-3 px-6 text-sm font-light transition-all duration-300 rounded-xl ${
                activeTab === "suggestions"
                  ? "bg-white dark:bg-[rgb(9,10,11)] text-gray-900 dark:text-[rgb(230,230,230)] shadow-sm"
                  : "text-gray-500 dark:text-[rgb(140,140,140)] hover:text-gray-700 dark:hover:text-[rgb(200,200,200)]"
              }`}
              onClick={() => setActiveTab("suggestions")}
            >
              Suggestions
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === "settings" ? (
              <div className="flex flex-col gap-10">
                <div className="space-y-4">
                  <label className="text-lg font-light text-gray-800 dark:text-[rgb(230,230,230)] tracking-wide">
                    Auto Scroll
                  </label>
                  <p className="text-sm text-gray-500 dark:text-[rgb(140,140,140)] font-light leading-relaxed">
                    Automatically scroll to the current transcription while
                    playing
                  </p>
                  <button
                    onClick={() =>
                      setAutoScrollWhilePlaying(!autoScrollWhilePlaying)
                    }
                    className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                      autoScrollWhilePlaying
                        ? "bg-blue-500"
                        : "bg-gray-300 dark:bg-[rgb(30,31,35)]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                        autoScrollWhilePlaying ? "left-9" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-light text-gray-800 dark:text-[rgb(230,230,230)] tracking-wide">
                    View Mode
                  </label>
                  <p className="text-sm text-gray-500 dark:text-[rgb(140,140,140)] font-light leading-relaxed">
                    Choose how transcriptions are displayed
                  </p>
                  <div className="flex gap-4">
                    <button
                      className={`flex-1 py-4 px-5 text-sm border-2 rounded-2xl transition-all duration-300 ${
                        viewMode === "current"
                          ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                          : "border-gray-200 dark:border-[rgb(25,26,30)] text-gray-500 dark:text-[rgb(140,140,140)] hover:border-gray-300 dark:hover:border-[rgb(30,31,35)]"
                      }`}
                      onClick={() => setViewMode("current")}
                    >
                      Current
                    </button>
                    <button
                      className={`flex-1 py-4 px-5 text-sm border-2 rounded-2xl transition-all duration-300 ${
                        viewMode === "all"
                          ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                          : "border-gray-200 dark:border-[rgb(25,26,30)] text-gray-500 dark:text-[rgb(140,140,140)] hover:border-gray-300 dark:hover:border-[rgb(30,31,35)]"
                      }`}
                      onClick={() => setViewMode("all")}
                    >
                      All
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {problemTranscriptions.length > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-6">
                    <p className="text-sm text-amber-800 dark:text-amber-200 font-light">
                      {problemTranscriptions.length} transcription
                      {problemTranscriptions.length !== 1 ? "s" : ""} need
                      attention
                    </p>
                  </div>
                )}
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
                        className="text-left p-5 border border-gray-200 dark:border-[rgb(25,26,30)] rounded-2xl hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] hover:shadow-lg hover:border-gray-300 dark:hover:border-[rgb(30,31,35)] transition-all duration-300 group"
                        onClick={() => scrollToTranscription(originalIndex)}
                      >
                        <div className="font-light text-gray-900 dark:text-[rgb(230,230,230)] mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {formatTime(transcription.start)} -{" "}
                          {formatTime(transcription.end)}
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-400 font-light">
                          Missing {issueType}
                        </div>
                      </button>
                    );
                  })}
                  {problemTranscriptions.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">✓</div>
                      <p className="text-sm text-green-600 dark:text-green-400 font-light mb-2">
                        All good
                      </p>
                      <p className="text-xs text-gray-400 dark:text-[rgb(100,100,100)] font-light">
                        All transcriptions have valid time ranges
                      </p>
                    </div>
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
