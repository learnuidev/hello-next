import { DuChapter, DuCourse, DuSection } from "@/app/(auth)/du/du.types";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useQuery } from "@tanstack/react-query";
// import { DuSection } from "../du.types";

interface GetChapterDetailsResponse {
  course: DuCourse;
  audio_url?: string;
  canonical_url: string;

  subtitles: {
    sentence_indices: number[];
    sentence_translations: string[];
    syllable_times: number[];

    words: {
      hsk?: number;
      hanzi: string;
      pinyin?: string;
      meaning?: string;
      tc_hanzi: string;
      startIndex: number;
      endIndex: number;
      startTime: number;
      endTime: number;
      sentence: string;
    }[];
  };
}

export const useGetChapterDetails = ({
  chapterId,
  courseId,
  cookie,
}: {
  chapterId: string;
  cookie: string;
  courseId: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<GetChapterDetailsResponse, Error>({
    queryKey: [
      "du-chinese/get-chapter-details",
      chapterId,
      cookie,
      courseId,
      authUser?.jwt,
    ],
    queryFn: async () => {
      const resp = await fetch(`${duChineseApiUrl}/v1/get-chapter-details`, {
        method: "POST",

        body: JSON.stringify({
          chapterId,
          courseId,
          cookie,
        }),
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      const details = (await resp.json()) as GetChapterDetailsResponse;

      return details;

      // return {
      //   ...details,
      //   subtitles: {
      //     ...details.subtitles,
      //     words: details.subtitles.words.reduce(
      //       (acc: any, curr: any) => {
      //         if (curr?.meaning) {
      //           const startIndex = acc?.offset;
      //           const endIndex = curr?.hanzi?.length + acc?.offset - 1;

      //           const isFirst = startIndex === 0;

      //           return {
      //             ...acc,
      //             offset: acc?.offset + curr?.hanzi?.length,
      //             acc: acc.acc.concat({
      //               ...curr,
      //               startIndex,
      //               endIndex,
      //               startTime: isFirst
      //                 ? 0
      //                 : details?.subtitles?.syllable_times?.[startIndex - 1],
      //               endTime: isFirst
      //                 ? details?.subtitles?.syllable_times?.[startIndex]
      //                 : details?.subtitles?.syllable_times?.[endIndex],
      //             }),
      //           };
      //         }

      //         return {
      //           ...acc,
      //           acc: acc.acc.concat(curr),
      //         };
      //       },
      //       { offset: 0, acc: [] }
      //     )?.acc,
      //   },
      // };
    },
  });
};
