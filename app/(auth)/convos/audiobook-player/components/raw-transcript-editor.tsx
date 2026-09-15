"use client";

import React from "react";
import { LocalTranscription } from "../audiobook-player.types";

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
    .reduce(
      (total, part) => (Number.isFinite(part) ? total * 60 + part : NaN),
      0,
    );
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
): {
  transcriptions: LocalTranscription[];
  errors: string[];
  warnings: string[];
} => {
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

    let id = isNewCue ? generatedId() : rawId || previous?.id || generatedId();

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

/**
 * Text editor style view of a transcript: one block per cue, exactly the way the
 * transcript is stored, so a whole file can be edited (or written) as text.
 *
 * The text is the source of truth while it is open — `transcriptions` is only
 * read when mounting, and every keystroke is parsed back into cues and handed to
 * `onChange`. Mount it with a `key` when the cues are replaced from elsewhere
 * (e.g. a subtitle upload), so the blocks are rebuilt from the new cues.
 */
export const RawTranscriptEditor = ({
  transcriptions,
  onChange,
  onErrorsChange,
}: {
  transcriptions: LocalTranscription[];
  onChange: (transcriptions: LocalTranscription[]) => void;
  onErrorsChange?: (hasErrors: boolean) => void;
}) => {
  const [rawText, setRawText] = React.useState(() =>
    transcriptionsToRaw(transcriptions),
  );
  const [errors, setErrors] = React.useState<string[]>([]);
  const [warnings, setWarnings] = React.useState<string[]>([]);

  // Unreadable blocks cannot be saved, so let the parent block its Save button.
  React.useEffect(() => {
    onErrorsChange?.(errors.length > 0);
  }, [errors, onErrorsChange]);

  const handleChange = (value: string) => {
    setRawText(value);

    const parsed = parseRawTranscriptions(value, transcriptions);

    setErrors(parsed.errors);
    setWarnings(parsed.warnings);
    onChange(parsed.transcriptions);
  };

  // Tab indents inside the textarea, like a text editor, instead of jumping to
  // the next form control.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Tab" || event.shiftKey) return;

    event.preventDefault();

    const target = event.currentTarget;
    const { selectionStart, selectionEnd, value } = target;

    handleChange(
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

  return (
    <div className="flex flex-col gap-3 pb-20">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs text-gray-500 dark:text-[rgb(140,140,140)] font-light">
          One block per cue: <span className="font-mono">start - end</span>,
          uuid, then{" "}
          <span className="font-mono">
            pinyin · roman · en · hanzi · input · chinglish
          </span>{" "}
          · blank line between blocks · write{" "}
          <span className="font-mono">NEW</span> instead of a uuid to add a new
          cue · word-level timings are kept as they are
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
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
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

      {errors.length > 0 ? (
        <div className="rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/30 px-4 py-3">
          <p className="text-xs font-medium text-amber-800 dark:text-amber-200 mb-2">
            {errors.length} line{errors.length === 1 ? "" : "s"} could not be
            read — saving is disabled until they are fixed
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-amber-800 dark:text-amber-200 font-light">
            {errors.slice(0, 5).map((error, errorIndex) => (
              <li key={`${errorIndex}-${error}`}>{error}</li>
            ))}
          </ul>
          {errors.length > 5 && (
            <p className="text-xs text-amber-800 dark:text-amber-200 font-light mt-2">
              + {errors.length - 5} more
            </p>
          )}
        </div>
      ) : (
        <p className="text-xs text-gray-400 dark:text-[rgb(120,120,120)] font-light">
          Empty field lines are allowed · press Tab to indent
        </p>
      )}

      {warnings.length > 0 && (
        <ul className="space-y-1 text-xs text-gray-500 dark:text-[rgb(140,140,140)] font-light">
          {warnings.slice(0, 3).map((warning, warningIndex) => (
            <li key={`${warningIndex}-${warning}`}>{warning}</li>
          ))}
          {warnings.length > 3 && <li>+ {warnings.length - 3} more</li>}
        </ul>
      )}
    </div>
  );
};
