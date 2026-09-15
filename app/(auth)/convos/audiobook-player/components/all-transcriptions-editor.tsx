"use client";

import React from "react";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { ContentTranscription } from "@/domain/content/content.api";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { useRef, useEffect, useMemo } from "react";
import { formatTime } from "../../_play/utils";
import { useAutoScroll } from "@/components/settings-dialog/use-auto-scroll";
import { useSmartSet } from "@/components/settings-dialog/use-smart-set";
import { useTranscriptionEditorStore } from "../stores/use-transcription-editor-store";
import { WebVTTParser } from "webvtt-parser";

type LocalTranscription = ContentTranscription & { _isNew?: boolean };

const TextField = React.memo(
  ({
    label,
    field,
    value,
    index,
    onChange,
  }: {
    label: string;
    field: string;
    value: string | undefined;
    index: number;
    onChange: (field: string, value: string) => void;
  }) => {
    return (
      <div className="flex items-start gap-4">
        <label className="text-xs font-medium text-gray-400 dark:text-[rgb(120,120,120)] w-20 shrink-0 pt-2.5">
          {label}
        </label>
        <textarea
          className="flex-1 text-lg border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl px-4 py-2.5 dark:bg-[rgb(9,10,11)] resize-y min-h-[2.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all leading-relaxed"
          value={value || ""}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={label}
        />
      </div>
    );
  },
);

TextField.displayName = "TextField";

const parseVTT = (vttString: string, lang: string) => {
  const parser = new WebVTTParser();
  const tree = parser.parse(vttString, "metadata");

  const cues = tree.cues.map((rawSub: any) => {
    const { id, startTime, endTime, text } = rawSub;
    const tags = /<(v|c).*?>|<\/c>/g;

    return {
      id: id || crypto.randomUUID(),
      start: startTime,
      end: endTime,
      input: text?.replace(tags, ""),
      lang: lang,
    };
  });

  return cues;
};

const transcriptionsToVTT = (transcriptions: LocalTranscription[]) => {
  let vtt = "WEBVTT\n\n";

  transcriptions.forEach((transcription, index) => {
    const startTime = formatTimeVTT(transcription.start);
    const endTime = formatTimeVTT(transcription.end);
    const text = transcription.input || "";

    vtt += `${index + 1}\n`;
    vtt += `${startTime} --> ${endTime}\n`;
    vtt += `${text}\n\n`;
  });

  return vtt;
};

const formatTimeVTT = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
};

// Raw editor format: one block per cue, blocks separated by a blank line.
//
//   12.5 - 18
//   <uuid>
//   pinyin
//   roman
//   en
//   hanzi
//   input
//   chinglish
//
// Lines 3-8 are the text fields in that order and may be left empty; the block
// keeps working when trailing empty lines are missing. Writing NEW on the uuid
// line adds a brand new cue at that position instead of editing an existing one.
const RAW_TEXT_FIELDS = [
  "pinyin",
  "roman",
  "en",
  "hanzi",
  "input",
  "chinglish",
] as const;

type RawTextField = (typeof RAW_TEXT_FIELDS)[number];

const RAW_NEW_CUE_KEYWORD = "NEW";

const RAW_BLOCK_LINES = 1 + 1 + RAW_TEXT_FIELDS.length; // timing + uuid + fields

const RAW_HEADER = [
  `# one block per cue: start - end / uuid / ${RAW_TEXT_FIELDS.join(" / ")}`,
  `# times in seconds or 00:00:03.200 · blank line between blocks`,
  `# write ${RAW_NEW_CUE_KEYWORD} instead of a uuid to add a new cue at that spot`,
].join("\n");

const RAW_INDENT = "  ";

// Accepts `12.5`, `0:12.5`, `00:00:12.500`, `00:00:12,500`.
const RAW_TIME_TOKEN =
  "(?:\\d+(?:\\.\\d+)?|\\d{1,3}:\\d{1,2}(?::\\d{1,2})?(?:[.,]\\d{1,3})?)";

// `12.5 - 18`, `00:00:12.500 --> 00:00:18.000`, `12.5 → 18` ...
const RAW_TIMING_LINE = new RegExp(
  `^(${RAW_TIME_TOKEN})\\s*(?:-{1,2}>?|→|–|—|to)\\s*(${RAW_TIME_TOKEN})$`,
);

