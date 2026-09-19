import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";
import { useQuery } from "@tanstack/react-query";

import { pinyin } from "pinyin-pro";
import {
  createSegmentPinyinParser,
  pickPinyinSource,
  type OriginalPinyin,
} from "./pinyin-parser";

export { pickPinyinSource };

type FilterTypes = "unique";

const pinyinverrides: any = {
  还: {
    pinyin: "hái",
  },
  开着: {
    pinyin: "kāizhe",
  },
  都是: {
    pinyin: "doūshì",
  },
  那么: {
    pinyin: "nàme",
  },
  还有: {
    pinyin: "háiyǒu",
  },
  为什么: {
    pinyin: "wèishénme",
  },
  什么: {
    pinyin: "shénme",
  },
  曾是: {
    pinyin: "céngshì",
  },
  出差: {
    pinyin: "chūchāi",
  },
  模样: {
    pinyin: "múyàng",
  },
  囤积: {
    pinyin: "túnjī",
  },
};

export function getPinyin(input: string) {
  return pinyinverrides?.[input]?.pinyin || pinyin(input);
}

interface SegmentTextInput {
  text: string;
  lang: string;
  filterOptions?: FilterTypes[];
  /**
   * Pinyin of the entire `text`, used as the source for every segment's pinyin
   * (see `pinyin-parser`). Pass it when it is already known — a transcription's
   * `pinyin`/`roman`, a stored character's pinyin — so segments keep the reading
   * the text intended instead of being read in isolation.
   */
  originalPinyin?: OriginalPinyin;
}

/**
 * True for a language that is written with Chinese characters — `zh` and the
 * regional variants a caller may hold instead (`zh-CN`, `zh-Hans`, `zh-TW`).
 */
export const isChineseLang = (lang?: string) =>
  typeof lang === "string" && lang.trim().toLowerCase().startsWith("zh");

/**
 * Parser that reads every segment of `text` out of the pinyin of the whole text.
 *
 * Pinyin is read once for the whole text and each segment takes its reading from
 * there: a character's reading only holds in context, so reading a segment on its
 * own is what turns 了 into `liǎo` where the text said `le`, and 行 into `xíng`
 * where the text said `háng`.
 *
 * Returns null for a language that has no pinyin to read (anything but Chinese,
 * with no source handed in), where segments keep their own text as their roman.
 */
export const createSegmentPinyin = ({
  text,
  lang,
  originalPinyin,
}: SegmentTextInput) => {
  const sourceText = text || "";
  // A blank `pinyin`/`roman` field means the API has no reading for this line,
  // not that there is nothing left to do: read the text ourselves instead.
  const original = pickPinyinSource(originalPinyin);

  if (!isChineseLang(lang) && !original) {
    return null;
  }

  return createSegmentPinyinParser({
    text: sourceText,
    pinyin: original ?? pinyin(sourceText, { type: "all" }),
    fallback: getPinyin,
    // A source we computed ourselves is another reading of the same text, so the
    // segment stays the better judge of its own neutral tones. A source handed
    // in by the caller is authoritative as it is.
    keepNeutralTones: !original,
  });
};

export async function segmentText({
  text,
  lang,
  filterOptions,
  originalPinyin,
}: SegmentTextInput) {
  const sourceText = text || "";

  const segmenter = new Intl.Segmenter(lang, { granularity: "word" });

  const segments = segmenter.segment(sourceText);
  const segmentArray = [];

  for (const segmentItem of segments) {
    segmentArray.push(segmentItem);
  }

  const pinyinParser = createSegmentPinyin({ text: sourceText, lang, originalPinyin });

  const segmentPinyin = (segment: string, startIndex?: number) =>
    pinyinParser
      ? pinyinParser.getPinyin(segment, startIndex)
      : getPinyin(segment);

  let res = [];

  if (filterOptions && filterOptions?.includes("unique")) {
    const uniqueSegments = [
      ...new Set(segmentArray.map((segment: any) => segment.segment)),
    ].filter(filterNonHanYu);

    for (const _uniqueSegment of uniqueSegments) {
      const uniqueSegment: any = _uniqueSegment;

      const matchedSegments = segmentArray.filter(
        (segment: any) => segment.segment === uniqueSegment,
      );
      const matchedSegment = matchedSegments?.[0];

      const _pinyin = segmentPinyin(uniqueSegment, matchedSegment?.index);

      res.push({
        input: uniqueSegment,
        startIndex: matchedSegment.index,
        endIndex: matchedSegment.index + uniqueSegment?.length,
        id: crypto.randomUUID(),
        totalFrequency: matchedSegments?.length,
        lang,
        pinyin: _pinyin,
      });
    }
  } else {
    for (const segment of segments) {
      res.push({
        ...{
          input: segment.segment,
          startIndex: segment.index,
          endIndex: segment.index + segment.segment.length,

          lang,
          id: crypto.randomUUID(),
        },
        ...(isChineseLang(lang)
          ? {
              pinyin: segmentPinyin(segment.segment, segment.index),
            }
          : {}),
      });
    }
  }

  return res;
}

export const useSegmentTextQuery = ({
  text,
  lang,
  filterOptions,
  originalPinyin,
}: SegmentTextInput) => {
  return useQuery({
    queryKey: [
      "segment-text",
      text,
      lang,
      JSON.stringify(filterOptions),
      JSON.stringify(originalPinyin),
    ],
    queryFn: async () => {
      return await segmentText({ text, lang, filterOptions, originalPinyin });
    },
  });
};
