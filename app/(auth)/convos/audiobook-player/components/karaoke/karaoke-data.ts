import { formatRoman } from "@/lib/format-roman";

/**
 * A single singable unit of a lyric line.
 *
 * Apple Music Sing sweeps through a line syllable by syllable, so the smallest
 * unit we can time is what we animate. `words` from the API already carry
 * per-word timing (and pinyin/roman) — that maps 1:1 onto this type.
 */
export type KaraokeToken = {
  key: string;
  /** Raw text, whitespace included, so spacing survives rendering. */
  text: string;
  start: number;
  end: number;
  isSpace: boolean;
  roman?: string;
};

/**
 * A chunk is what we actually show on one visual line. Audiobook transcriptions
 * are complete sentences, which would wrap into a wall of text, so long lines
 * get split at token boundaries into singable chunks that keep their own
 * timings. Tapping a chunk seeks to that chunk (not to the whole sentence).
 */
export type KaraokeChunk = {
  key: string;
  tokens: KaraokeToken[];
  start: number;
  end: number;
  /** Index of the source transcription, used to attach pinyin / translation. */
  parentIndex: number;
  parent: any;
  /** Number of visible (non whitespace) characters — drives font sizing. */
  visibleLength: number;
  /** True when this chunk has pronunciation data to show as a guide. */
  hasRoman: boolean;
  isFirstOfParent: boolean;
};

