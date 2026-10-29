import rawExampleContent from "@/data/example-content.json";

import type { ContentTranscription } from "@/domain/content/content.api";
import { createSegmentPinyin } from "@/libs/utils/segment-text";

/**
 * One real import, in the exact shape the app stores it.
 *
 * `data/example-content.json` is a genuine piece of content — a YouTube song
 * with a transcript, a pinyin reading, an English translation and a
 * word-by-word gloss on every line. This module turns it into a
 * `ContentTranscription[]`, which is the same input the player, the karaoke
 * view, the reader and the insights screens take from the API — so the landing
 * page drives the real components rather than a mock-up of them.
 *
 * Nothing here is fetched: the transcript has line-level timings, so the
 * per-character timings below are derived from them the same way the app
 * distributes a line it was never given word timings for.
 */

const HAN_CHARACTER_RE =
  /[\u2e80-\u2eff\u3005\u3007\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

const toSeconds = (value: unknown) => {
  const parsed =
    typeof value === "number" ? value : Number.parseFloat(String(value ?? ""));

  return Number.isFinite(parsed) ? parsed : 0;
};

interface RawTranscription {
  id?: string;
  input?: string;
  pinyin?: string;
  en?: string;
  chinglish?: string;
  start?: number | string;
  end?: number | string;
}

interface RawContent {
  id: string;
  userId?: string;
  status?: string;
  title?: string;
  author?: string;
  description?: string;
  audio?: string;
  type?: string;
  contentType?: string;
  lang?: string;
  thumbnails?: Record<string, { url?: string }>;
  transcriptions?: RawTranscription[];
}

const rawContent = rawExampleContent as unknown as RawContent;

export const exampleLang = rawContent.lang ?? "zh";

/** The content, as the app's own content screens describe it. */
export const exampleContent = {
  id: rawContent.id,
  title: rawContent.title ?? "Untitled",
  author: rawContent.author ?? "Unknown author",
  description: rawContent.description ?? "",
  audio: rawContent.audio ?? "",
  source: rawContent.type ?? "text",
  category: rawContent.contentType ?? "story",
  lang: exampleLang,
  cover:
    rawContent.thumbnails?.maxres?.url ??
    rawContent.thumbnails?.standard?.url ??
    rawContent.thumbnails?.high?.url ??
    "",
};

interface RawLine {
  id: string;
  input: string;
  pinyin: string;
  en: string;
  chinglish: string;
  start: number;
  end: number;
}

/** Lines in playback order, with the API's string timestamps coerced. */
const rawLines: RawLine[] = (rawContent.transcriptions ?? [])
  .map((line, index) => ({
    id: line.id ?? `line-${index}`,
    input: (line.input ?? "").trim(),
    pinyin: (line.pinyin ?? "").trim(),
    en: (line.en ?? "").trim(),
    chinglish: (line.chinglish ?? "").trim(),
    start: toSeconds(line.start),
    end: toSeconds(line.end),
  }))
  .filter((line) => line.input.length > 0)
  .sort((a, b) => a.start - b.start);

/** Each character with the reading the line gives it, not one guessed alone. */
const readCharacters = (line: RawLine) => {
  const parser = createSegmentPinyin({
    text: line.input,
    lang: exampleLang,
    originalPinyin: line.pinyin,
  });

  return parser
    ? parser.characters
    : Array.from(line.input).map((char, index) => ({
        char,
        pinyin: "",
        isHan: HAN_CHARACTER_RE.test(char),
        start: index,
        end: index + 1,
        owner: index,
      }));
};

/**
 * The transcript in `ContentTranscription` form: one entry per line, with the
 * line's own timing spread across its characters so the karaoke sweep has
 * something to animate.
 */
export const exampleTranscriptions: ContentTranscription[] = rawLines.map(
  (line) => {
    const characters = readCharacters(line);
    const span = Math.max(line.end - line.start, 0.4);
    const total = characters.length || 1;

    const words = characters.map((character, index) => {
      const from = line.start + (span * index) / total;

      return {
        id: `${line.id}-${index}`,
        input: character.char,
        hanzi: character.char,
        pinyin: character.pinyin,
        roman: character.pinyin,
        start: from,
        end: from + span / total,
        startIndex: index,
        endIndex: index + 1,
      };
    });

    return {
      id: line.id,
      input: line.input,
      hanzi: line.input,
      pinyin: line.pinyin,
      roman: "",
      en: line.en,
      chinglish: line.chinglish,
      lang: exampleLang,
      start: line.start,
      end: line.end,
      // `TranscriptionWord` does not model pinyin — the player reads it off the
      // word at runtime (`formatRoman`), so the cast carries it through.
      words: words as unknown as ContentTranscription["words"],
    };
  },
);

/** The recording's length, which is where the last line ends. */
export const exampleDuration = exampleTranscriptions.reduce(
  (latest, line) => Math.max(latest, line.end),
  0,
);

/** The whole transcript as one text, the way the reader app takes it. */
export const exampleReaderText = exampleTranscriptions
  .map((line) => line.input)
  .join("\n");

/** Whole-line pinyin, so the reader shows the reading the transcript gave it. */
export const exampleLinePinyin = new Map(
  exampleTranscriptions.map((line) => [line.input, line.pinyin] as const),
);

/**
 * The words of one line, in the order they are said — the units the cloze hides
 * one at a time.
 */
export const splitLineWords = (text: string): string[] =>
  Array.from(
    new Intl.Segmenter(exampleLang, { granularity: "word" }).segment(text),
  )
    .map((segment) => segment.segment.trim())
    .filter((word) => word.length > 0 && HAN_CHARACTER_RE.test(word));

/** A word of the content, with the reading the line gave it. */
export interface ExampleWord {
  hanzi: string;
  pinyin: string;
  count: number;
}

/**
 * The vocabulary of the content: every word the transcript uses, most-used
 * first. This is what the dictionary looks up, and where the cloze's other
 * options come from.
 */
export const exampleVocabulary: ExampleWord[] = (() => {
  const words = new Map<string, ExampleWord>();

  rawLines.forEach((line) => {
    const parser = createSegmentPinyin({
      text: line.input,
      lang: exampleLang,
      originalPinyin: line.pinyin,
    });

    const segmenter = new Intl.Segmenter(exampleLang, { granularity: "word" });

    for (const segment of segmenter.segment(line.input)) {
      const hanzi = segment.segment.trim();

      if (!hanzi || !HAN_CHARACTER_RE.test(hanzi)) {
        continue;
      }

      const entry = words.get(hanzi) ?? { hanzi, pinyin: "", count: 0 };

      entry.count += 1;

      if (!entry.pinyin && parser) {
        entry.pinyin = parser.getPinyin(hanzi, segment.index);
      }

      words.set(hanzi, entry);
    }
  });

  return Array.from(words.values()).sort(
    (a, b) => b.count - a.count || a.hanzi.localeCompare(b.hanzi),
  );
})();

/**
 * The example content as the app's content screens expect to receive it.
 *
 * The player, the transport, the nav bar and the details views all read one
 * object of this shape out of the query cache, so seeding it is enough to run
 * them on a public page: no account, no request, no difference in the UI.
 */
export const exampleIContent = {
  id: exampleContent.id,
  title: exampleContent.title,
  description: exampleContent.description,
  author: exampleContent.author,
  lang: exampleContent.lang,
  // A YouTube link, the same as a real import would carry.
  audio: exampleContent.audio,
  userId: rawContent.userId ?? "example",
  type: exampleContent.source,
  contentType: exampleContent.category,
  status: rawContent.status ?? "TRANSLATED",
  thumbnails: rawContent.thumbnails,
  coverPhotoUrl: exampleContent.cover,
  chapters: [],
  transcriptions: exampleTranscriptions,
};
