import { useQuery } from "@tanstack/react-query";

interface SegmentTextInput {
  text: string;
  lang: string;
}
export async function segmentText({ text, lang }: SegmentTextInput) {
  const segmenter = new Intl.Segmenter(lang, { granularity: "word" });

  const segments = segmenter.segment(text);
  let res = [];

  for (const segment of segments) {
    res.push({
      input: segment.segment,
      startIndex: segment.index,
      endIndex: segment.index + segment.segment.length,
      lang,
      id: crypto.randomUUID(),
    });
  }

  return res;
}

export const useSegmentTextQuery = ({ text, lang }: SegmentTextInput) => {
  return useQuery({
    queryKey: ["segment-text", text, lang],
    queryFn: async () => {
      return await segmentText({ text, lang });
    },
  });
};