const toRawCell = (value: unknown) =>
  String(value ?? "")
    .replace(/\s*\r?\n\s*/g, " ")
    .trim();

const isRawTimingLine = (line: string | undefined) =>
  Boolean(line && RAW_TIMING_LINE.test(line.trim()));

const parseRawTime = (token: string) => {
  const value = token.trim();

  if (!value.includes(":")) return Number(value);

  return value
    .split(":")
    .map((part) => Number(part.replace(",", ".")))
    .reduce((total, part) => (Number.isFinite(part) ? total * 60 + part : NaN), 0);
};

const transcriptionToRawBlock = (transcription: LocalTranscription) => {
  const lines = [
    `${toRawCell(transcription.start)} - ${toRawCell(transcription.end)}`,
    toRawCell(transcription.id),
    ...RAW_TEXT_FIELDS.map((field) =>
      toRawCell((transcription as any)?.[field]),
    ),
  ];

  // Trailing empty fields are implied, so drop them to keep blocks readable.
  while (lines.length > 2 && !lines[lines.length - 1]) {
    lines.pop();
  }

  return lines.join("\n");
};

const transcriptionsToRaw = (transcriptions: LocalTranscription[]) =>
  [RAW_HEADER, ...transcriptions.map(transcriptionToRawBlock)].join("\n\n");

// The blank run starting at `blankIndex` closes a block when it is followed by
// another cue or by the end of the text.
const endsRawBlock = (lines: string[], blankIndex: number) => {
  let index = blankIndex;

  while (index < lines.length && !lines[index].trim()) {
    index++;
  }

  return index >= lines.length || isRawTimingLine(lines[index]);
};

const findNextRawBlock = (lines: string[], from: number) => {
  for (let index = from; index < lines.length; index++) {
    if (isRawTimingLine(lines[index])) return index;
  }

  return lines.length;
};