const WHITESPACE_RE = /^\s*$/;
const CJK_RE =
  /[\u2e80-\u2eff\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/;

export const containsCjk = (text: string) => CJK_RE.test(text || "");

/**
 * Pronunciation is not always attached to individual words: plenty of content
 * only carries the romanised reading for the whole line ("hěn jiǔ yǐ qián").
 * When that is all we have, zip it back onto the syllables so the pinyin guide
 * still works for every line.
 */
const withLineRoman = (tokens: KaraokeToken[], line: any): KaraokeToken[] => {
  const lineRoman = [line?.pinyin, line?.roman]
    .filter((value) => typeof value === "string" && value.trim().length > 0)
    .flatMap((value: string) => value.trim().split(/\s+/));

  const visible = tokens.filter((token) => !token.isSpace);

  if (
    lineRoman.length === 0 ||
    visible.length === 0 ||
    visible.every((token) => !!token.roman)
  ) {
    return tokens;
  }

  // One reading per token, e.g. words that carry their own pinyin.
  if (lineRoman.length === visible.length) {
    let index = 0;

    return tokens.map((token) => {
      if (token.isSpace || token.roman) {
        return token;
      }

      const roman = lineRoman[index];
      index += 1;

      return { ...token, roman: roman || undefined };
    });
  }

  // One reading per *character* — how pinyin is usually stored. Spread it back
  // over whatever grouping we are displaying.
  const totalChars = visible.reduce(
    (acc, token) => acc + token.text.length,
    0,
  );

  if (lineRoman.length !== totalChars) {
    return tokens;
  }

  let cursor = 0;

  return tokens.map((token) => {
    const length = token.text.length;
    const slice = lineRoman.slice(cursor, cursor + length);

    cursor += length;

    if (token.isSpace || token.roman || slice.length === 0) {
      return token;
    }

    return { ...token, roman: slice.join(" ") };
  });
};

const toNumber = (value: any): number | null => {
  const parsed = typeof value === "number" ? value : parseFloat(value);

  return Number.isFinite(parsed) ? parsed : null;
};

const MAX_CHARS_PER_CHUNK_CJK = 20;
const MAX_CHARS_PER_CHUNK_ROMAN = 42;

/**
 * Turns one transcription into timed tokens.
 *
 * Prefers real per-word timings from the API. When those are missing (older
 * content, or a language we never aligned) the line duration is distributed
 * across its tokens by character count, which still animates believably.
 */
export const buildKaraokeTokens = (line: any, lang?: string): KaraokeToken[] => {
  if (!line) {
    return [];
  }

  const input: string = line.input || line.hanzi || "";
  const words: any[] = Array.isArray(line.words) ? line.words : [];

  const lineStart = toNumber(line.start) ?? 0;
  const rawLineEnd = toNumber(line.end);
  const lineEnd =
    rawLineEnd !== null && rawLineEnd > lineStart
      ? rawLineEnd
      : lineStart + Math.max(input.length * 0.14, 1.2);

  const usableWords = words.filter(
    (word) => typeof word?.input === "string" && word.input.length > 0,
  );

  const hasWordTimings = usableWords.some((word) => {
    const start = toNumber(word.start);
    const end = toNumber(word.end);

    return start !== null && end !== null && end > start;
  });

  let tokens: KaraokeToken[];

  if (usableWords.length > 0 && hasWordTimings) {
    tokens = usableWords.map((word, index) => {
      const start = toNumber(word.start) ?? lineStart;
      const end = toNumber(word.end) ?? start + 0.01;

      return {
        key: `${line.id ?? "line"}-w${index}`,
        text: word.input,
        start,
        end: Math.max(end, start + 0.005),
        isSpace: WHITESPACE_RE.test(word.input),
        roman: formatRoman(word) || undefined,
      };
    });
  } else {
    // No per-word timing. Prefer the segmented words when we have them — they
    // carry the pronunciation — and only fall back to slicing the raw text.
    const pieces =
      usableWords.length > 0
        ? usableWords.map((word) => ({
            text: word.input as string,
            roman: formatRoman(word) || undefined,
          }))
        : (input.includes(" ") || !containsCjk(input)
            ? input.split(/(\s+)/).filter((piece) => piece.length > 0)
            : Array.from(input)
          ).map((piece) => ({ text: piece, roman: undefined as string | undefined }));

    const visiblePieces = pieces.filter(
      (piece) => !WHITESPACE_RE.test(piece.text),
    );
    const totalChars =
      visiblePieces.reduce((acc, piece) => acc + piece.text.length, 0) || 1;

    const duration = Math.max(lineEnd - lineStart, 0.01);
    let cursor = lineStart;

    tokens = pieces.map((piece, index) => {
      if (WHITESPACE_RE.test(piece.text)) {
        return {
          key: `${line.id ?? "line"}-s${index}`,
          text: piece.text,
          start: cursor,
          end: cursor,
          isSpace: true,
        };
      }

      const pieceStart = cursor;
      cursor = Math.min(
        lineEnd,
        pieceStart + duration * (piece.text.length / totalChars),
      );

      return {
        key: `${line.id ?? "line"}-p${index}`,
        text: piece.text,
        start: pieceStart,
        end: Math.max(cursor, pieceStart + 0.005),
        isSpace: false,
        roman: piece.roman,
      };
    });
  }

  return withLineRoman(tokens, line);
};

const trimSpaceEdges = (tokens: KaraokeToken[]) => {
  const result = [...tokens];

  while (result.length > 0 && result[0].isSpace) {
    result.shift();
  }

  while (result.length > 0 && result[result.length - 1].isSpace) {
    result.pop();
  }

  return result;
};

/**
 * Splits a line's tokens into balanced groups.
 *
 * A naive "cut every N characters" split leaves orphan syllables on their own
 * line ("…山山洞" / "里"), which looks broken in a karaoke view — so lines are
 * divided into equal parts at token boundaries instead, and a runt tail is
 * folded back into the previous chunk.
 */
const groupTokens = (
  tokens: KaraokeToken[],
  maxChars: number,
): KaraokeToken[][] => {
  const visibleLength = (group: KaraokeToken[]) =>
    group.reduce((acc, token) => acc + (token.isSpace ? 0 : token.text.length), 0);

  const total = visibleLength(tokens);

  if (total === 0) {
    return [];
  }

  // Comfortably fits on one line — leave it alone.
  if (total <= maxChars * 1.35) {
    return [trimSpaceEdges(tokens)];
  }

  const parts = Math.max(2, Math.ceil(total / maxChars));
  const target = total / parts;

  const groups: KaraokeToken[][] = [];
  let current: KaraokeToken[] = [];
  let count = 0;

  tokens.forEach((token) => {
    if (
      !token.isSpace &&
      count >= target &&
      current.some((item) => !item.isSpace)
    ) {
      groups.push(current);
      current = [];
      count = 0;
    }

    if (!token.isSpace) {
      count += token.text.length;
    }

    current.push(token);
  });

  if (current.length > 0) {
    groups.push(current);
  }

  if (groups.length > 1) {
    const tail = groups[groups.length - 1];

    if (visibleLength(tail) < Math.max(target * 0.5, 3)) {
      groups.pop();
      groups[groups.length - 1] = [...groups[groups.length - 1], ...tail];
    }
  }

  return groups
    .map(trimSpaceEdges)
    .filter((group) => group.some((token) => !token.isSpace));
};

/**
 * Flattens transcriptions into short, singable chunks.
 *
 * Lines whose timings are unusable are dropped, unless none of them can be
 * timed — then we lay every line out sequentially so the view still animates
 * instead of showing nothing.
 */
export const buildKaraokeChunks = (
  transcriptions: any[] = [],
  lang?: string,
): KaraokeChunk[] => {
  const lines = (transcriptions || []).filter(Boolean);
  const chunks: KaraokeChunk[] = [];

  lines.forEach((line, parentIndex) => {
    const start = toNumber(line.start);
    const end = toNumber(line.end);

    if (start === null || end === null || !(end > start)) {
      return;
    }

    const tokens = buildKaraokeTokens(line, lang).filter(
      (token) => toNumber(token.start) !== null && toNumber(token.end) !== null,
    );

    if (tokens.length === 0) {
      return;
    }

    const isCjkLine = containsCjk(line.input || line.hanzi || "");
    const maxChars = isCjkLine
      ? MAX_CHARS_PER_CHUNK_CJK
      : MAX_CHARS_PER_CHUNK_ROMAN;

    groupTokens(tokens, maxChars).forEach((group, groupIndex) => {
      const visible = group.filter((token) => !token.isSpace);

      if (visible.length === 0) {
        return;
      }

      chunks.push({
        key: `${line.id ?? parentIndex}-c${chunks.length}`,
        tokens: group,
        start: visible[0].start,
        end: Math.max(
          visible[visible.length - 1].end,
          visible[0].start + 0.05,
        ),
        parentIndex,
        parent: line,
        visibleLength: visible.reduce(
          (acc, token) => acc + token.text.length,
          0,
        ),
        hasRoman: visible.some((token) => !!token.roman),
        isFirstOfParent: groupIndex === 0,
      });
    });
  });

  if (chunks.length > 0) {
    return chunks;
  }

  // Untimed content: keep the karaoke view usable by pacing lines ourselves.
  const fallbackChunks: KaraokeChunk[] = [];
  let cursor = 0;

  lines.forEach((line, parentIndex) => {
    const tokens = buildKaraokeTokens(
      { ...line, start: 0, end: 1 },
      lang,
    ).filter((token) => !token.isSpace);

    if (tokens.length === 0) {
      return;
    }

    const isCjkLine = containsCjk(line.input || line.hanzi || "");
    const maxChars = isCjkLine
      ? MAX_CHARS_PER_CHUNK_CJK
      : MAX_CHARS_PER_CHUNK_ROMAN;

    groupTokens(tokens, maxChars).forEach((group, groupIndex) => {
      const visible = group.filter((token) => !token.isSpace);

      if (visible.length === 0) {
        return;
      }

      const duration = Math.max(visible.length * 0.22, 1.2);

      fallbackChunks.push({
        key: `fallback-${parentIndex}-${fallbackChunks.length}`,
        tokens: group,
        start: cursor,
        end: cursor + duration,
        parentIndex,
        parent: line,
        visibleLength: visible.reduce(
          (acc, token) => acc + token.text.length,
          0,
        ),
        hasRoman: visible.some((token) => !!token.roman),
        isFirstOfParent: groupIndex === 0,
      });

      cursor += duration + 0.35;
    });
  });

  return fallbackChunks;
};

/**
 * Index of the chunk that should be highlighted at `time`.
 *
 * Returns -1 during the count-in, and otherwise holds the last chunk that has
 * started — so during an instrumental break the previous line stays lit while
 * the animated dots tell you to hang on.
 */
export const findActiveChunkIndex = (
  chunks: KaraokeChunk[],
  time: number,
): number => {
  if (chunks.length === 0) {
    return -1;
  }

  if (time < chunks[0].start) {
    return -1;
  }

  let low = 0;
  let high = chunks.length - 1;
  let result = -1;

  while (low <= high) {
    const mid = (low + high) >> 1;

    if (chunks[mid].start <= time) {
      result = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return result;
};
