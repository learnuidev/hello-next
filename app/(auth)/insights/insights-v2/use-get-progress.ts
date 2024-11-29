import { formatPercentage } from "@/app/profile/utils/format-percentage";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

function filterHsk2Words(data: any, level: number) {
  return data?.filter(
    (item: { hanzi: string; hskLevel: number; hsk2Level: number }) =>
      item?.hsk2Level === level
  );
}

function filterHsk3Words(data: any, level: number) {
  return data?.filter(
    (item: { hanzi: string; hskLevel: number; hsk2Level: number }) =>
      item?.hskLevel === level
  );
}

function getHskCharacters(data: any) {
  return [
    ...new Set(
      data
        ?.map((item: { hanzi: string }) => item?.hanzi)
        ?.join("")
        ?.split("")
    ),
  ];
}

function getHskProgress(learnedCharacters: any, totalHskChars: any) {
  const totalChineseChars =
    learnedCharacters?.filter((char: any) =>
      totalHskChars?.includes(char?.hanzi)
    ) || [];

  return formatPercentage(
    totalChineseChars?.length / totalHskChars?.length || 0
  );
}

export const useGetProgress = () => {
  const { data } = useListHSKWordsQuery();

  const { data: learnedCharacters } = useListCharactersQuery();

  const totalHskCharacters = getHskCharacters(data);

  const hskV2Progress = [1, 2, 3, 4, 5, 6]
    .map((level) => {
      return {
        totalHskChars: getHskCharacters(filterHsk2Words(data, level)),
        level,
      };
    })
    .map(({ totalHskChars, level }) => {
      return {
        hsk2level: level,
        id: `hsk-${level}`,
        title: `HSK Level ${level}`,
        stat: getHskProgress(learnedCharacters, totalHskChars),
      };
    });

  const hskV3Progress = [1, 2, 3, 4, 5, 6, 9]
    .map((level) => {
      return {
        totalHskChars: getHskCharacters(filterHsk3Words(data, level)),
        level,
      };
    })
    .map(({ totalHskChars, level }) => {
      return {
        hsk3level: level,
        id: `hsk3-${level}`,
        title: `New HSK Level ${level}`,

        stat: getHskProgress(learnedCharacters, totalHskChars),
      };
    });

  return {
    overallHskProgress: getHskProgress(learnedCharacters, totalHskCharacters),
    totalHskChars: totalHskCharacters?.length,

    hskV2: hskV2Progress,
    hskV3: hskV3Progress,
  };
};
