import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";
import { useQuery } from "@tanstack/react-query";
import pinyin from "pinyin";

type FilterTypes = "unique";

const pinyinverrides: any = {
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
  return (
    pinyinverrides?.[input]?.pinyin ||
    pinyin(input)
      .map((item) => item[0])
      .join("")
  );
}

interface SegmentTextInput {
  text: string;
  lang: string;
  filterOptions?: FilterTypes[];
}
export async function segmentText({
  text,
  lang,
  filterOptions,
}: SegmentTextInput) {
  const segmenter = new Intl.Segmenter(lang, { granularity: "word" });

  const segments = segmenter.segment(text);
  const segmentArray = [];

  for (const segmentItem of segments) {
    segmentArray.push(segmentItem);
  }

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

      const _pinyin = getPinyin(uniqueSegment);

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
        ...(lang === "zh"
          ? {
              pinyin: getPinyin(segment.segment),
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
}: SegmentTextInput) => {
  return useQuery({
    queryKey: ["segment-text", text, lang, JSON.stringify(filterOptions)],
    queryFn: async () => {
      return await segmentText({ text, lang, filterOptions });
    },
  });
};
