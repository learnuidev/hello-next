import { pinyin as toPinyin } from "pinyin-pro";

/**
 * Segment pinyin parser.
 *
 * `getPinyin(segment)` reads a segment in isolation, so a character whose
 * reading depends on its neighbours (多音字) comes back wrong: 行 reads `xíng`
 * even when the segment was cut out of 银行, and 重 reads `zhòng` even when the
 * text said 重复.
 *
 * This parser is handed the pinyin of the *whole* text — where the neighbours
 * are still visible — and slices the reading of a segment out of it, so every
 * segment keeps the reading the surrounding text actually intended.
 *
 *   const parser = createSegmentPinyinParser({
 *     text: "我住在银行附近",
 *     pinyin: "wǒ zhù zài yín háng fù jìn",
 *   });
 *
 *   parser.getPinyin("银行", 3); // "yín háng"
 *   parser.getPinyin("行", 5); // "háng"  (getPinyin("行") alone says "xíng")
 *
 * Anything that carries readings in text order is accepted as the source:
 *
 *   pinyin(text)                            // one reading per syllable
 *   pinyin(text, { type: "array" })         // one reading per character
 *   pinyin(text, { type: "all" })           // entries carrying origin + pinyin
 *   transcription.pinyin                    // line level romanisation
 *   words                                   // [{ input | hanzi, pinyin | roman }]
 *
 * Word level sources are expanded per character, splitting readings such as
 * `níhǎo` or `shuìjiàole` against the characters they cover. Whenever a segment
 * cannot be read from the source — no source, misaligned source, characters the
 * source skipped — the parser falls back to reading the segment on its own, so
 * it never returns less than the previous behaviour did.
 */