const parseRawTranscriptions = (
  raw: string,
  template: LocalTranscription[],
): { transcriptions: LocalTranscription[]; errors: string[]; warnings: string[] } => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const transcriptions: LocalTranscription[] = [];
  const usedIds = new Set<string>();
  const templateById = new Map(
    template.map((transcription) => [transcription.id, transcription]),
  );

  const lines = raw.split(/\r?\n/);

  let index = 0;

  while (index < lines.length) {
    const trimmed = lines[index].trim();

    // Blank lines separate blocks; "#" lines are comments (the generated header
    // and any note added by hand). Inside a block the position rules, so a "#"
    // line there is field content.
    if (!trimmed || trimmed.startsWith("#")) {
      index++;
      continue;
    }

    const timingLineNumber = index + 1;
    const timing = trimmed.match(RAW_TIMING_LINE);

    if (!timing) {
      errors.push(
        `Line ${timingLineNumber}: expected a cue timing line like "12.5 - 18"`,
      );

      // Resync on the next cue so one broken block does not report 8 errors.
      index = findNextRawBlock(lines, index + 1);
      continue;
    }

    const start = parseRawTime(timing[1]);
    const end = parseRawTime(timing[2]);

    const body: string[] = [];
    let bodyIndex = index + 1;

    while (bodyIndex < lines.length && body.length < RAW_BLOCK_LINES - 1) {
      // A blank line followed by another cue is the block separator, not an
      // empty field.
      if (!lines[bodyIndex].trim() && endsRawBlock(lines, bodyIndex)) break;

      const bodyLine = lines[bodyIndex].trim();

      // A field whose text is exactly a time range is still read as that field,
      // but say so instead of leaving a surprising cue.
      if (body.length > 0 && isRawTimingLine(bodyLine)) {
        warnings.push(
          `Line ${bodyIndex + 1}: "${bodyLine}" looks like a cue timing line but was read as "${RAW_TEXT_FIELDS[body.length - 1]}" — add a blank line before it to start a new cue`,
        );
      }

      body.push(bodyLine);
      bodyIndex++;
    }

    index = bodyIndex;

    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      errors.push(
        `Line ${timingLineNumber}: start and end must be times, e.g. "12.5 - 18"`,
      );
      continue;
    }

    const rawId = (body[0] || "").trim();

    // `NEW` in place of a uuid adds a cue at this position instead of editing
    // the cue that is already there.
    const isNewCue = rawId.toUpperCase() === RAW_NEW_CUE_KEYWORD;

    const neighbor = template[transcriptions.length];

    // Match the existing cue by uuid, so cues keep their word-level timings even
    // when a block is inserted, deleted or moved; a hand typed uuid that matches
    // nothing falls back to the cue at this position.
    const previous = isNewCue
      ? undefined
      : (rawId ? templateById.get(rawId) : undefined) || neighbor;

    const generatedId = () =>
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `new-${Date.now()}-${transcriptions.length}`;

    let id = isNewCue
      ? generatedId()
      : rawId || previous?.id || generatedId();

    if (usedIds.has(id)) {
      id = generatedId();

      if (rawId && !isNewCue) {
        warnings.push(
          `Line ${timingLineNumber + 1}: uuid "${rawId}" is used twice — a new uuid was generated`,
        );
      }
    }

    usedIds.add(id);

    const fields: Record<string, string> = {};

    RAW_TEXT_FIELDS.forEach((field, fieldIndex) => {
      const value = (body[fieldIndex + 1] || "").trim();

      // Only write empty values that clear an existing field, so raw edits do
      // not add empty fields to cues that never had them.
      if (value || (previous as any)?.[field]) {
        fields[field] = value;
      }
    });

    transcriptions.push({
      ...(previous || {}),
      id,
      _isNew: previous ? previous._isNew : true,
      start,
      end,
      // A new cue takes the language of the cue it was written next to, the way
      // "+ Before" / "+ After" do in field mode.
      lang: previous?.lang ?? neighbor?.lang,
      ...fields,
    } as LocalTranscription);
  }

  return { transcriptions, errors, warnings };
};

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

  const { localTranscriptions, setLocalTranscriptions, reset } =
    useTranscriptionEditorStore();

  const [activeTab, setActiveTab] = React.useState<"settings" | "suggestions">(
    "settings",
  );
  const [viewMode, setViewMode] = React.useState<"current" | "all">("current");
  const [editorMode, setEditorMode] = React.useState<"fields" | "raw">("fields");
  const [rawText, setRawText] = React.useState("");
  const [rawErrors, setRawErrors] = React.useState<string[]>([]);
  const [rawWarnings, setRawWarnings] = React.useState<string[]>([]);
  const { autoScrollWhilePlaying, setAutoScrollWhilePlaying } = useAutoScroll();
  const { smartSet, setSmartSet } = useSmartSet();
  const [expandedWords, setExpandedWords] = React.useState<Set<number>>(
    new Set(),
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const transcriptionRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
    {},
  );

  const currentTranscriptionIndexRef = useRef<number>(-1);

  React.useEffect(() => {
    if (content && !localTranscriptions) {
      setLocalTranscriptions(content.transcriptions || []);
    }
  }, [content, localTranscriptions, setLocalTranscriptions]);

  const transcriptions: LocalTranscription[] = useMemo(
    () => localTranscriptions || content?.transcriptions || [],
    [localTranscriptions, content],
  );

  const filteredTranscriptions = useMemo(() => {
    if (!searchQuery.trim()) return transcriptions;

    const query = searchQuery.toLowerCase();
    return transcriptions.filter((transcription) => {
      const searchableFields = [
        transcription.input,
        transcription.en,
        transcription.pinyin,
        transcription.roman,
        transcription.hanzi,
        transcription.chinglish,
        transcription.words?.map((w) => w.input).join(" "),
      ].filter(Boolean);

      return searchableFields.some((field) =>
        field?.toLowerCase().includes(query),
      );
    });
  }, [transcriptions, searchQuery]);

  React.useEffect(() => {
    if (!autoScrollWhilePlaying || !content) return;

    const currentIndex = transcriptions.findIndex(
      (t: LocalTranscription) => currentTime >= t.start && currentTime < t.end,
    );

    if (currentIndex !== -1) {
      const currentTranscription = transcriptions[currentIndex];
      const filteredIndex = filteredTranscriptions.findIndex(
        (t) => t.id === currentTranscription.id,
      );
      if (filteredIndex !== -1) {
        requestAnimationFrame(() => {
          const ref = transcriptionRefs.current[currentTranscription.id];
          if (ref) {
            ref.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
      }
    }
  }, [
    currentTime,
    autoScrollWhilePlaying,
    transcriptions,
    filteredTranscriptions,
    content,
  ]);

  const updateLocalField = React.useCallback(
    (index: number, field: string, value: any) => {
      const current = localTranscriptions || content.transcriptions || [];
      const updated = [...current];
      updated[index] = { ...updated[index], [field]: value };

      if (smartSet) {
        if (field === "end") {
          const nextIndex = index + 1;
          if (nextIndex < updated.length && updated[nextIndex].start === 0) {
            updated[nextIndex] = { ...updated[nextIndex], start: value };
          }
        }

        if (field === "start") {
          const prevIndex = index - 1;
          if (prevIndex >= 0 && updated[prevIndex].end === 0) {
            updated[prevIndex] = { ...updated[prevIndex], end: value };
          }
        }
      }

      setLocalTranscriptions(updated);
    },
    [
      smartSet,
      content?.transcriptions,
      localTranscriptions,
      setLocalTranscriptions,
    ],
  );

  if (!content || !editMode) {
    return null;
  }

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

    const current = localTranscriptions || content.transcriptions || [];
    const updated = [
      ...current.slice(0, index),
      firstHalf,
      secondHalf,
      ...current.slice(index + 1),
    ];
    setLocalTranscriptions(updated);
  };

  const handleMerge = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index;
    if (targetIndex < 0 || targetIndex + 1 >= transcriptions.length) return;

    const current = localTranscriptions || content.transcriptions || [];
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

    const updated = [
      ...current.slice(0, targetIndex),
      merged,
      ...current.slice(targetIndex + 2),
    ];
    setLocalTranscriptions(updated);
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

    const current = localTranscriptions || content.transcriptions || [];
    const updated = [
      ...current.slice(0, index),
      newTrans,
      ...current.slice(index),
    ];
    setLocalTranscriptions(updated);
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

    const current = localTranscriptions || content.transcriptions || [];
    const updated = [
      ...current.slice(0, index + 1),
      newTrans,
      ...current.slice(index + 1),
    ];
    setLocalTranscriptions(updated);
  };

  const handleDelete = (index: number) => {
    const current = localTranscriptions || content.transcriptions || [];
    const updated = current.filter(
      (_: LocalTranscription, i: number) => i !== index,
    );
    setLocalTranscriptions(updated);
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
        reset();
      });
  };

  const handleCancel = () => {
    setLocalTranscriptions(null);
    setEditMode(false);
    reset();
  };

  const handleEditorModeChange = (mode: "fields" | "raw") => {
    if (mode === editorMode) return;

    if (mode === "raw") {
      setRawText(transcriptionsToRaw(transcriptions));
      setRawErrors([]);
      setRawWarnings([]);
    }

    setEditorMode(mode);
  };

  const handleRawChange = (value: string) => {
    setRawText(value);

    const {
      transcriptions: parsedTranscriptions,
      errors,
      warnings,
    } = parseRawTranscriptions(
      value,
      localTranscriptions || content?.transcriptions || [],
    );

    setRawErrors(errors);
    setRawWarnings(warnings);
    setLocalTranscriptions(parsedTranscriptions);
  };

  // Tab should indent inside the raw textarea, like a text editor, instead of
  // jumping to the next form control.
  const handleRawKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key !== "Tab" || event.shiftKey) return;

    event.preventDefault();

    const target = event.currentTarget;
    const { selectionStart, selectionEnd, value } = target;

    handleRawChange(
      `${value.slice(0, selectionStart)}${RAW_INDENT}${value.slice(
        selectionEnd,
      )}`,
    );

    const nextCursor = selectionStart + RAW_INDENT.length;

    requestAnimationFrame(() => {
      target.selectionStart = nextCursor;
      target.selectionEnd = nextCursor;
    });
  };

  const scrollToTranscription = (index: number) => {
    const currentTranscription = transcriptions[index];
    const ref = transcriptionRefs.current[currentTranscription.id];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const updateWordField = (
    transcriptionIndex: number,
    wordIndex: number,
    field: string,
    value: any,
  ) => {
    const current = localTranscriptions || content.transcriptions || [];
    const updated = [...current];
    const transcription = { ...updated[transcriptionIndex] };
    const words = transcription.words ? [...transcription.words] : [];
    words[wordIndex] = { ...words[wordIndex], [field]: value };
    transcription.words = words;
    updated[transcriptionIndex] = transcription;
    setLocalTranscriptions(updated);
  };

  const handleAddWord = (transcriptionIndex: number) => {
    const current = localTranscriptions || content.transcriptions || [];
    const updated = [...current];
    const transcription = { ...updated[transcriptionIndex] };
    const words = transcription.words ? [...transcription.words] : [];
    words.push({
      id: `word-${Date.now()}`,
      input: "",
      start: 0,
      end: 0,
    });
    transcription.words = words;
    updated[transcriptionIndex] = transcription;
    setLocalTranscriptions(updated);
  };

  const handleDeleteWord = (transcriptionIndex: number, wordIndex: number) => {
    const current = localTranscriptions || content.transcriptions || [];
    const updated = [...current];
    const transcription = { ...updated[transcriptionIndex] };
    const words = transcription.words ? [...transcription.words] : [];
    words.splice(wordIndex, 1);
    transcription.words = words;
    updated[transcriptionIndex] = transcription;
    setLocalTranscriptions(updated);
  };

  const handleAddWordBefore = (
    transcriptionIndex: number,
    wordIndex: number,
  ) => {
    const current = localTranscriptions || content.transcriptions || [];
    const updated = [...current];
    const transcription = { ...updated[transcriptionIndex] };
    const words = transcription.words ? [...transcription.words] : [];
    words.splice(wordIndex, 0, {
      id: `word-${Date.now()}`,
      input: "",
      start: 0,
      end: 0,
    });
    transcription.words = words;
    updated[transcriptionIndex] = transcription;
    setLocalTranscriptions(updated);
  };

  const handleAddWordAfter = (
    transcriptionIndex: number,
    wordIndex: number,
  ) => {
    const current = localTranscriptions || content.transcriptions || [];
    const updated = [...current];
    const transcription = { ...updated[transcriptionIndex] };
    const words = transcription.words ? [...transcription.words] : [];
    words.splice(wordIndex + 1, 0, {
      id: `word-${Date.now()}`,
      input: "",
      start: 0,
      end: 0,
    });
    transcription.words = words;
    updated[transcriptionIndex] = transcription;
    setLocalTranscriptions(updated);
  };

  const toggleWordsExpanded = (index: number) => {
    setExpandedWords((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleUploadSubtitles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");

    fileReader.onload = (event) => {
      const result = event.target?.result as string;

      try {
        const parsedTranscriptions = parseVTT(result, content?.lang || "zh");
        setLocalTranscriptions(parsedTranscriptions);

        // Keep the raw editor in sync when subtitles are uploaded while it is open.
        if (editorMode === "raw") {
          setRawText(
            transcriptionsToRaw(parsedTranscriptions as LocalTranscription[]),
          );
          setRawErrors([]);
          setRawWarnings([]);
        }
      } catch (error) {
        console.error("Error parsing VTT file:", error);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
  };

  const handleDownloadSubtitles = () => {
    const vttContent = transcriptionsToVTT(transcriptions);
    const blob = new Blob([vttContent], { type: "text/vtt" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${content?.title || "subtitles"}.vtt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const problemTranscriptions = transcriptions.filter(
    (transcription) => transcription.start === 0 || transcription.end === 0,
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
          className="px-6 py-2.5 border border-gray-200 dark:border-[rgb(30,31,35)] rounded-xl hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] transition-all font-light text-sm"
          onClick={handleDownloadSubtitles}
        >
          Download
        </button>
        <label className="px-6 py-2.5 border border-gray-200 dark:border-[rgb(30,31,35)] rounded-xl hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] transition-all font-light text-sm cursor-pointer">
          Upload
          <input
            ref={fileInputRef}
            type="file"
            accept=".vtt"
            className="hidden"
            onChange={handleUploadSubtitles}
          />
        </label>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-50 dark:bg-[rgb(12,13,15)] border border-gray-200 dark:border-[rgb(30,31,35)]">
          <button
            className={`px-5 py-1.5 text-sm font-light rounded-lg transition-all ${
              editorMode === "fields"
                ? "bg-white dark:bg-[rgb(9,10,11)] text-gray-900 dark:text-[rgb(230,230,230)] shadow-sm"
                : "text-gray-500 dark:text-[rgb(140,140,140)] hover:text-gray-700 dark:hover:text-[rgb(200,200,200)]"
            }`}
            onClick={() => handleEditorModeChange("fields")}
            title="Edit each transcription with separate fields"
          >
            Fields
          </button>
          <button
            className={`px-5 py-1.5 text-sm font-light rounded-lg transition-all ${
              editorMode === "raw"
                ? "bg-white dark:bg-[rgb(9,10,11)] text-gray-900 dark:text-[rgb(230,230,230)] shadow-sm"
                : "text-gray-500 dark:text-[rgb(140,140,140)] hover:text-gray-700 dark:hover:text-[rgb(200,200,200)]"
            }`}
            onClick={() => handleEditorModeChange("raw")}
            title="Edit the whole transcript as plain text"
          >
            Raw Text
          </button>
        </div>
        <div className="flex-1"></div>
        <button
          className="px-6 py-2.5 border border-blue-500 bg-blue-500 text-white rounded-xl hover:bg-blue-600 hover:border-blue-600 transition-all font-light text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={
            updateContentMutation.isPending ||
            (editorMode === "raw" && rawErrors.length > 0)
          }
        >
          {updateContentMutation.isPending ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="flex gap-6 h-full px-4">
        <div className="w-[70%] overflow-y-auto pr-4">
          {editorMode === "raw" ? (
            <div className="flex flex-col gap-3 pb-20">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-xs text-gray-500 dark:text-[rgb(140,140,140)] font-light">
                  One block per cue:{" "}
                  <span className="font-mono">start - end</span>, uuid, then{" "}
                  <span className="font-mono">
                    pinyin · roman · en · hanzi · input · chinglish
                  </span>{" "}
                  · blank line between blocks · write{" "}
                  <span className="font-mono">NEW</span> instead of a uuid to add
                  a new cue · word-level timings are kept as they are
                </p>
                <span className="text-xs text-gray-400 dark:text-[rgb(120,120,120)] font-light">
                  {transcriptions.length} cue
                  {transcriptions.length === 1 ? "" : "s"}
                </span>
              </div>

              <textarea
                className="w-full min-h-[60vh] font-mono text-sm leading-relaxed border border-gray-200 dark:border-[rgb(20,21,24)] rounded-2xl px-4 py-3 dark:bg-[rgb(9,10,11)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y"
                spellCheck={false}
                value={rawText}
                onChange={(event) => handleRawChange(event.target.value)}
                onKeyDown={handleRawKeyDown}
                placeholder={[
                  "12.5 - 18",
                  "e3f1c0d2-6a1b-4f7e-9c33-2a17bd5f8e40",
                  "nǐ hǎo",
                  "ni hao",
                  "hello",
                  "你好",
                  "你好",
                  "hi there",
                ].join("\n")}
              />

              {rawErrors.length > 0 ? (
                <div className="rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/30 px-4 py-3">
                  <p className="text-xs font-medium text-amber-800 dark:text-amber-200 mb-2">
                    {rawErrors.length} line
                    {rawErrors.length === 1 ? "" : "s"} could not be read —
                    saving is disabled until they are fixed
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-amber-800 dark:text-amber-200 font-light">
                    {rawErrors.slice(0, 5).map((error, errorIndex) => (
                      <li key={`${errorIndex}-${error}`}>{error}</li>
                    ))}
                  </ul>
                  {rawErrors.length > 5 && (
                    <p className="text-xs text-amber-800 dark:text-amber-200 font-light mt-2">
                      + {rawErrors.length - 5} more
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-400 dark:text-[rgb(120,120,120)] font-light">
                  Empty field lines are allowed · press Tab to indent
                </p>
              )}

              {rawWarnings.length > 0 && (
                <ul className="space-y-1 text-xs text-gray-500 dark:text-[rgb(140,140,140)] font-light">
                  {rawWarnings.slice(0, 3).map((warning, warningIndex) => (
                    <li key={`${warningIndex}-${warning}`}>{warning}</li>
                  ))}
                  {rawWarnings.length > 3 && (
                    <li>+ {rawWarnings.length - 3} more</li>
                  )}
                </ul>
              )}
            </div>
          ) : (
            <>
          <div className="mb-6 sticky top-0 bg-white dark:bg-[rgb(9,10,11)] z-5 pt-2">
            <input
              type="text"
              placeholder="Search transcriptions (input, English, pinyin, hanzi, etc.)"
              className="w-full text-sm border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl px-4 py-2.5 dark:bg-[rgb(9,10,11)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="text-xs text-gray-500 dark:text-[rgb(140,140,140)] mt-2">
                Showing {filteredTranscriptions.length} of{" "}
                {transcriptions.length} transcriptions
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6 pb-20">
            {filteredTranscriptions.map((transcription, filteredIndex) => {
              const index = transcriptions.findIndex(
                (t) => t.id === transcription.id,
              );

              return (
                <div
                  key={transcription.id}
                  ref={(el) => {
                    transcriptionRefs.current[transcription.id] = el;
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
                        className="w-40 text-lg border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl px-4 py-2.5 dark:bg-[rgb(9,10,11)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={transcription.start}
                        onChange={(e) =>
                          updateLocalField(
                            index,
                            "start",
                            parseFloat(e.target.value) || 0,
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
                        className="w-40 text-lg border border-gray-200 dark:border-[rgb(20,21,24)] rounded-xl px-4 py-2.5 dark:bg-[rgb(9,10,11)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={transcription.end}
                        onChange={(e) =>
                          updateLocalField(
                            index,
                            "end",
                            parseFloat(e.target.value) || 0,
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
                      onChange={(field, value) =>
                        updateLocalField(index, field, value)
                      }
                    />
                    <TextField
                      label="English"
                      field="en"
                      value={transcription.en}
                      index={index}
                      onChange={(field, value) =>
                        updateLocalField(index, field, value)
                      }
                    />
                    <TextField
                      label="Pinyin"
                      field="pinyin"
                      value={transcription.pinyin}
                      index={index}
                      onChange={(field, value) =>
                        updateLocalField(index, field, value)
                      }
                    />
                    <TextField
                      label="Roman"
                      field="roman"
                      value={transcription.roman}
                      index={index}
                      onChange={(field, value) =>
                        updateLocalField(index, field, value)
                      }
                    />
                    <TextField
                      label="Hanzi"
                      field="hanzi"
                      value={transcription.hanzi}
                      index={index}
                      onChange={(field, value) =>
                        updateLocalField(index, field, value)
                      }
                    />
                    <TextField
                      label="Chinglish"
                      field="chinglish"
                      value={transcription.chinglish}
                      index={index}
                      onChange={(field, value) =>
                        updateLocalField(index, field, value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      className="text-xs px-4 py-2 border border-gray-200 dark:border-[rgb(20,21,24)] rounded-lg text-gray-500 dark:text-[rgb(140,140,140)] hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] transition-all font-light w-fit"
                      onClick={() => toggleWordsExpanded(index)}
                    >
                      {expandedWords.has(index) ? "Hide Words" : "Show Words"} (
                      {transcription.words?.length || 0})
                    </button>
                    {expandedWords.has(index) && (
                      <div className="flex flex-col gap-3 border border-gray-100 dark:border-[rgb(20,21,24)] rounded-xl p-4 bg-gray-50 dark:bg-[rgb(10,11,13)]">
                        {transcription.words?.map((word, wordIndex) => (
                          <div
                            key={word?.id || wordIndex}
                            className="flex flex-col gap-2 p-3 bg-white dark:bg-[rgb(12,13,15)] rounded-lg border border-gray-100 dark:border-[rgb(20,21,24)]"
                          >
                            <div className="flex gap-2 items-center">
                              <div className="flex-1">
                                <label className="text-xs text-gray-400 dark:text-[rgb(120,120,120)] mb-1 block">
                                  Word
                                </label>
                                <input
                                  type="text"
                                  className="w-full text-sm border border-gray-200 dark:border-[rgb(20,21,24)] rounded-lg px-3 py-1.5 dark:bg-[rgb(9,10,11)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                  value={word.input || ""}
                                  onChange={(e) =>
                                    updateWordField(
                                      index,
                                      wordIndex,
                                      "input",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div className="w-24">
                                <label className="text-xs text-gray-400 dark:text-[rgb(120,120,120)] mb-1 block">
                                  Start
                                </label>
                                <input
                                  type="number"
                                  step="0.1"
                                  className="w-full text-sm border border-gray-200 dark:border-[rgb(20,21,24)] rounded-lg px-3 py-1.5 dark:bg-[rgb(9,10,11)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                  value={word.start || 0}
                                  onChange={(e) =>
                                    updateWordField(
                                      index,
                                      wordIndex,
                                      "start",
                                      parseFloat(e.target.value) || 0,
                                    )
                                  }
                                />
                              </div>
                              <div className="w-24">
                                <label className="text-xs text-gray-400 dark:text-[rgb(120,120,120)] mb-1 block">
                                  End
                                </label>
                                <input
                                  type="number"
                                  step="0.1"
                                  className="w-full text-sm border border-gray-200 dark:border-[rgb(20,21,24)] rounded-lg px-3 py-1.5 dark:bg-[rgb(9,10,11)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                  value={word.end || 0}
                                  onChange={(e) =>
                                    updateWordField(
                                      index,
                                      wordIndex,
                                      "end",
                                      parseFloat(e.target.value) || 0,
                                    )
                                  }
                                />
                              </div>
                              <button
                                className="text-xs px-3 py-1.5 border border-blue-200 dark:border-blue-900/50 rounded-lg text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all font-light mt-5"
                                onClick={() =>
                                  handleAddWordBefore(index, wordIndex)
                                }
                                title="Add word before"
                              >
                                + Before
                              </button>
                              <button
                                className="text-xs px-3 py-1.5 border border-blue-200 dark:border-blue-900/50 rounded-lg text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all font-light mt-5"
                                onClick={() =>
                                  handleAddWordAfter(index, wordIndex)
                                }
                                title="Add word after"
                              >
                                + After
                              </button>
                              <button
                                className="text-xs px-3 py-1.5 border border-red-200 dark:border-red-900/50 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all font-light mt-5"
                                onClick={() =>
                                  handleDeleteWord(index, wordIndex)
                                }
                                title="Delete word"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          className="text-xs px-4 py-2 border border-dashed border-gray-300 dark:border-[rgb(30,31,35)] rounded-lg text-gray-500 dark:text-[rgb(140,140,140)] hover:bg-gray-50 dark:hover:bg-[rgb(15,16,18)] hover:border-gray-400 dark:hover:border-[rgb(40,41,45)] transition-all font-light"
                          onClick={() => handleAddWord(index)}
                        >
                          + Add Word
                        </button>
                      </div>
                    )}
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
            </>
          )}
        </div>

        <div className="w-[30%] border-l border-gray-100 dark:border-[rgb(25,26,30)] flex flex-col shrink-0 bg-white dark:bg-[rgb(9,10,11)] h-full overflow-hidden">
          <div className="flex gap-1 p-2 bg-gray-50 dark:bg-[rgb(12,13,15)] flex-shrink-0 relative z-20">
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
                    Smart Set
                  </label>
                  <p className="text-sm text-gray-500 dark:text-[rgb(140,140,140)] font-light leading-relaxed">
                    Automatically set adjacent transcriptions start/end times
                  </p>
                  <button
                    onClick={() => setSmartSet(!smartSet)}
                    className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                      smartSet
                        ? "bg-blue-500"
                        : "bg-gray-300 dark:bg-[rgb(30,31,35)]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                        smartSet ? "left-9" : "left-1"
                      }`}
                    />
                  </button>
                </div>

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
                      (t) => t.id === transcription.id,
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
