/**
 * A subtitle file, read as a text.
 *
 * A subtitle file is a text with times attached: every cue is one line of what
 * is said, and when it is said. What the reader wants is the lines — they are
 * what you read, look up, translate and step through — so a file becomes a text
 * of one line per cue. That is the shape every reading view here already
 * assumes: `splitReaderSentences` works a line at a time, so a cue line is a
 * unit the reader can land on, and the times are kept beside it by index (see
 * `get-reader-line-timestamps`) rather than mixed into the text, where they
 * would be read as words, counted as characters and translated as prose.
 *
 * Three formats are read — the ones a Chinese film's subtitles actually arrive
 * in: SRT, WebVTT, and ASS/SSA. All of them are handled locally: the file never
 * leaves the browser, exactly like a pasted text.
 */

/** One line of a subtitle file, with the time it is on screen. */
export interface ReaderSubtitleCue {
  /** When it starts, in milliseconds from the top of the film. */
  start: number;
  /** When it stops being on screen. */
  end: number;
  /** What it says, on one line. */
  text: string;
}

export type ReaderSubtitleFormat = "srt" | "vtt" | "ass";

export interface ParsedReaderSubtitles {
  format: ReaderSubtitleFormat;
  cues: ReaderSubtitleCue[];
}

/**
 * `00:01:02,500`, `00:01:02.500` and `01:02.500` are all timestamps here: hours
 * are optional, and the fraction is milliseconds — or centiseconds, which is
 * what ASS writes. Two fraction digits are therefore hundredths, not tens of
 * milliseconds, which is why the fraction is padded rather than multiplied.
 */
const TIMESTAMP_PATTERN = /^(?:(\d+):)?(\d{1,2}):(\d{2})(?:[.,](\d{1,3}))?$/;

/** The one line of an SRT/VTT cue that says when it is on screen. */
const TIMING_LINE_PATTERN =
  /^\s*((?:\d+:)?\d{1,2}:\d{2}(?:[.,]\d{1,3})?)\s*-->\s*((?:\d+:)?\d{1,2}:\d{2}(?:[.,]\d{1,3})?)/;

/** The extensions that are read, and what each one turns out to be. */
const EXTENSION_FORMATS: Record<string, ReaderSubtitleFormat> = {
  srt: "srt",
  vtt: "vtt",
  webvtt: "vtt",
  ass: "ass",
  ssa: "ass",
};

/** The formats named in the message a reader gets when a file is not one. */
const SUPPORTED_FORMATS = "SRT, VTT or ASS";

const HTML_ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

/** `&nbsp;`, `&#39;` and friends, which both SRT and VTT allow in a cue. */
const decodeEntities = (text: string) =>
  text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, body: string) => {
    const name = body.toLowerCase();

    if (name.startsWith("#")) {
      const code =
        name.startsWith("#x") || name.startsWith("#X")
          ? parseInt(name.slice(2), 16)
          : parseInt(name.slice(1), 10);

      return Number.isFinite(code) ? String.fromCodePoint(code) : entity;
    }

    return HTML_ENTITIES[name] ?? entity;
  });

/**
 * A cue's text as one readable line.
 *
 * Subtitles mark up their own text for the player, not for a reader: `<i>`, a
 * `<font color=…>`, the speaker in `<v Roger>`, a VTT cue's own inline
 * timestamps, and ASS's `{\an8}` override blocks — none of it is said out loud.
 * The line breaks are markup too: a two-line cue is one line of dialogue, so
 * the two halves are joined rather than kept as a paragraph break, which the
 * reader would read as two unrelated sentences.
 */
const cleanCueText = (raw: string) =>
  decodeEntities(
    (raw || "")
      // ASS override blocks: `{\an8}`, `{\i1}`, `{\p1}` and the drawing mode
      // that comes with them.
      .replace(/\{[^}]*\}/g, "")
      // The hard breaks ASS writes instead of a new line.
      .replace(/\\[Nn]/g, " ")
      // Every other format's tags, including the speaker in `<v Name>`.
      .replace(/<[^>]*>/g, ""),
  )
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" ");