/** Characters we expect a pinyin reading for. */
const HAN_CHAR_RE =
  /[\u2e80-\u2eff\u3005\u3007\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

/** Separators between readings in a whole-text pinyin string. */
const READING_SEPARATOR_RE = /[\s\u00b7·]+/;

/** Properties a reading may hide behind, richest first. */
const READING_KEYS = ["pinyin", "roman", "result", "reading"];

/** Properties the text a reading belongs to may hide behind. */
const SOURCE_KEYS = ["origin", "input", "hanzi", "word", "segment", "text"];

/** Below this many comparable readings a source is trusted as it is. */
const MIN_COMPARABLE_READINGS = 3;

/**
 * A source that does not line up with the text (pinyin of a different line, off
 * by one character, ...) hands readings to the wrong characters. Such a source
 * disagrees with the characters' own readings almost everywhere, while a correct
 * one disagrees only on polyphonic characters, so anything above this share is
 * treated as broken and ignored.
 */
const MAX_DISAGREEMENT = 0.35;

export const isHanCharacter = (char: string) => HAN_CHAR_RE.test(char);

/**
 * Whole-text pinyin: a string of readings, or one entry per character/word
 * (`pinyin(text, { type: "all" })`, API words, ...). Entries are read loosely —
 * `pinyin`, `roman`, `result` and `origin`, `input`, `hanzi`, `word` are all
 * understood — so anything that carries readings in text order fits.
 */
export type OriginalPinyin = string | readonly unknown[];

/** A single reading lifted out of the whole-text pinyin. */
interface ReadingToken {
  /** Text the reading belongs to, when the source is character/word based. */
  source?: string;
  /** The reading itself. */
  reading: string;
}

/** A reading placed in text order, with the character it was reported for. */
interface ReadingSlot {
  char?: string;
  reading: string;
  /** Characters the reading covers; only meaningful on the leading slot. */
  span: number;
}

/** One character of the text with the reading it inherited from the whole text. */
export interface AlignedCharacter {
  char: string;
  /** Empty when the source carried no reading for this character. */
  pinyin: string;
  /** UTF-16 offsets of `char` inside the whole text. */
  start: number;
  end: number;
  isHan: boolean;
  /** Index of the character owning the reading that covers this one. */
  owner: number;
}

export interface SegmentPinyinParserInput {
  /** The text the segments were cut out of. */
  text: string;
  /** Pinyin of the entire `text`. */
  pinyin?: OriginalPinyin;
  /** Reading used when the source cannot answer; defaults to `pinyin(segment)`. */
  fallback?: (segment: string) => string;
  /**
   * Keep the neutral tones a segment reads on its own, wherever the source
   * reads the same syllable with a tone.
   *
   * Off by default: a source handed in by a caller is authoritative and is used
   * as it is. Turn it on when the source is just another reading of the same
   * text (`pinyin(text)`): reading a segment on its own is the better judge of
   * a neutral tone — reading the whole text turns 这个 into `zhè gè` — while the
   * source stays the better judge of which syllable a character reads, because
   * that is a difference in the syllable itself (了 `liǎo` → `le`,
   * 中 `zhōng` → `zhòng`).
   */
  keepNeutralTones?: boolean;
}

export interface SegmentPinyinParser {
  /** Whole-text pinyin, aligned one entry per character of `text`. */
  characters: AlignedCharacter[];
  /** False when the source could not be aligned and the fallback is used. */
  aligned: boolean;
  /** Pinyin of a segment, preferably taken from the whole-text source. */
  getPinyin: (segment: string, startIndex?: number) => string;
  /** Pinyin of a segment as produced by `segmentText`. */
  getPinyinForSegment: (segment: {
    input?: string;
    segment?: string;
    startIndex?: number;
    endIndex?: number;
  }) => string;
}

/** One character of the text, split by code point (combining marks follow on). */
interface TextUnit {
  char: string;
  start: number;
  end: number;
  isHan: boolean;
}

const splitUnits = (text: string): TextUnit[] => {
  const units: TextUnit[] = [];
  let offset = 0;

  for (const char of text) {
    const start = offset;

    offset += char.length;

    units.push({
      char,
      start,
      end: offset,
      isHan: isHanCharacter(char),
    });
  }

  return units;
};

const pickString = (
  value: Record<string, unknown>,
  keys: string[],
): string | undefined => {
  for (const key of keys) {
    const candidate = value?.[key];

    if (typeof candidate === "string") {
      return candidate;
    }
  }

  return undefined;
};

/**
 * Tone-less, separator-less form of a reading, used only to compare readings:
 * `Nǚ` and `nv` and `nü3` and `nu:3` all become `nv`.
 */
const toBase = (value: string) =>
  value
    .normalize("NFD")
    .replace(/u\u0308/g, "v")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/u:/gi, "v")
    .replace(/[0-9]/g, "")
    .replace(/[’·\s:,.'-]/g, "")
    .toLowerCase();

/**
 * True when a source actually carries readings.
 *
 * An API that has no pinyin for a line reports it as `""` — which is not a
 * source, and must never be mistaken for one, or the caller silently gets the
 * old isolated readings back.
 */
export const hasPinyinSource = (
  source: OriginalPinyin | undefined | null,
): boolean => {
  if (typeof source === "string") {
    return source.trim().length > 0;
  }

  return Array.isArray(source) && source.length > 0;
};

/** First of the given sources that actually carries readings. */
export const pickPinyinSource = (
  ...sources: (OriginalPinyin | undefined | null)[]
): OriginalPinyin | undefined => {
  for (const source of sources) {
    if (hasPinyinSource(source)) {
      return source as OriginalPinyin;
    }
  }

  return undefined;
};

/**
 * The base form of a reading together with the offsets each base character came
 * from, so a split can be mapped back onto the original reading.
 */
const splitIntoBaseUnits = (value: string) => {
  const units: { text: string; start: number; end: number }[] = [];
  let offset = 0;

  for (const char of value) {
    const start = offset;

    offset += char.length;

    const base = toBase(char);

    if (base) {
      units.push({ text: base, start, end: offset });
    }
  }

  return {
    base: units.map((unit) => unit.text).join(""),
    units,
  };
};

const splitReading = (reading: string) =>
  (reading || "")
    .split(READING_SEPARATOR_RE)
    .map((piece) => piece.trim())
    .filter((piece) => piece.length > 0);

const candidatesCache = new Map<string, string[]>();

/** Every reading a character can have, tone-less (`行` → `xing`, `hang`, `heng`). */
const candidatesFor = (char: string): string[] => {
  const cached = candidatesCache.get(char);

  if (cached) {
    return cached;
  }

  const readings = (
    toPinyin(char, {
      multiple: true,
      type: "array",
      toneType: "none",
      v: true,
    }) as string[]
  )
    .map(toBase)
    .filter((reading) => reading.length > 0);

  const unique = [...new Set(readings)].sort(
    (a, b) => b.length - a.length || a.localeCompare(b),
  );

  candidatesCache.set(char, unique);

  return unique;
};

/**
 * Splits a reading that covers several characters across exactly those
 * characters, or returns null when it cannot: `níhǎo` over `你好`, `shuìjiàole`
 * over `睡觉了`, `nǐde` over `你的`.
 */
const splitReadingAcross = (
  reading: string,
  chars: string[],
): string[] | null => {
  const { base, units } = splitIntoBaseUnits(reading);

  if (!base || chars.length === 0) {
    return null;
  }

  const result: string[] = [];
  const seen = new Map<string, boolean>();

  const walk = (charIndex: number, baseIndex: number): boolean => {
    if (charIndex === chars.length) {
      return baseIndex === base.length;
    }

    const key = `${charIndex}:${baseIndex}`;
    const cached = seen.get(key);

    if (cached !== undefined) {
      return cached;
    }

    let matched = false;

    for (const candidate of candidatesFor(chars[charIndex])) {
      if (!base.startsWith(candidate, baseIndex)) {
        continue;
      }

      if (walk(charIndex + 1, baseIndex + candidate.length)) {
        result[charIndex] = reading.slice(
          units[baseIndex].start,
          units[baseIndex + candidate.length - 1].end,
        );
        matched = true;
        break;
      }
    }

    seen.set(key, matched);

    return matched;
  };

  return walk(0, 0) ? result : null;
};

/**
 * Places a reading that has no characters of its own next to the characters it
 * may cover, preferring the fewest characters that read to exactly that
 * reading.
 */
const spreadReading = (
  units: TextUnit[],
  startIndex: number,
  reading: string,
): { targets: number[]; readings: string[] } | null => {
  const { base } = splitIntoBaseUnits(reading);

  if (!base) {
    return null;
  }

  const targets: number[] = [];

  for (
    let index = startIndex;
    index < units.length && targets.length < base.length;
    index += 1
  ) {
    if (units[index].isHan) {
      targets.push(index);
    }
  }

  for (let length = 1; length <= targets.length; length += 1) {
    const covered = targets.slice(0, length);
    const readings = splitReadingAcross(
      reading,
      covered.map((index) => units[index].char),
    );

    if (readings) {
      return { targets: covered, readings };
    }
  }

  return null;
};

/** Normalises a source into readings in text order. */
const normalizeSource = (
  source: OriginalPinyin | undefined | null,
): ReadingToken[] => {
  if (!source) {
    return [];
  }

  const items =
    typeof source === "string"
      ? source.split(READING_SEPARATOR_RE)
      : Array.isArray(source)
        ? source
        : [];

  const tokens: ReadingToken[] = [];

  for (const item of items) {
    if (typeof item === "string") {
      const reading = item.trim();

      if (reading) {
        tokens.push({ reading });
      }

      continue;
    }

    if (item && typeof item === "object") {
      const entry = item as Record<string, unknown>;
      const reading = pickString(entry, READING_KEYS) ?? "";
      const origin = pickString(entry, SOURCE_KEYS);

      if (!reading && !origin) {
        continue;
      }

      tokens.push({ source: origin, reading });
    }
  }

  return tokens;
};

/** Expands readings into one slot per character, where the source knows them. */
const buildSlots = (tokens: ReadingToken[]): ReadingSlot[] => {
  const slots: ReadingSlot[] = [];

  for (const token of tokens) {
    const sourceChars = token.source ? Array.from(token.source) : [];
    const pieces = splitReading(token.reading);

    if (sourceChars.length === 0) {
      if (pieces.length === 0) {
        slots.push({ reading: "", span: 1 });
        continue;
      }

      for (const piece of pieces) {
        slots.push({ reading: piece, span: 1 });
      }

      continue;
    }

    if (sourceChars.length === 1) {
      slots.push({ char: sourceChars[0], reading: token.reading, span: 1 });

      continue;
    }

    // One reading per character, either because the source separated them or
    // because it can be split back into them (`níhǎo` → `nǐ` + `hǎo`).
    const readings =
      pieces.length === sourceChars.length
        ? pieces
        : splitReadingAcross(token.reading, sourceChars);

    if (readings) {
      sourceChars.forEach((char, index) => {
        slots.push({ char, reading: readings[index], span: 1 });
      });

      continue;
    }

    // A reading that cannot be split covers the whole run, so it stays with the
    // first character and the rest follow it.
    sourceChars.forEach((char, index) => {
      slots.push({
        char,
        reading: index === 0 ? token.reading : "",
        span: index === 0 ? sourceChars.length : 0,
      });
    });
  }

  return slots;
};

/**
 * Character for character alignment, used when the source carries its own text
 * (`pinyin(text, { type: "all" })`, per-character API words).
 */
const alignByCharacter = (
  units: TextUnit[],
  slots: ReadingSlot[],
): ReadingSlot[] | null => {
  if (slots.length !== units.length) {
    return null;
  }

  for (let index = 0; index < units.length; index += 1) {
    if (slots[index].char !== units[index].char) {
      return null;
    }
  }

  return slots;
};

/** True when the upcoming characters spell out `run` and none of them is Han. */
const matchesRun = (units: TextUnit[], startIndex: number, run: string) => {
  if (!run) {
    return false;
  }

  const runUnits = Array.from(run);

  if (startIndex + runUnits.length > units.length) {
    return false;
  }

  return runUnits.every((char, offset) => {
    const unit = units[startIndex + offset];

    return !unit.isHan && unit.char === char;
  });
};

/**
 * Walks the text and the readings together. Han characters always take the next
 * reading (the source is expected to hold one per character), while other
 * characters only take a reading that spells them out — pinyin keeps non-Chinese
 * text as it is, and a source may drop it entirely.
 */
const alignByWalk = (
  units: TextUnit[],
  slots: ReadingSlot[],
): (ReadingSlot | undefined)[] => {
  const assignments: (ReadingSlot | undefined)[] = new Array(units.length);

  let unitIndex = 0;
  let slotIndex = 0;

  while (unitIndex < units.length && slotIndex < slots.length) {
    const unit = units[unitIndex];
    const slot = slots[slotIndex];
    const spellsOutChar = slot.char !== undefined && slot.char === unit.char;

    if (spellsOutChar) {
      assignments[unitIndex] = slot;
      unitIndex += 1;
      slotIndex += 1;
      continue;
    }

    if (unit.isHan) {
      // A reading for a character the source did not spell out: either it
      // covers the next few characters (`níhǎo` before 你好, `shuìjiàole`
      // before 睡觉了) or it simply belongs to this one.
      if (slot.char === undefined && splitReading(slot.reading).length === 1) {
        const spread = spreadReading(units, unitIndex, slot.reading);

        if (spread && spread.readings.length > 1) {
          spread.readings.forEach((reading, index) => {
            assignments[spread.targets[index]] = { reading, span: 1 };
          });

          unitIndex = spread.targets[spread.targets.length - 1] + 1;
          slotIndex += 1;
          continue;
        }
      }

      assignments[unitIndex] = { reading: slot.reading, span: slot.span };
      unitIndex += 1;
      slotIndex += 1;
      continue;
    }

    // Non-Chinese: take the reading only when it is this character (or this run
    // of characters) written out again.
    if (slot.char === undefined && slot.reading === unit.char) {
      assignments[unitIndex] = { reading: slot.reading, span: 1 };
      unitIndex += 1;
      slotIndex += 1;
      continue;
    }

    const runLength = slot.char === undefined ? Array.from(slot.reading).length : 0;

    if (runLength > 0 && matchesRun(units, unitIndex, slot.reading)) {
      assignments[unitIndex] = { reading: slot.reading, span: runLength };
      unitIndex += runLength;
      slotIndex += 1;
      continue;
    }

    // Nothing in the source for this character; keep the reading for the next.
    unitIndex += 1;
  }

  return assignments;
};

/**
 * True for a reading written without a tone (`ge`, `de`, `zi`) — the neutral
 * tone of a particle or of the second half of a word like 这个 or 桌子. The `ü`
 * diaeresis is not a tone, so it is left out of the check.
 */
const isToneless = (value: string) =>
  !/[0-9]/.test(value) &&
  !/[\u0300-\u0307\u0309-\u036f]/.test(value.normalize("NFD"));

/**
 * Keeps the neutral tones a segment reads on its own (`zhè gè` from the source,
 * `zhè ge` from the segment → `zhè ge`). Only neutral tones are kept: a segment
 * that reads a full tone there and disagrees with the source is a syllable the
 * context resolved, so the source wins.
 */
const mergeNeutralTones = (fromSource: string, fromSegment: string) => {
  const sourceParts = splitReading(fromSource);
  const segmentParts = splitReading(fromSegment);

  if (sourceParts.length !== segmentParts.length) {
    return fromSource;
  }

  return sourceParts
    .map((part, index) => {
      const segmentPart = segmentParts[index];

      return toBase(part) === toBase(segmentPart) && isToneless(segmentPart)
        ? segmentPart
        : part;
    })
    .join(" ");
};

/**
 * Parser built from one whole-text pinyin source, reusable for every segment of
 * that text.
 */
export const createSegmentPinyinParser = ({
  text,
  pinyin,
  fallback,
  keepNeutralTones = false,
}: SegmentPinyinParserInput): SegmentPinyinParser => {
  const source = text || "";
  const units = splitUnits(source);
  // `""` and `[]` are an API saying "no pinyin here", not a source to align.
  const slots = buildSlots(hasPinyinSource(pinyin) ? normalizeSource(pinyin) : []);

  const assignments =
    alignByCharacter(units, slots) ?? alignByWalk(units, slots);

  const owners = units.map((_, index) => index);

  for (let index = 0; index < units.length; index += 1) {
    const span = assignments[index]?.span ?? 1;

    if (span > 1) {
      for (let offset = 1; offset < span && index + offset < units.length; offset += 1) {
        owners[index + offset] = index;
      }

      index += span - 1;
    }
  }

  const characters: AlignedCharacter[] = units.map((unit, index) => ({
    char: unit.char,
    pinyin: owners[index] === index ? assignments[index]?.reading ?? "" : "",
    start: unit.start,
    end: unit.end,
    isHan: unit.isHan,
    owner: owners[index],
  }));

  const fallbackPinyin = (segment: string) =>
    fallback ? fallback(segment) : toPinyin(segment);

  // Readings that cover a single character can be checked against the readings
  // that character can have at all: a source that lines up agrees with them
  // (polyphonic characters are the only exceptions), a source that does not
  // disagrees nearly everywhere.
  let comparable = 0;
  let disagreed = 0;

  characters.forEach((character, index) => {
    if (!character.isHan || !character.pinyin) {
      return;
    }

    if (character.owner !== index || owners[index + 1] === index) {
      return;
    }

    const reading = toBase(character.pinyin);

    if (!reading) {
      return;
    }

    comparable += 1;

    if (!candidatesFor(character.char).includes(reading)) {
      disagreed += 1;
    }
  });

  const aligned =
    slots.length > 0 &&
    (comparable < MIN_COMPARABLE_READINGS ||
      disagreed / comparable <= MAX_DISAGREEMENT);

  const unitByStart = new Map<number, number>();
  const unitByEnd = new Map<number, number>();

  units.forEach((unit, index) => {
    unitByStart.set(unit.start, index);
    unitByEnd.set(unit.end, index);
  });

  /** Reads a range of characters back out of the source. */
  const assemble = (from: number, to: number): string | null => {
    const parts: string[] = [];
    let index = from;

    while (index < to) {
      const owner = owners[index];

      if (owner < index) {
        // Inside a reading that started before the range: the range would show
        // it only half, so let the fallback read the segment instead.
        return null;
      }

      let reach = index + 1;

      while (reach < units.length && owners[reach] === index) {
        reach += 1;
      }

      if (reach > to) {
        // The reading covers characters outside the segment: half a word is
        // worse than reading the segment on its own.
        return null;
      }

      const reading = assignments[index]?.reading ?? "";

      if (!reading && units.slice(index, reach).some((unit) => unit.isHan)) {
        // Han characters without a reading: the source skipped them.
        return null;
      }

      if (reading.trim()) {
        parts.push(reading.trim());
      }

      index = reach;
    }

    return parts.length > 0 ? parts.join(" ") : null;
  };

  /** Character range of a segment, preferring the position it was cut from. */
  const rangeOf = (segment: string, startIndex?: number) => {
    const matchesAt = (start: number) =>
      start >= 0 && source.slice(start, start + segment.length) === segment;

    const starts: number[] = [];

    if (typeof startIndex === "number" && matchesAt(startIndex)) {
      starts.push(startIndex);
    }

    const found = source.indexOf(segment);

    if (found >= 0 && !starts.includes(found)) {
      starts.push(found);
    }

    for (const start of starts) {
      const from = unitByStart.get(start);
      const to = unitByEnd.get(start + segment.length);

      if (from !== undefined && to !== undefined && to >= from) {
        return { from, to: to + 1 };
      }
    }

    return null;
  };

  const getPinyin = (segment: string, startIndex?: number) => {
    const input = segment ?? "";

    if (!aligned || !input.trim()) {
      return fallbackPinyin(input);
    }

    const range = rangeOf(input, startIndex);

    if (!range) {
      return fallbackPinyin(input);
    }

    const fromSource = assemble(range.from, range.to);

    if (!fromSource) {
      return fallbackPinyin(input);
    }

    return keepNeutralTones
      ? mergeNeutralTones(fromSource, fallbackPinyin(input))
      : fromSource;
  };

  return {
    characters,
    aligned,
    getPinyin,
    getPinyinForSegment: (segment) =>
      getPinyin(
        segment?.input ?? segment?.segment ?? "",
        segment?.startIndex,
      ),
  };
};

/**
 * Pinyin of a single segment, read out of the pinyin of the whole text.
 * Convenience wrapper around `createSegmentPinyinParser` for one-off use — build
 * the parser once when several segments share the same text.
 */
export const getSegmentPinyin = ({
  text,
  pinyin,
  segment,
  startIndex,
  fallback,
  keepNeutralTones,
}: SegmentPinyinParserInput & {
  segment: string;
  startIndex?: number;
}): string =>
  createSegmentPinyinParser({
    text,
    pinyin,
    fallback,
    keepNeutralTones,
  }).getPinyin(
    segment,
    startIndex,
  );
