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

// segmentText({
//   lang: "zh",
//   text: "尚未入学，他又看见了高等商业学校的广告，广告上说，这一所学校是省力的，课程设置先进，教师水平高，教学条件好。毛泽东怀着做一名商业专家的理想，向这所学校报了名，同时写信告诉了家中的父亲，父亲向来赞成儿子经商，在毛泽东小时候，还曾打算送他到米店当学徒，写信后自然满心欢喜，大力支持。但新有新的难处。在这所时髦的高等商业学校里，半数以上的课程都使用英语教学，教科书也是英文。原本，和其他许多刚被录取的新同学一样，毛泽东的英文程度并不高，适应不了这里的学习生活，他在入学一个月之后，便不得不离开这所学校。",
// }).then((resp) => {
//   console.log("RESP", resp);
// });