/** A timestamp as milliseconds, or `null` when the line is not one. */
export const parseReaderTimestamp = (value: string) => {
  const match = TIMESTAMP_PATTERN.exec((value || "").trim());

  if (!match) {
    return null;
  }

  const [, hours, minutes, seconds, fraction] = match;

  return (
    ((Number(hours || 0) * 60 + Number(minutes)) * 60 + Number(seconds)) * 1000 +
    Number((fraction || "").padEnd(3, "0"))
  );
};

type RawCue = {
  start: number | null;
  end: number | null;
  text: string;
};

/**
 * SRT and WebVTT are the same file with different hats: cues separated by a
 * blank line, each one a timestamp line and then the text. A VTT header, a
 * `NOTE`, `STYLE` or `REGION` block, a cue identifier — none of it carries a
 * timing line, so all of it falls away by simply looking for the arrow.
 */
const parseTimedBlocks = (content: string): RawCue[] => {
  const cues: RawCue[] = [];
  const lines = (content || "").replace(/^\uFEFF/, "").split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const timing = TIMING_LINE_PATTERN.exec(lines[index] as string);

    if (!timing) {
      continue;
    }

    // The text runs to the next blank line — or, in a file that does not bother
    // with blank lines between cues, to the next timing line.
    const text: string[] = [];
    let next = index + 1;

    for (; next < lines.length; next += 1) {
      const line = lines[next] as string;

      if (!line.trim() || TIMING_LINE_PATTERN.test(line)) {
        break;
      }

      text.push(line);
    }

    cues.push({
      start: parseReaderTimestamp(timing[1] as string),
      end: parseReaderTimestamp(timing[2] as string),
      text: cleanCueText(text.join("\n")),
    });

    index = next;
  }

  return cues;
};

const ASS_DEFAULT_FORMAT = [
  "layer",
  "start",
  "end",
  "style",
  "name",
  "marginl",
  "marginr",
  "marginv",
  "effect",
  "text",
];

/**
 * Cuts an ASS line into exactly `count` fields.
 *
 * The text is the last field and may itself contain commas — a line of
 * dialogue with a pause in it is a line with a comma in it — so the line is
 * split on its first `count - 1` commas and everything after them stays whole.
 */
const splitAssFields = (payload: string, count: number) => {
  const parts: string[] = [];
  let rest = payload;

  for (let index = 0; index < count - 1; index += 1) {
    const comma = rest.indexOf(",");

    if (comma < 0) {
      break;
    }

    parts.push(rest.slice(0, comma));
    rest = rest.slice(comma + 1);
  }

  parts.push(rest);

  return parts;
};

/**
 * ASS/SSA: a script with an `[Events]` section whose `Format:` line names the
 * fields each `Dialogue:` line carries, in order. The text always comes last,
 * and is allowed to contain the separator itself, which is why the line is cut
 * into exactly as many fields as the format names and no further.
 */
const parseAssCues = (content: string): RawCue[] => {
  const cues: RawCue[] = [];
  let fields = ASS_DEFAULT_FORMAT;
  let inEvents = false;

  for (const line of (content || "").replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const trimmed = line.trim();

    if (/^\[.*\]$/.test(trimmed)) {
      inEvents = /^\[events\]$/i.test(trimmed);
      continue;
    }

    if (!inEvents) {
      continue;
    }

    const format = /^format\s*:\s*(.*)$/i.exec(trimmed);

    if (format) {
      const named = (format[1] as string)
        .split(",")
        .map((field) => field.trim().toLowerCase())
        .filter(Boolean);

      if (named.includes("text")) {
        fields = named;
      }

      continue;
    }

    const dialogue = /^dialogue\s*:\s*(.*)$/i.exec(trimmed);

    if (!dialogue) {
      continue;
    }

    // Read back by field name rather than by position, so a `Format:` line that
    // puts the columns in another order still lands on the right ones.
    const parts = splitAssFields(dialogue[1] as string, fields.length);

    const field = (name: string) => {
      const position = fields.indexOf(name);

      return position >= 0 ? (parts[position] || "").trim() : "";
    };

    cues.push({
      start: parseReaderTimestamp(field("start")),
      end: parseReaderTimestamp(field("end")),
      text: cleanCueText(field("text")),
    });
  }

  return cues;
};

/**
 * Cues in the order they are said, with the ones that say nothing dropped.
 *
 * A cue with no timing is not a cue, and a cue that ends before it starts — a
 * file with the two columns the wrong way round — is clamped rather than
 * dropped. Two cues in a row that say the same thing are one line: rolling
 * captions repeat a line across cues, and reading it twice reads as a stutter.
 */
const finaliseCues = (raw: RawCue[]): ReaderSubtitleCue[] => {
  const cues: ReaderSubtitleCue[] = [];

  for (const cue of [...raw].sort(
    (first, second) => (first.start || 0) - (second.start || 0),
  )) {
    const text = cue.text.trim();

    if (!text || cue.start == null || cue.end == null) {
      continue;
    }

    const start = cue.start;
    const end = Math.max(cue.end, start);
    const previous = cues[cues.length - 1];

    if (previous && previous.text === text) {
      previous.end = Math.max(previous.end, end);
      continue;
    }

    cues.push({ start, end, text });
  }

  return cues;
};

const extensionOf = (fileName?: string) =>
  (fileName || "").split(".").pop()?.toLowerCase() || "";

/**
 * Which format a file is, from its name when that says so and from what is in
 * it when it does not — a `.txt` holding SRT is a subtitle file all the same.
 */
export const detectReaderSubtitleFormat = (
  content: string,
  fileName?: string,
): ReaderSubtitleFormat | null => {
  const byExtension = EXTENSION_FORMATS[extensionOf(fileName)];

  if (byExtension) {
    return byExtension;
  }

  const head = (content || "").replace(/^\uFEFF/, "").trimStart();

  if (/^WEBVTT/i.test(head)) {
    return "vtt";
  }

  if (/^\[(script info|events)\]/im.test(head)) {
    return "ass";
  }

  if (head.includes("-->")) {
    return "srt";
  }

  return null;
};

/**
 * A subtitle file's text.
 *
 * Throws when the file carries no cue at all: a reader who is handed an empty
 * text would not know whether the file or the app lost the lines, and the
 * message is what tells them it was the file.
 */
export const parseReaderSubtitles = (
  content: string,
  fileName?: string,
): ParsedReaderSubtitles => {
  const format = detectReaderSubtitleFormat(content, fileName);

  if (!format) {
    throw new Error(
      `That does not look like a subtitle file. ${SUPPORTED_FORMATS} are read.`,
    );
  }

  const cues = finaliseCues(
    format === "ass" ? parseAssCues(content) : parseTimedBlocks(content),
  );

  if (!cues.length) {
    throw new Error(
      `No subtitles could be read out of that file. ${SUPPORTED_FORMATS} are read.`,
    );
  }

  return { format, cues };
};

/**
 * The bytes of a file as text.
 *
 * Subtitles are handed around outside the app stores, so a Chinese file is as
 * likely to be GBK from an older release as it is to be UTF-8 from a modern
 * one — and read as UTF-8, GBK arrives as a wall of replacement characters.
 * UTF-8 is tried first and strictly, so a file that is not UTF-8 fails loudly
 * enough to fall through to GB18030, which is what GBK files are read as.
 */
export const decodeReaderSubtitleBytes = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);

  if (bytes[0] === 0xff && bytes[1] === 0xfe) {
    return new TextDecoder("utf-16le").decode(bytes);
  }

  if (bytes[0] === 0xfe && bytes[1] === 0xff) {
    return new TextDecoder("utf-16be").decode(bytes);
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    try {
      return new TextDecoder("gb18030").decode(bytes);
    } catch {
      return new TextDecoder("utf-8").decode(bytes);
    }
  }
};

/** The lines of a parsed file, as the reader's text: one cue per line. */
export const readerSubtitleText = (cues: ReaderSubtitleCue[]) =>
  cues.map((cue) => cue.text).join("\n");
